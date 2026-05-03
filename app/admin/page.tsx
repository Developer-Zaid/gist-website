'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');

    if (!isAdmin) {
      router.push('/admin-login');
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/students');
        const data = await res.json();

        console.log('ADMIN API RESPONSE:', data);

        setStudents(data.students || []);
      } catch (err) {
        console.log('FETCH ERROR:', err);
        setStudents([]);
      }
    };

    fetchStudents();
  }, [router]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      // ✅ instant UI update
      setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    } catch (err) {
      console.log('UPDATE ERROR:', err);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Approved') return 'text-green-400';
    if (status === 'Rejected') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* LOGOUT */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            localStorage.removeItem('admin');
            router.push('/admin-login');
          }}
          className="bg-red-500 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* EXPORT */}
      <div className="flex justify-between mb-6 flex-wrap gap-3">
        <a href="/api/admin/export?type=all" className="bg-blue-500 px-4 py-2 rounded-lg">
          Download All Applicants
        </a>

        <a href="/api/admin/export?type=approved" className="bg-green-500 px-4 py-2 rounded-lg">
          Download Approved
        </a>
      </div>

      {/* SEARCH */}
      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Search by name, email, course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full px-4 py-2 rounded bg-white/10 border border-white/20"
        />

        <table className="w-full border border-white/20">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students
                .filter((s) =>
                  `${s.name || ''} ${s.email || ''} ${s.course || ''}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((s) => (
                  <tr key={s.id} className="text-center border-t border-white/10">
                    <td className="p-3">{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.course}</td>
                    <td>{s.mode}</td>

                    {/* ✅ STATUS COLOR FIX */}
                    <td className={getStatusColor(s.status)}>{s.status || 'Pending'}</td>

                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => router.push(`/admin/${s.id}`)}
                          className="bg-blue-500 px-3 py-1 rounded"
                        >
                          View
                        </button>

                        <button
                          onClick={() => updateStatus(s.id, 'Approved')}
                          className="bg-green-500 px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(s.id, 'Rejected')}
                          className="bg-red-500 px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
