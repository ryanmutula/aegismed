import Link from 'next/link';
import ThemeSwitcher from './components/ThemeSwitcher';
import { ShieldPlus, ArrowRight, Sparkles } from 'lucide-react'; 

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-primary/20">
      
      {/* Ambient Background Glow (Subtle and performant) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] w-[600px] h-[500px] bg-primary/10 dark:bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Theme Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out mt-10">
        
        {/* Glowing Logo Container */}
        <div className="flex justify-center mb-8 relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-125"></div>
          <div className="relative p-5 bg-background rounded-3xl border border-border shadow-xl">
            <ShieldPlus className="w-14 h-14 text-primary" />
          </div>
        </div>
        
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-foreground border border-border shadow-sm text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AegisMed ANI v1.0</span>
        </div>

        {/* Headline with Gradient Text */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
          Master Your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Medical Journey
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          The ultimate optimized study platform designed exclusively for students and professionals in the healthcare field.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
          <Link 
            href="/register" 
            className="group flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto bg-primary text-primary-foreground font-bold rounded-2xl text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1 active:scale-95"
          >
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/login" 
            className="flex items-center justify-center px-8 py-4 w-full sm:w-auto bg-transparent text-foreground font-bold rounded-2xl text-lg border-2 border-border hover:bg-accent hover:border-primary/30 transition-all hover:-translate-y-1 active:scale-95"
          >
            Log In
          </Link>
        </div>
        
        {/* Footer Brand */}
        <div className="mt-24 text-xs text-foreground/40 font-bold tracking-[0.2em] uppercase">
          HBR - Healthcare By Ryan™
        </div>
      </div>
    </div>
  );
}