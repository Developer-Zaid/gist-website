'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, phone, password } = form;

    if (!name || !email || !phone || !password) {
      return 'All fields are required';
    }

    // Email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Enter valid email (example@gmail.com)';
    }

    // Phone format (basic)
    if (phone.length < 10) {
      return 'Enter valid phone number';
    }

    // Password rules
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return 'Password must have 1 uppercase & 1 special character';
    }

    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.message) {
      setMessage('✅ Registered successfully! Now login.');
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create <span className="text-red-400">Account</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name (e.g. Zaid Ali)"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <input
            name="email"
            type="email"
            placeholder="Email (e.g. example@gmail.com)"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone (e.g. 03001234567)"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (Min 6 chars, 1 Uppercase, 1 Special !@#)"
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-white/20"
          />

          <button className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Register
          </button>
        </form>

        {/* MESSAGE */}
        {message && <p className="mt-4 text-center text-sm text-red-400">{message}</p>}

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
