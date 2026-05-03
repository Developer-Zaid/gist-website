'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CourseCard({ title, desc, duration, price, original, tag }: any) {
  const router = useRouter(); // ✅ REQUIRED

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-white shadow-lg border border-white/10 hover:border-red-500 transition"
    >
      {/* Tag Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-orange-400 px-3 py-1 text-xs rounded-full font-semibold">
        {tag}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-sm opacity-80 mb-4">{desc}</p>

      {/* Duration + Price */}
      <div className="flex justify-between text-sm mb-4 opacity-90">
        <span>⏱ {duration}</span>
        <span className="text-red-400 font-semibold">{price}</span>
      </div>

      {/* Original Price */}
      {original && <p className="text-xs text-gray-400 line-through mb-2">{original}</p>}

      {/* ✅ BUTTON */}
      <button
        onClick={() => {
          const token = localStorage.getItem('token');

          if (token) {
            router.push('/admission'); // logged in
          } else {
            router.push('/login'); // not logged in
          }
        }}
        className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Enroll Now
      </button>
    </motion.div>
  );
}
