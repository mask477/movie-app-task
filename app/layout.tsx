import type { Metadata } from 'next';
import '@/globals.css';

import { Montserrat } from 'next/font/google';
import BgWaves from '@/components/bg-waves';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';

const montserrat = Montserrat({
  preload: false,
});

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
        <NextTopLoader color="#2bd17e" />
        <div
          className={
            'grid items-center justify-items-center min-h-screen py-[50px] sm:py-[120px] pb-[160px] relative '
          }
        >
          <main className="container">
            {children}
            <div className="w-full absolute bottom-0 left-0 right-0">
              <BgWaves className="w-full h-auto" />
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
