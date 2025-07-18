import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ConfirmSignup from './ConfirmSignup';

enum AuthMode {
  LOGIN,
  SIGNUP,
  CONFIRM
}

const AuthForm: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [username, setUsername] = useState('');

  const toggleForm = () => {
    setAuthMode(authMode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN);
  };

  const handleSignupSuccess = (username: string) => {
    setUsername(username);
    setAuthMode(AuthMode.CONFIRM);
  };

  const handleConfirmSuccess = () => {
    setAuthMode(AuthMode.LOGIN);
  };

  const handleCancelConfirm = () => {
    setAuthMode(AuthMode.SIGNUP);
  };

  return (
    <div>
      {authMode === AuthMode.LOGIN && (
        <Login onToggleForm={toggleForm} />
      )}
      
      {authMode === AuthMode.SIGNUP && (
        <Signup 
          onToggleForm={toggleForm} 
          onSignupSuccess={handleSignupSuccess}
        />
      )}
      
      {authMode === AuthMode.CONFIRM && (
        <ConfirmSignup 
          username={username} 
          onConfirmed={handleConfirmSuccess} 
          onCancel={handleCancelConfirm}
        />
      )}
    </div>
  );
};

export default AuthForm;