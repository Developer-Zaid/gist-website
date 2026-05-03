'use client';

export default function Faculty() {
  return (
    <section
      id="faculty" // ✅ THIS IS CRITICAL
      className="bg-black text-white py-20 px-6 scroll-mt-24"
    >
      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our <span className="text-red-400">Faculty</span>
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 text-center hover:scale-105 transition shadow-lg border border-white/10">
          {/* IMAGE */}
          <div className="w-36 h-36 mx-auto mb-4 relative">
            <img
              src="/faculty/director.jpeg"
              alt="Director"
              className="w-full h-full object-cover object-top scale-90 rounded-full border-4 border-red-400 shadow-md"
            />

            {/* BADGE */}
            <span className="absolute bottom-0 right-0 bg-red-500 text-xs px-2 py-1 rounded-full">
              Director
            </span>
          </div>

          {/* NAME */}
          <h3 className="text-xl font-semibold leading-tight">
            Hafiz Qadir Bux <span className="text-red-400">Ph.D.</span>
          </h3>

          {/* TAGLINE */}
          <p className="text-gray-400 text-sm mb-3">Civil Engineer • PhD (UK) • Academic Leader</p>

          {/* HIGHLIGHTS (BADGES STYLE) */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
            <span className="bg-white/10 px-2 py-1 rounded">PhD - Glasgow (UK)</span>
            <span className="bg-white/10 px-2 py-1 rounded">MSc - Leeds (UK)</span>
            <span className="bg-white/10 px-2 py-1 rounded">NED Graduate</span>
            <span className="bg-white/10 px-2 py-1 rounded">ORS Award (UK)</span>
          </div>

          {/* BIO */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            A highly accomplished academic with international education and research experience.
            Awarded a Government of Pakistan scholarship for higher studies in the UK and honored
            with the Overseas Research Student Award. Leads GIST with a vision of delivering
            quality, practical, and affordable education.
          </p>

          {/* CONTACT (OPTIONAL BUT PREMIUM) */}
          <div className="flex justify-center gap-4 text-sm">
            <a href="mailto:gist.educational@gmail.com" className="hover:text-red-400 transition">
              📧 Email
            </a>

            <a href="tel:+923003113830" className="hover:text-green-400 transition">
              📞 Contact
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 text-center hover:scale-105 transition shadow-lg border border-white/10">
          {/* IMAGE */}
          <div className="w-36 h-36 mx-auto mb-4 relative">
            <img
              src="/faculty/coordinator.jpeg"
              alt="Coordinator"
              className="w-full h-full object-cover scale-110 object-center rounded-full border-4 border-orange-400 shadow-md"
            />

            {/* BADGE */}
            <span className="absolute bottom-0 right-0 bg-orange-500 text-xs px-2 py-1 rounded-full">
              Coordinator
            </span>
          </div>

          {/* NAME */}
          <h3 className="text-xl font-semibold leading-tight">
            Mr. <span className="text-orange-400">Zaid Hussain Dahar</span>
          </h3>

          {/* TAGLINE */}
          <p className="text-gray-400 text-sm mb-3">
            BS Computer Science • AI Engineer • Web Developer
          </p>

          {/* SKILL BADGES */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs">
            <span className="bg-white/10 px-2 py-1 rounded">AI / ML</span>
            <span className="bg-white/10 px-2 py-1 rounded">Web Development</span>
            <span className="bg-white/10 px-2 py-1 rounded">Trainer</span>
            <span className="bg-white/10 px-2 py-1 rounded">Management</span>
          </div>

          {/* BIO */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            A passionate AI Engineering and Web Development professional with 3+ years of experience
            in AI/ML research and analytical work. Focused on training students, building practical
            skills, and supporting effective institute management.
          </p>

          {/* CONTACT LINKS */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="mailto:Zaiddeveloper786@gmail.com"
              className="hover:text-orange-400 transition"
            >
              📧 Email
            </a>

            <a href="tel:+923317846297" className="hover:text-green-400 transition">
              📞 Whatsapp
            </a>

            <a
              href="https://zaidpersonalportfolio.netlify.app/"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              🌐 Website
            </a>

            <a
              href="https://www.linkedin.com/in/zaid-developer786/"
              target="_blank"
              className="hover:text-blue-300 transition"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
