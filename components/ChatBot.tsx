'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // 🤖 AUTO WELCOME MESSAGE
  // =========================
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '👋 Welcome! I am the AI Assistant of GIST. How may I help you today?',
      },
    ]);
  }, []);

  // =========================
  // 🔽 AUTO SCROLL
  // =========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // =========================
  // 🧠 BOT LOGIC (EDIT HERE)
  // =========================
  const getReply = (msg: string) => {
    const text = msg.toLowerCase();

    // 👋 GREETING
    if (text.includes('hi') || text.includes('hello') || text.includes('salam')) {
      return '👋 Hello! Welcome to GIST. I’m here to guide you. What would you like to know?';
    }

    // 📝 ADMISSION PROCESS
    if (text.includes('admission') || text.includes('apply') || text.includes('register')) {
      return 'Admission is very simple:\n1. Fill online form\n2. Upload required documents\n3. Wait for approval\n4. Start your classes 🎓';
    }

    // 🎓 MONTHLY COURSES (DIT, CIT, etc.)
    if (
      text.includes('dit') ||
      text.includes('cit') ||
      text.includes('ms office') ||
      text.includes('typing') ||
      text.includes('english')
    ) {
      return 'These courses have FREE admission. Monthly fee is 2000 PKR. Duration varies (DIT is 12 months).';
    }

    // 💻 SHORT COURSES
    if (text.includes('web') || text.includes('ai') || text.includes('graphic')) {
      return 'Short courses like Web Development, AI, and Graphic Design cost only 2000 PKR total (one-time fee).';
    }

    // 💰 FEES STRUCTURE
    if (text.includes('fee')) {
      return 'Admission is FREE for all courses.\nMonthly courses (DIT, CIT, MS Office, Typing): 2000 PKR/month.\nShort courses (Web, AI, Graphic): 5000 PKR total.';
    }

    // 📚 COURSES
    if (text.includes('course')) {
      return 'We offer DIT, CIT, MS Office, English Typing, Web Development, Artificial Intelligence, Graphic Design and more.';
    }

    // 📜 CERTIFICATE
    if (text.includes('certificate')) {
      return 'Yes, after completing your course, you will receive a certificate from GIST.';
    }

    // 🎯 ELIGIBILITY
    if (text.includes('eligible') || text.includes('qualification')) {
      return 'Anyone can join. No high qualification is required. Even beginners can start.';
    }

    // 🧠 BEGINNER
    if (text.includes('beginner') || text.includes('start')) {
      return 'Yes, our courses are designed for beginners. You can start from zero level.';
    }

    // ⏰ TIMINGS / BATCH
    if (
      text.includes('time') ||
      text.includes('timing') ||
      text.includes('batch') ||
      text.includes('shift')
    ) {
      return 'Our institute is open from 10 AM to 6 PM, Monday to Saturday. Flexible batches are available.';
    }

    // 💼 CAREER / JOB
    if (text.includes('job') || text.includes('earn') || text.includes('freelance')) {
      return 'Our goal is to help students gain skills to earn online and build careers in IT.';
    }

    // 👨‍🏫 TEACHERS
    if (text.includes('teacher') || text.includes('trainer')) {
      return 'Our instructors are experienced professionals who guide students step by step.';
    }

    // 🏫 ENVIRONMENT
    if (text.includes('environment') || text.includes('class')) {
      return 'We provide a friendly and professional learning environment for all students.';
    }

    // 📄 DOCUMENTS
    if (text.includes('document') || text.includes('requirement')) {
      return 'You may need CNIC/B-Form and basic educational documents for admission.';
    }

    // 📍 LOCATION
    if (text.includes('location') || text.includes('where')) {
      return 'We are located at Laar Tower, near IBA University Gate No 2, Sukkur.';
    }

    // 📞 CONTACT
    if (text.includes('contact') || text.includes('number')) {
      return 'You can contact us at 0300-3113830 or WhatsApp us anytime.';
    }

    // 🏫 ABOUT
    if (text.includes('gist') || text.includes('institute')) {
      return 'GIST (Glamour Institute of Science & Technology) focuses on affordable IT education. Our aim is learning, not earning.';
    }

    // 🚀 APPLY CTA
    if (text.includes('join')) {
      return 'You can apply through our website admission form or contact us on WhatsApp for quick guidance.';
    }

    // ❓ DEFAULT
    return 'I can help with courses, fees, admission, timings, and career guidance. What would you like to know? 😊';
  };

  // =========================
  // 📩 SEND MESSAGE
  // =========================
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const botMsg = { sender: 'bot', text: getReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* 🔘 FLOAT BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-xl hover:scale-110 transition"
      >
        💬
      </div>

      {/* 💬 CHAT BOX */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-black/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl flex flex-col">
          {/* HEADER */}
          <div className="p-3 border-b border-white/10 font-semibold text-white">
            GIST Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-3 overflow-y-auto h-64 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded max-w-[75%] ${
                  m.sender === 'user'
                    ? 'bg-red-500 text-white ml-auto'
                    : 'bg-white/10 text-gray-300'
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-2 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 p-2 bg-black border border-white/20 rounded text-white focus:outline-none"
              placeholder="Ask about courses, fees..."
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-red-500 to-orange-500 px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
