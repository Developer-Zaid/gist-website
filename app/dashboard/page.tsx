'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Auth failed');
        return res.json();
      })
      .then((data) => {
        setUser({
          ...data.user,
          course: data.user?.course || 'Not Applied Yet',
          status: data.user?.status || 'Not Submitted',
        });
      })
      .catch((err) => {
        console.log('AUTH ERROR:', err);
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  if (!user) {
    return <div className="text-white text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* HEADING */}
        <h1 className="text-4xl font-bold mb-8">
          Welcome, <span className="text-red-400">{user.name}</span>
        </h1>

        {/* INFO CARD */}
        <div className="bg-white/10 p-8 rounded-2xl space-y-4">
          <p>
            <span className="text-gray-400">Email:</span> {user.email}
          </p>

          <p>
            <span className="text-gray-400">Course:</span> {user.course}
          </p>

          <p>
            <span className="text-gray-400">Status:</span>{' '}
            <span className="text-yellow-400">{user.status}</span>
          </p>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">
          {/* ✅ SHOW ONLY IF NOT APPLIED */}
          {(user.status === 'Not Submitted' || user.status === 'Not Applied Yet') && (
            <button
              onClick={() => router.push('/admission')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Complete Your Application
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="bg-red-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
