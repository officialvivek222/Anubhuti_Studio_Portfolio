import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PortfolioGrid from '@/components/PortfolioGrid';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
