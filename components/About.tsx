'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 md:px-10"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            About <span className="text-red-400">GIST</span>
          </h1>

          <p className="text-gray-300 mb-4">
            Glamour Institute of Science & Technology (GIST) was established on
            <span className="text-white font-semibold"> 12th February 1999</span> with a vision to
            empower youth through modern IT education and professional skill development.
          </p>

          <p className="text-gray-400 mb-4">
            Today, GIST stands as a leading institute in Sukkur offering practical training in
            <span className="text-white">
              {' '}
              Web Development, Artificial Intelligence, Freelancing, Digital Marketing, Graphic
              Design
            </span>{' '}
            and many more in-demand skills.
          </p>

          <p className="text-gray-400 mb-6">
            We focus on real-world learning — not just theory — helping students earn online, build
            careers, and compete globally.
          </p>

          {/* 🔥 AUTHORITY / RECOGNITION */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-red-400">Recognitions & Affiliations</h3>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-white/10 px-3 py-2 rounded-lg">🇵🇰 NAVTTC Certified</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">🏛 Sindh Board (SBTE)</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">💻 PSEB Connected</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">📡 IT Ministry Pakistan</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">
                🎓 Skill Development Programs
              </span>
            </div>
          </div>

          {/* 🔥 COURSES / SKILLS */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-red-400">Our Core Programs</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <span className="bg-white/10 px-3 py-2 rounded-lg">🌐 Web Development</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">🤖 Artificial Intelligence</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">🎨 Graphic Design</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">📈 Digital Marketing</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">💼 Freelancing</span>
              <span className="bg-white/10 px-3 py-2 rounded-lg">🧠 MS Office & IT Basics</span>
            </div>
          </div>

          {/* 🔥 WHY GIST */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-400">Why Choose GIST?</h3>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-white/10 px-4 py-2 rounded-lg">💻 Practical Training</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">🌍 Freelancing Focus</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">📡 Online + Physical Classes</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">🏆 Career-Oriented Courses</span>
              <span className="bg-white/10 px-4 py-2 rounded-lg">🚀 Job & Skill Growth</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black flex items-center justify-center">
          <Image
            src="/images/8.JPEG"
            alt="GIST Institute"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
