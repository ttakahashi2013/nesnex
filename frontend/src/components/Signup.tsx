import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SocialLogin from './SocialLogin';

interface SignupProps {
  onToggleForm: () => void;
  onSignupSuccess: (username: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleForm, onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // パスワード確認
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    
    try {
      await signup(username, password, email);
      setSuccess('アカウントが作成されました。確認コードがメールに送信されました。');
      // 確認コード入力画面に遷移
      onSignupSuccess(username);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'サインアップに失敗しました');
    }
  };

  return (
    <div className="signup-container">
      <h2>アカウント登録</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
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
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            minLength={8}
          />
          <small>8文字以上で、大文字、小文字、数字を含める必要があります</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">パスワード（確認）</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">登録</button>
      </form>
      
      <SocialLogin />
      
      <p className="toggle-form">
        すでにアカウントをお持ちですか？ <button onClick={onToggleForm}>ログイン</button>
      </p>
      
      <style jsx>{`
        .signup-container {
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
        small {
          display: block;
          margin-top: 0.25rem;
          color: #666;
          font-size: 0.8rem;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover {
          background-color: #0051bb;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .success {
          color: green;
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

export default Signup;