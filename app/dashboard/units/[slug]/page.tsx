'use client';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpenCheck } from 'lucide-react';
import AiTutorChat from '@/app/components/AiTutorChat';

export default function UnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  // Convert slug back to a clean title (e.g. "pharmacology-and-therapeutics" -> "Pharmacology And Therapeutics")
  const formattedTitle = resolvedParams.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Curriculum
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
          <BookOpenCheck className="w-4 h-4" />
          Active Study Unit
        </div>
      </div>

      {/* Unit Banner */}
      <div className="p-8 rounded-2xl bg-accent border border-border shadow-md">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{formattedTitle}</h1>
        <p className="text-foreground/70 mt-2">
          Engage with your AI clinical tutor specifically configured for this module. Ask questions, request rapid-fire quizzes, or grade your revision notes.
        </p>
      </div>

      {/* Embedded AI Tutor Brain */}
      <div className="w-full">
        <AiTutorChat unitName={formattedTitle} />
      </div>
    </div>
  );
}