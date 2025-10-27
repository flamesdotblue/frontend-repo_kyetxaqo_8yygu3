import { Package } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Airtight Meal Prep 750ml',
    desc: 'Microwave-safe, leak-proof lid',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 2,
    name: 'Rectangular 1.2L',
    desc: 'Stackable, freezer-safe',
    color: 'from-sky-500 to-sky-600',
  },
  { id: 3, name: 'Round 500ml', desc: 'Snack & deli containers', color: 'from-amber-500 to-amber-600' },
  { id: 4, name: 'Industrial Pail 10L', desc: 'Heavy-duty with handle', color: 'from-zinc-500 to-zinc-700' },
  { id: 5, name: 'Squeeze Sauce Bottle', desc: 'Food-grade LDPE', color: 'from-rose-500 to-rose-600' },
  { id: 6, name: 'Tamper Evident 1L', desc: 'Secure locking ring', color: 'from-violet-500 to-violet-600' },
];

export default function ProductGrid() {
  return (
    <section id="products" className="py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Best Sellers</h2>
            <p className="mt-2 text-gray-600">Durable, food-safe containers optimized for production and retail.</p>
          </div>
          <a href="#mockup" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black">
            <Package className="w-4 h-4" /> Build a Mockup
          </a>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.id} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition">
              <div className={`h-40 bg-gradient-to-br ${p.color} relative`}></div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition">{p.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-emerald-700 font-medium">Food-grade</span>
                  <button className="text-sm text-gray-900 font-semibold hover:text-emerald-700">View details →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
