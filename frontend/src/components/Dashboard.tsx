import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState('Loading...');
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/hello');
        setMessage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error connecting to backend');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>ダッシュボード</h1>
      <p>ようこそ、{user?.attributes?.email || 'ユーザー'}さん！</p>
      <p>バックエンドからのメッセージ: {message}</p>
      <button onClick={logout}>ログアウト</button>
      
      <style jsx>{`
        .dashboard-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;