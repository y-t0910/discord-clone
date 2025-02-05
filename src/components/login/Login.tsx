import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/userSlice';
import './Login.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ダミーユーザー情報でログイン
    dispatch(login({
      uid: 'user-' + Date.now(),
      email: `${username}@example.com`,
      displayName: username || 'ゲスト',
      photoURL: 'https://via.placeholder.com/150',
      name: username || 'ゲスト'
    }));
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2>Discordクローンにログイン</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
