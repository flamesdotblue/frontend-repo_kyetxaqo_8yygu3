import { Package, ShieldCheck, Droplets } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Meal-Prep Containers',
    desc: 'Microwave-safe, leak-resistant tubs perfect for delivery and retail.',
    specs: ['500ml / 700ml / 1000ml', 'PP / PET / PLA', 'Snap-lock lids'],
    badge: 'Retail Best-seller',
  },
  {
    name: 'Takeaway Bowls',
    desc: 'Crystal-clear bowls with domed lids for salads, desserts and cold foods.',
    specs: ['750ml / 1000ml / 1200ml', 'Food-grade PET', 'Recyclable'],
    badge: 'Crystal Clear',
  },
  {
    name: 'Industrial Pails',
    desc: 'Heavy-duty buckets with tamper-evident lids for sauces and bulk storage.',
    specs: ['5L / 10L / 20L', 'HDPE', 'Tamper Evident'],
    badge: 'Factory Grade',
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-emerald-700 font-semibold">Our Range</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Premium Food Containers</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Certified materials, precise molding, and modern aesthetics you can brand as your own.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">{p.badge}</span>
                <Icons />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{p.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {p.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a href="#mockup" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium">
                  Start Mockup →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icons() {
  return (
    <div className="flex items-center gap-2 text-emerald-700/80">
      <Package className="w-4 h-4" />
      <ShieldCheck className="w-4 h-4" />
      <Droplets className="w-4 h-4" />
    </div>
  );
}
