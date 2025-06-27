// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // Import our Navbar component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NAFDAC HACCP Training',
  description: 'Interactive HACCP training for NAFDAC Food Safety Directorate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Our Navbar goes here */}
        <main className="container mx-auto p-6"> {/* Main content area */}
          {children}
        </main>
      </body>
    </html>
  );
}