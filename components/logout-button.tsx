'use client';
import React from 'react';
import { LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

const LogoutButton = () => {
  const isMobile = useIsMobile();

  return (
    <Link
      href="/logout"
      className="flex items-center gap-2 font-bold text-sms cursor-pointer"
      prefetch
    >
      <label className="text-base cursor-pointer hidden sm:block">Logout</label>
      <LogOut size={isMobile ? 24 : 32} />
    </Link>
  );
};

export default LogoutButton;
