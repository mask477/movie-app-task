'use client';
import { signout } from '@/utils/auth-actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signout();
    setTimeout(() => router.push('/'), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <Loader2 size={40} className="animate-spin" />
      <h3 className="text-h3">Logging Out...</h3>
      <div className="text-muted">
        <p>Redirecting in a sec.</p>
      </div>
    </div>
  );
}
