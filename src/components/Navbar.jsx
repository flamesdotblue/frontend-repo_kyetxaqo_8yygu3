import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white grid place-items-center font-bold">C</div>
          <span className="font-extrabold tracking-tight text-gray-900">ContainaPro</span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => scrollTo('products')} className="hover:text-emerald-600">Products</button>
          <button onClick={() => scrollTo('mockup')} className="hover:text-emerald-600">Mockup</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-emerald-600">Contact</button>
        </div>
        <a href="#mockup" onClick={(e) => {e.preventDefault(); scrollTo('mockup');}} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
          Get a Quote
        </a>
      </nav>
    </header>
  );
}
