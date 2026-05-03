export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* 🏫 BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-2 tracking-wide">GIST</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Glamour Institute of Science & Technology empowering future IT professionals with modern
            skills.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-5 mt-5 text-sm">
            <a
              href="https://www.facebook.com/profile.php?id=61582627555042"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              Facebook
            </a>

            <a
              href="https://www.linkedin.com/company/glamour-institute-of-science-and-technology/"
              target="_blank"
              className="hover:text-blue-300 transition"
            >
              LinkedIn
            </a>

            <a
              href="https://wa.me/923003113830"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* 📞 CONTACT */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Contact</h3>

          <p className="text-gray-400 text-sm mb-2">
            📍 Laar Tower, 1st Floor, 100 Feet Road, Near IBA University Gate No 2, Sukkur
          </p>

          <p className="text-gray-400 text-sm mb-2">📞 0300-3113830</p>

          <p className="text-gray-400 text-sm">📧 gist.educational@gmail.com</p>

          {/* CTA */}
          <a
            href="https://wa.me/923003113830"
            target="_blank"
            className="inline-block mt-4 bg-green-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* 🗺️ MAP */}
        <div>
          <h3 className="font-semibold mb-3 text-white">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.731380735018!2d68.8159177!3d27.72557889999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3935d5699176a581%3A0x4581e1c44a25c54e!2sGlamour%20Institute%20of%20Science%20And%20Technology%20Sukkur!5e0!3m2!1sen!2s!4v1777099330608!5m2!1sen!2s"
            className="w-full h-40 md:h-48 rounded-lg border border-white/10 shadow-md"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* 🔻 BOTTOM BAR */}
      <div className="text-center text-gray-500 text-sm py-4 border-t border-white/10">
        © 2026 GIST • All rights reserved • Developed by Zaid hussain dahar
      </div>
    </footer>
  );
}
