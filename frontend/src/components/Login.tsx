import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SocialLogin from './SocialLogin';

const Login: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      // ログイン成功
    } catch (err: any) {
      setError(err.message || 'ログインに失敗しました');
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">ユーザー名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      
      <SocialLogin />
      
      <p className="toggle-form">
        アカウントをお持ちでないですか？ <button onClick={onToggleForm}>新規登録</button>
      </p>
      
      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0051bb;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .toggle-form {
          margin-top: 1rem;
          text-align: center;
        }
        .toggle-form button {
          background: none;
          border: none;
          color: #0070f3;
          padding: 0;
          font: inherit;
          cursor: pointer;
          text-decoration: underline;
          width: auto;
        }
        .toggle-form button:hover {
          color: #0051bb;
          background: none;
        }
      `}</style>
    </div>
  );
};

export default Login;