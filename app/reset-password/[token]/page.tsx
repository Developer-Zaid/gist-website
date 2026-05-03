'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg('❌ Passwords do not match');
      return;
    }

    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      setMsg(data.message || data.error);

      if (data.message) {
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch {
      setMsg('❌ Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      {/* Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>

        <p className="text-center text-gray-400 mb-6 text-sm">Enter your new password below</p>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 mb-1 block">New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-300 mb-1 block">Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-yellow-500 hover:scale-[1.02]'
          }`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

        {/* Message */}
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
