'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the user is in the browser and has a token
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Boot unauthorized users out
      router.push('/login');
    } else {
      // Allow them to see the page
      setIsAuthorized(true);
    }
  }, [router]);

  // Prevent the protected page from flashing briefly before the redirect happens
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render the protected content
  return <>{children}</>;
}