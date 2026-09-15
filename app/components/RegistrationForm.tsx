'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export default function RegistrationForm() {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        full_name: fullName,
        email,
        password,
      });
      setLoading(false);
      setStep('verify'); // Switch to OTP input step
      setMessage('Verification code sent to your email!');
    } catch (err: any) {
      setLoading(false);
      setMessage(err.response?.data?.error || 'Registration failed.');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/api/auth/verify`, {
        email,
        token,
      });
      setLoading(false);
      router.push('/login?verified=true');
    } catch (err: any) {
      setLoading(false);
      setMessage(err.response?.data?.error || 'Verification failed.');
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full max-w-md p-8 rounded-2xl bg-accent text-foreground shadow-2xl border border-border">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">
          {step === 'register' ? 'Create Account' : 'Verify Email'}
        </h2>
        <p className="text-sm text-foreground/70 mt-1">
          {step === 'register' ? 'Join AegisMed clinical academy.' : `Enter the 8-digit code sent to ${email}`}
        </p>
      </div>

      {message && (
        <div className="p-3 text-sm font-medium rounded-md bg-primary/10 border border-primary/50 text-center text-primary">
          {message}
        </div>
      )}

      {step === 'register' ? (
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full Name (e.g. Ryan Mwendwa)"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
          <input
            type="email"
            placeholder="Your Email Address"
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
            disabled={loading || !fullName || !email || !password}
            className="mt-4 p-4 rounded-lg bg-primary text-background font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter 8-digit code"
            required
            maxLength={8}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="p-3.5 rounded-lg bg-background border border-border text-center tracking-widest text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          />
          <button
            type="submit"
            disabled={loading || token.length < 6}
            className="mt-4 p-4 rounded-lg bg-primary text-background font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Confirm Code'}
          </button>
        </form>
      )}

      <div className="text-center mt-4">
        <p className="text-sm text-foreground/70">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}