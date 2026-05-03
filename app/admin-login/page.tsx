'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();

    // 🔥 SIMPLE ADMIN CHECK (for now)
    if (email === 'admin@gist.com' && password === 'Admin@12345') {
      localStorage.setItem('admin', 'true');
      router.push('/admin');
    } else {
      setMsg('Invalid admin credentials');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-xl space-y-4 w-96">
        <h1 className="text-2xl text-center font-bold">Admin Login</h1>

        <input
          type="email"
          placeholder="admin@gist.com"
          className="w-full p-3 rounded bg-black border border-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black border border-white/20"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-red-500 py-3 rounded">Login</button>

        {msg && <p className="text-red-400 text-center">{msg}</p>}
      </form>
    </section>
  );
}
