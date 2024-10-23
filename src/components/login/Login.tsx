import React from 'react';
import './Login.scss';
import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; // Firebaseのauthとproviderをインポート

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('ログイン成功:', result);
      })
      .catch((err) => {
        // エラーハンドリングの修正
        alert(`ログインに失敗しました: ${err.message}`);
        console.error('ログインエラー:', err);
      });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./discordIcon.png" alt="" />
      </div>
      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;
