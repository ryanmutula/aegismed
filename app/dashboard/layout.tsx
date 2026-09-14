'use client';
import { useState, useEffect } from 'react';
import WelcomeBanner from '../components/WelcomeBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUserName, setCurrentUserName] = useState('Student');

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setCurrentUserName(savedName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <WelcomeBanner userName={currentUserName} />
      
      <main className="flex-grow p-4 md:p-8 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}