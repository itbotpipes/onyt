import Overlays from '@/components/Overlays';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Expand from '@/components/Expand';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Capabilities from '@/components/Capabilities';
import Testimonials from '@/components/Testimonials';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <Overlays />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expand />
        <Services />
        <Work />
        <Stats />
        <Process />
        <Capabilities />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
