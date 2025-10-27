import { ShoppingCart, Package, Palette } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 sm:pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
              Premium Food Containers
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              Manufacture. Brand. Sell. All in one place.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              From airtight meal-prep tubs to industrial-grade buckets—design your packaging, preview branded mockups, and request pricing in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#mockup" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow hover:bg-emerald-700 transition">
                <Palette className="w-4 h-4" /> Start Mockup
              </a>
              <a href="#products" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-xl ring-1 ring-gray-200 hover:ring-gray-300 transition">
                <Package className="w-4 h-4" /> Explore Products
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Feature icon={ShoppingCart} title="Wholesale & Retail" desc="Flexible MOQs" />
              <Feature icon={Package} title="Food Safe" desc="BPA-free, FDA compliant" />
              <Feature icon={Palette} title="Custom Branding" desc="Print & emboss" />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200 via-emerald-100 to-white rounded-3xl shadow-inner border border-emerald-100 p-8">
              <div className="h-full w-full rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 grid place-items-center">
                <svg viewBox="0 0 360 260" className="w-full h-full max-h-[380px]">
                  <defs>
                    <linearGradient id="body" x1="0" x2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <rect x="60" y="50" width="240" height="140" rx="18" fill="url(#body)" />
                  <rect x="70" y="40" width="220" height="24" rx="12" fill="#0f766e" />
                  <rect x="90" y="70" width="180" height="8" rx="4" fill="#ecfdf5" opacity="0.8" />
                  <rect x="90" y="90" width="140" height="8" rx="4" fill="#ecfdf5" opacity="0.7" />
                  <rect x="90" y="110" width="160" height="8" rx="4" fill="#ecfdf5" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
