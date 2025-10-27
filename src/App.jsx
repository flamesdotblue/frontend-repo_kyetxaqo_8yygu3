import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Mockup from './components/Mockup';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Mockup />
      </main>
      <footer id="contact" className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white grid place-items-center font-bold">C</div>
            <p className="font-semibold">ContainaPro</p>
          </div>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} ContainaPro. Food-safe packaging manufactured with care.</p>
          <div className="text-sm text-gray-600">
            <a href="#mockup" className="hover:text-emerald-700">Get a quote</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
