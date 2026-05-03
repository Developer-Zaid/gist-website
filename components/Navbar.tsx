'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-black/70 backdrop-blur-xl text-white border-b border-white/10 sticky top-0 z-50 shadow-[0_4px_20px_rgba(255,0,0,0.1)]">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        {/* LOGO + NAME */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Image
            src="/logo.JPEG"
            alt="logo"
            width={42}
            height={42}
            className="rounded-full border border-white/20 group-hover:scale-105 transition"
          />

          <span className="text-[11px] sm:text-sm md:text-base font-semibold tracking-wide group-hover:text-red-400 transition">
            GIST Sukkur
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-medium">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Courses', path: '/courses' },
            { name: 'Faculty', path: '/#faculty' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative transition ${
                isActive(item.path) ? 'text-red-400' : 'hover:text-red-400'
              }`}
            >
              {item.name}

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex gap-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 px-5 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition duration-300">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-2xl z-50 hover:text-red-400 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-black/95 backdrop-blur-xl z-50 transform transition-transform duration-300 shadow-2xl
  ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image src="/logo.JPEG" alt="logo" width={35} height={35} className="rounded-full" />
            <span className="text-sm font-semibold">GIST</span>
          </div>

          <button onClick={() => setMenuOpen(false)} className="text-2xl hover:text-red-400">
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-6 p-6 text-lg font-medium">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Courses', path: '/courses' },
            { name: 'Faculty', path: '/#faculty' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`transition ${
                isActive(item.path) ? 'text-red-400' : 'hover:text-red-400'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
