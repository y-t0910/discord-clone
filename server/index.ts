import express from 'express';
import cors from 'cors';

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
