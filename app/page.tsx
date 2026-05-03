import Hero from '@/components/Hero';
import About from '@/components/About';
import Courses from '@/components/Courses';
import Gallery from '@/components/Gallery';
import Faculty from '@/components/Faculty';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Gallery />
      <Faculty />
      <Contact />
    </>
  );
}
