'use client';

import CourseCard from './CourseCard';

const courses = [
  {
    title: 'Web Development',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Build modern websites & start freelancing career',
    tag: 'Trending',
  },
  {
    title: 'Artificial Intelligence',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Learn AI tools, automation & future skills',
    tag: 'Hot',
  },
  {
    title: 'Graphic Design',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Logo design, branding & social media posts',
    tag: 'Popular',
  },
  {
    title: 'Video Editing',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Edit videos for YouTube & freelancing',
    tag: 'Trending',
  },
  {
    title: 'Freelancing Mastery',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Earn online from Fiverr, Upwork & more',
    tag: 'Hot',
  },
  {
    title: 'Social Media Marketing',
    duration: '2 Months',
    price: '5000 PKR',
    original: '8000 PKR',
    desc: 'Run ads & grow businesses online',
    tag: 'Popular',
  },
  {
    title: 'DIT (Diploma in IT)',
    duration: '1 Year',
    price: '2000 PKR / month',
    original: '3000 PKR',
    desc: 'Complete IT foundation + professional skills',
    tag: 'Best Value',
  },
  {
    title: 'CIT (Certificate in IT)',
    duration: '6 Months',
    price: '2000 PKR / month',
    original: '',
    desc: 'Basic computer, MS Office & typing skills',
    tag: 'Beginner',
  },
  {
    title: 'English & Typing Course',
    duration: '6 Months',
    price: '2000 PKR / month',
    original: '',
    desc: 'Improve English + typing speed for jobs',
    tag: 'Essential',
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-black text-white text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Our <span className="text-red-400">Courses</span>
      </h1>

      <p className="text-gray-400 mb-12">
        Choose your skill, build your future & start earning online
      </p>

      <div className="grid md:grid-cols-3 gap-8 px-10">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
}
