'use client';

export default function WelcomeBanner({ userName }: { userName: string }) {
  return (
    <div className="w-full bg-primary text-background overflow-hidden py-2 whitespace-nowrap shadow-md">
      <p className="animate-marquee inline-block font-semibold tracking-wide">
        Hi {userName}, Welcome to AegisMed, Happy Studying! • HBR - Healthcare By Ryan™
      </p>
    </div>
  );
}