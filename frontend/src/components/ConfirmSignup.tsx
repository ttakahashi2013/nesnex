import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

interface ConfirmSignupProps {
  username: string;
  onConfirmed: () => void;
  onCancel: () => void;
}

const ConfirmSignup: React.FC<ConfirmSignupProps> = ({ username, onConfirmed, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await Auth.confirmSignUp(username, code);
      setSuccess('アカウントが確認されました。ログインしてください。');
      setTimeout(() => {
        onConfirmed();
      }, 2000);
    } catch (err: any) {
      setError(err.message || '確認コードの検証に失敗しました');
    }
  };

  const resendCode = async () => {
    try {
      await Auth.resendSignUp(username);
      setSuccess('確認コードが再送信されました');
    } catch (err: any) {
      setError(err.message || '確認コードの再送信に失敗しました');
    }
  };

  return (
    <div className="confirm-container">
      <h2>アカウント確認</h2>
      <p>メールに送信された確認コードを入力してください</p>
      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">確認コード</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">確認</button>
        <button type="button" onClick={resendCode} className="secondary">コードを再送信</button>
        <button type="button" onClick={onCancel} className="tertiary">キャンセル</button>
      </form>
      
      <style jsx>{`
        .confirm-container {
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
          margin-top: 1rem;
        }
        button:hover {
          background-color: #0051bb;
        }
        .secondary {
          background-color: #6c757d;
        }
        .secondary:hover {
          background-color: #5a6268;
        }
        .tertiary {
          background-color: transparent;
          color: #6c757d;
          border: 1px solid #6c757d;
        }
        .tertiary:hover {
          background-color: #f8f9fa;
        }
        .error {
          color: red;
          margin-bottom: 1rem;
        }
        .success {
          color: green;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ConfirmSignup;