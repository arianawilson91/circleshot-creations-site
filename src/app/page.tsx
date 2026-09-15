import { Book } from '@/components/Book';
import { Events } from '@/components/Events';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Nav } from '@/components/Nav';
import { Packages } from '@/components/Packages';
import { Process } from '@/components/Process';
import { Reel } from '@/components/Reel';

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Reel />
        <Packages />
        <Process />
        <Events />
        <Gallery />
        <Faq />
        <Book />
      </main>
      <Footer />
    </div>
  );
}
