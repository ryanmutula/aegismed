import RegistrationForm from '../components/RegistrationForm';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-md mb-8 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-secondary hover:text-primary transition-colors flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <ThemeSwitcher />
      </div>
      
      <RegistrationForm />
    </div>
  );
}