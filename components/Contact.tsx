'use client';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-black text-white px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Contact <span className="text-red-400">Us</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* LEFT */}
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-lg">📞 Phone: 0300-3113830</div>

          <div className="bg-white/10 p-4 rounded-lg">💬 WhatsApp: 0300-3113830</div>

          <a
            href="mailto:gist.educational@gmail.com"
            className="block bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
          >
            📧 Email: gist.educational@gmail.com
          </a>

          <div className="bg-white/10 p-4 rounded-lg">
            📍 Address: Laar Tower, 1st floor, 100 Feet Road Near IBA University Gate No 2, Sukkur,
            Sindh, Pakistan
          </div>

          <a
            href="https://wa.me/923180373055"
            target="_blank"
            className="block text-center bg-green-500 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT */}
        <div className="bg-white/10 p-6 rounded-2xl">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent (demo)');
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-black text-white border border-white/20"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 rounded bg-black text-white border border-white/20"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-black text-white border border-white/20"
            />

            <select className="w-full p-3 rounded bg-black text-white border border-white/20">
              <option value="">Are you a GIST student?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded bg-black text-white border border-white/20"
            ></textarea>

            <button className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
