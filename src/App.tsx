import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import { User } from 'firebase/auth'; // 正しいインポート
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/login/Login';
import { ErrorBoundary } from 'react-error-boundary';
import {ErrorFallBack} from "./utils/ErrorFallBack"

function App() {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const loginUser = user as User;

        dispatch(
          login({
            uid: loginUser.uid,
            email: loginUser.email ?? 'default@example.com',
            name: loginUser.displayName ?? 'Guest', // 'name'を'displayName'に一致させる
            photoURL: loginUser.photoURL ?? '',
            displayName: loginUser.displayName ?? 'Guest',
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      {user ? ( // userが存在する場合にSidebarとChatを表示
        <>
         <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Sidebar />
        </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
  
}

export default App;
