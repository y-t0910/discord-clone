import express from 'express';
import cors from 'cors';
import http from 'http';
import { initSocket } from './socket';

const app = express();
app.use(cors());
app.use(express.json());

interface Message {
  id: string;
  channelId: string;
  content: string;
  user: {
    displayName: string;
    photoURL: string;
  };
  timestamp: Date;
}

let messages: Message[] = [];

// メッセージ一覧取得
app.get('/api/messages/:channelId', (req, res) => {
  const { channelId } = req.params;
  const channelMessages = messages.filter(msg => msg.channelId === channelId);
  res.json(channelMessages);
});

// メッセージ作成
app.post('/api/messages', (req, res) => {
  const newMessage: Message = {
    id: Date.now().toString(),
    channelId: req.body.channelId,
    content: req.body.content,
    user: {
      displayName: req.body.user?.displayName || 'Guest',
      photoURL: req.body.user?.photoURL || ''
    },
    timestamp: new Date()
  };
  messages.push(newMessage);
  return res.status(201).json(newMessage);
});

// APIルートの追加
app.get('/', (req, res) => {
  res.send('Discord Clone API is running');
});

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 明示的なエクスポート（ModuleJS対応）
export default app;
