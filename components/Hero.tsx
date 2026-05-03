'use client';

import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  const handleStart = () => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/admission');
    } else {
      router.push('/login');
    }
  };

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-black via-gray-900 to-black text-white px-6"
    >
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
        Build Your Future with <span className="text-red-400">Modern IT Skills</span>
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        Join GIST — where students become professionals in Web Development, AI, and Digital Skills.
      </p>

      {/* Authority */}
      <p className="mt-4 text-gray-400 max-w-xl">
        Since 1999, we have been empowering students across Sindh with practical skills,
        career-focused training, and real-world knowledge.
      </p>

      {/* Highlights */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
        <span className="bg-white/10 px-4 py-2 rounded-lg">💻 Practical Training</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg">🚀 Career Focused</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg">🌍 Freelancing Skills</span>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        {/* ✅ FIXED BUTTON */}
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-lg font-semibold hover:scale-105 transition"
        >
          Start Your Journey
        </button>

        {/* KEEP THIS SAME */}
        <a
          href="/courses"
          className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
        >
          View Courses
        </a>
      </div>
    </section>
  );
}
