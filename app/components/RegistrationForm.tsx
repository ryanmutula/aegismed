'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react'; // Ensure lucide-react is installed

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export default function RegistrationForm() {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // New states for visibility and terms
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter();

  // Password strength calculator
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // Returns 0 to 4
  };

  const strength = calculateStrength(password);

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        full_name: fullName,
        email,
        password,
      });
      setLoading(false);
      setStep('verify');
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
            placeholder="Full Name (e.g. Ryan Mutula)"
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
          
          {/* Password Input Wrapper */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 pr-12 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-primary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="flex flex-col space-y-1 mt-1">
              <div className="flex justify-between items-center text-xs px-1">
                <span className="text-foreground/70">Password strength:</span>
                <span className={`font-semibold ${strength >= 3 ? 'text-green-500' : 'text-foreground/80'}`}>
                  {getStrengthText(strength)}
                </span>
              </div>
              <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level} 
                    className={`flex-1 transition-all duration-300 ${strength >= level ? getStrengthColor(strength) : 'bg-border'}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-start mt-2 mb-2">
            <input 
              type="checkbox" 
              id="terms" 
              required 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 mr-3 h-4 w-4 shrink-0 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary/50 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-foreground/80 leading-relaxed cursor-pointer">
              By creating an account, I acknowledge and explicitly agree that I am bound by the 
              <Link href="/terms" className="text-primary hover:underline font-semibold mx-1" target="_blank">
                Terms and Conditions
              </Link> 
              and 
              <Link href="/privacy" className="text-primary hover:underline font-semibold mx-1" target="_blank">
                Privacy Policy
              </Link> 
              for as long as I maintain an account and log in to this platform.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !fullName || !email || !password || !agreedToTerms}
            className="mt-2 p-4 rounded-lg bg-primary text-background font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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