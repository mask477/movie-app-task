import type { Metadata } from 'next';
import '@/globals.css';

import { Montserrat } from 'next/font/google';
import BgWaves from '@/components/bg-waves';
import { Toaster } from '@/components/ui/toaster';

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: 'Upwork Nextjs Task',
  description: 'An authentication based movie CRUD application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div
          className={
            'grid items-center justify-items-center min-h-screen py-[50] sm:py-[120] relative '
          }
        >
          <main className="container">{children}</main>

          <div className="w-full absolute bottom-0 left-0 right-0">
            <BgWaves className="w-full h-auto" />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
