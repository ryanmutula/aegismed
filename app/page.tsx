import Link from 'next/link';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ShieldPlus } from 'lucide-react'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-700">
      
      <div className="absolute top-6 right-6">
        <ThemeSwitcher />
      </div>

      <div className="max-w-4xl mx-auto text-center mt-10">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-accent rounded-full border border-border shadow-lg">
            <ShieldPlus className="w-20 h-20 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
          Master Your <span className="text-primary">Medical</span> Journey
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          The ultimate optimized study platform designed exclusively for students and professionals in the healthcare field.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-primary text-background font-bold rounded-xl text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
          >
            Create Account
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 bg-accent text-foreground font-bold rounded-xl text-lg border border-border hover:bg-secondary/10 transition-all hover:-translate-y-1"
          >
            Log In
          </Link>
        </div>
        
        <div className="mt-16 text-sm text-foreground/50 font-semibold tracking-widest uppercase">
          HBR - Healthcare By Ryan™
        </div>
      </div>
    </div>
  );
}