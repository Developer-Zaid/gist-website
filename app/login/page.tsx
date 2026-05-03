'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validate = () => {
    if (!email || !password) {
      return 'All fields are required';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Enter valid email (example@gmail.com)';
    }

    return null;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful! Redirecting...');

        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1200);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login to <span className="text-red-400">GIST</span>
        </h1>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email (example@gmail.com)"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <button
            type="submit"
            className="w-full bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {/* MESSAGE */}
        {message && <p className="mt-4 text-center text-sm text-red-400">{message}</p>}

        {/* REGISTER */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{' '}
          <Link href="/register" className="text-red-400 hover:underline">
            Register
          </Link>
        </p>

        {/* FORGOT PASSWORD */}
        <p className="text-sm text-center mt-2">
          <Link href="/forgot-password" className="text-gray-400 hover:text-red-400">
            Forgot Password?
          </Link>
        </p>

        {/* 🔥 ADMIN LOGIN (NEW) */}
        <p className="text-sm text-center mt-3">
          <Link href="/admin-login" className="text-gray-500 hover:text-red-400">
            Login as Admin
          </Link>
        </p>
      </div>
    </section>
  );
}
