'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMsg(data.message || data.error);
    } catch {
      setMsg('❌ Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      {/* 🔴 Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* 🔳 Glass Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        {/* 🔥 Title */}
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>

        <p className="text-center text-gray-400 mb-6 text-sm">
          Enter your email to receive a reset link
        </p>

        {/* 📧 Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Email Address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition"
          />
        </div>

        {/* 🚀 Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-yellow-500 hover:scale-[1.02]'
          }`}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {/* 💬 Message */}
        {msg && (
          <p
            className={`mt-4 text-center text-sm ${
              msg.toLowerCase().includes('error') || msg.toLowerCase().includes('fail')
                ? 'text-red-400'
                : 'text-green-400'
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
