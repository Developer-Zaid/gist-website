'use client';

import Image from 'next/image';

const galleryData = [
  { src: '/images/8.JPEG', title: 'GIST Building', desc: 'Modern campus in Sukkur' },
  {
    src: '/images/4.JPEG',
    title: 'Office / Administration',
    desc: 'Management and student support services',
  },
  {
    src: '/images/5.JPEG',
    title: 'Help Desk',
    desc: 'Guidance and admission support for students',
  },
  {
    src: '/images/6.JPEG',
    title: 'Training Classroom',
    desc: 'Interactive and comfortable learning space',
  },
  { src: '/images/9.JPEG', title: 'Computer Lab', desc: 'Fully equipped systems for students' },
  {
    src: '/images/7.JPEG',
    title: 'Class Room',
    desc: 'Spacious environment for theory sessions',
  },
  {
    src: '/images/3.JPEG',
    title: 'Advanced IT Lab',
    desc: 'Hands-on practical training environment',
  },
  {
    src: '/images/1.JPEG',
    title: 'Conference Room',
    desc: 'Meetings, discussions and presentations',
  },
  {
    src: '/images/2.JPEG',
    title: 'Learning Environment',
    desc: 'Professional and inspiring setup',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-black text-white px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
        Our <span className="text-red-400">Institute</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {galleryData.map((item, i) => (
          <div key={i} className="relative w-full h-[250px] overflow-hidden rounded-xl group">
            {/* Image */}
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 opacity-100">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
