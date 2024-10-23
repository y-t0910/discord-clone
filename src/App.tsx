// App.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store'; // RootStateをインポート
import './App.scss';
import Chat from './components/Chat/Chat';
import Login from './components/login/Login';
import Sidebar from './components/sidebar/Sidebar';
import { auth} from "./firebase"
import { useAppDispatch } from './app/hooks';
import { login } from './features/userSlice';

function App() {
  // Reduxからユーザー情報を型安全に取得
  const user = useSelector((state: RootState) => state.user); // userをそのまま取得
  //console.log('取得したユーザー:', user); // デバッグ用

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if(loginUser){
         dispatch(login({
        uid:  loginUser.uid,
         }));
     }
    });

  },[]);

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
