import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Next.js + NestJS + MySQL Demo</h1>
      {isAuthenticated ? <Dashboard /> : <AuthForm />}
    </div>
  );
}