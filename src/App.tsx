import React from 'react';
import { useAppSelector } from './app/hooks';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/login/Login';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from "./utils/ErrorFallBack";
import { ModalProvider } from './app/modal-provider';

function App() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="App">
      {user ? (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          {/* Sidebar */}
          <Sidebar />
          {/*Chat */}
          <Chat />
          <ModalProvider />
        </ErrorBoundary>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
