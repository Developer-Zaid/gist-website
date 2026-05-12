import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GIST - Glamour Institute of Science & Technology',
  description:
    'Empowering students with IT skills, freelancing, and professional training in Sukkur, Sindh.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
        {/* 🔝 NAVBAR */}
        <Navbar />

        {/* 📄 PAGE CONTENT */}
        <main className="flex-1 bg-black overflow-x-hidden">{children}</main>

        {/* 🔻 FOOTER */}
        <Footer />

        {/* 🤖 AI ASSISTANT (FLOATING) */}
        <ChatBot />
      </body>
    </html>
  );
}
