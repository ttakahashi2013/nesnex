import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { configureAmplify } from '../lib/amplify';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Amplifyの設定を初期化
    configureAmplify();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}