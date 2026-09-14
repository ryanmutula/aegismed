'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // Save token securely on the client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user_name', response.data.user?.full_name || 'Student');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      // Guaranteed to run, stopping the loading spinner even if the try/catch fails
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full max-w-md p-8 rounded-2xl bg-accent text-foreground shadow-2xl border border-border">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">Welcome Back</h2>
        <p className="text-sm text-foreground/70 mt-1">Log in to continue your studies on AegisMed.</p>
      </div>

      {message && (
        <div className="p-3 text-sm font-medium rounded-md bg-red-500/10 border border-red-500/50 text-center text-red-500">
          {message}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="University Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
        />
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="mt-6 p-4 rounded-lg bg-primary text-background font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Log In'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-foreground/70">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}