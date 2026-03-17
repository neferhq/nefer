import { Playfair_Display, Hanken_Grotesk } from 'next/font/google';
import ShaderBackground from '@/components/ui/ShaderBackground';

// Inisialisasi Fonts
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], display: 'swap' });

export default function Home() {
  return (
    <main className={`min-h-screen text-[#cde9da] ${hanken.className} relative`}>
      {/* Background Shader */}
      <ShaderBackground />

      {/* Konten Utama - Menggunakan grid & container sesuai DESIGN.md */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <nav className="flex justify-between items-center py-8">
          <div className="text-xl tracking-wide font-bold uppercase">Nefer</div>
          <div className="hidden md:flex gap-8 text-xs font-semibold tracking-[0.15em] uppercase">
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Process</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
          <button className="bg-[#057569] text-[#00170f] px-6 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-none hover:bg-opacity-90 transition-all">
            Let's Talk
          </button>
        </nav>

        {/* Hero Section */}
        <section className="flex-grow flex flex-col justify-center pt-20 pb-32">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6DAB8C]">
              Independent Digital Studio
            </span>
            <h1 className={`${playfair.className} text-4xl md:text-[80px] leading-[1.1] tracking-[-0.02em] mt-6 mb-8`}>
              Sculpting the digital ethereal.
            </h1>
            <p className="text-lg md:text-xl leading-[1.6] text-[#c3c7c7] max-w-lg mb-10">
              NEFER creates thoughtful digital experiences for people, brands, and ideas worth remembering.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-[#057569] text-[#00170f] px-8 py-3 text-sm font-semibold rounded-none hover:bg-opacity-90 transition-all">
                Start a Project
              </button>
              <button className="border border-[#cde9da]/20 px-8 py-3 text-sm font-semibold rounded-none hover:bg-[#6DAB8C]/10 transition-all">
                Explore Work
              </button>
            </div>
          </div>
        </section>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center pb-24 text-xs font-semibold tracking-[0.15em] uppercase text-[#c3c7c7]">
          <span>Scroll</span>
          <span className="mt-2 text-lg">↓</span>
        </div>

        {/* Statement Section */}
        <section className="py-32 flex justify-center text-center">
          <div className="max-w-4xl">
            <p className={`${playfair.className} text-3xl md:text-5xl leading-[1.3] text-[#cde9da]`}>
              <span className="text-[#6DAB8C]">Not just another website.</span><br />
              NEFER exists to turn ideas into digital experiences that feel clear, distinctive, and alive.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24">
          <h2 className={`${playfair.className} text-3xl md:text-[48px] mb-12`}>
            What I can build
          </h2>
          
          <div className="flex flex-col border-t border-[#cde9da]/20">
            {/* Service Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-[#cde9da]/20 hover:bg-[#cde9da]/5 transition-colors">
              <div className="md:col-span-2 text-5xl text-[#6DAB8C] font-mono">01</div>
              <div className="md:col-span-4 text-xl">Website Development</div>
              <div className="md:col-span-6 text-[#c3c7c7] leading-[1.6]">
                Custom-built websites focusing on performance, smooth animations, and exact design translation.
              </div>
            </div>

            {/* Service Item 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-[#cde9da]/20 hover:bg-[#cde9da]/5 transition-colors">
              <div className="md:col-span-2 text-5xl text-[#6DAB8C] font-mono">02</div>
              <div className="md:col-span-4 text-xl">Landing Pages</div>
              <div className="md:col-span-6 text-[#c3c7c7] leading-[1.6]">
                High-converting, narrative-driven single pages designed to capture attention and drive action.
              </div>
            </div>

            {/* Service Item 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-[#cde9da]/20 hover:bg-[#cde9da]/5 transition-colors">
              <div className="md:col-span-2 text-5xl text-[#6DAB8C] font-mono">03</div>
              <div className="md:col-span-4 text-xl">UI/UX Design</div>
              <div className="md:col-span-6 text-[#c3c7c7] leading-[1.6]">
                Interfaces that balance striking aesthetics with intuitive, frictionless user journeys.
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 flex flex-col md:flex-row justify-between items-center border-t border-[#cde9da]/20 mt-12">
          <div className="mb-6 md:mb-0">
            <div className="text-xl tracking-wide font-bold uppercase mb-2">Nefer</div>
            <div className="text-xs text-[#c3c7c7]">&copy; <a href="https://nefer.id/" className="hover:text-white transition-colors">NFR</a>. All rights reserved.</div>
          </div>
          
          <div className="flex flex-wrap gap-6 text-xs font-semibold tracking-[0.1em]">
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Process</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="https://github.com/neferhq/" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:neferhq@gmail.com" className="hover:text-white transition-colors">Mail</a>
            <a href="https://www.instagram.com/neferhq/" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </footer>

      </div>
    </main>
  );
}