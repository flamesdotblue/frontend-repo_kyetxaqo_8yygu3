import { useMemo, useRef, useState } from 'react';
import { Palette, Type, Download, Ruler } from 'lucide-react';

export default function Mockup() {
  const [shape, setShape] = useState('rect');
  const [size, setSize] = useState(700);
  const [color, setColor] = useState('#10b981');
  const [lid, setLid] = useState(true);
  const [logo, setLogo] = useState('ContainaPro');

  const svgRef = useRef(null);

  const dims = useMemo(() => {
    // map size in ml to visual dimensions
    const base = 260;
    const factor = Math.min(1.2, Math.max(0.6, size / 1000));
    const w = base * (shape === 'round' ? 0.9 : 1.1) * factor;
    const h = base * 0.6 * factor;
    return { w, h };
  }, [size, shape]);

  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `container-mockup-${shape}-${size}ml.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="mockup" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="order-2 lg:order-1">
            <p className="text-emerald-700 font-semibold">Brand Mockup</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Design your container</h2>
            <p className="mt-2 text-gray-600">Pick size, shape and color, add your brand, then export a crisp SVG preview for your proposal.</p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Shape</label>
                <div className="mt-2 flex gap-2">
                  <ToggleOption label="Rectangular" active={shape==='rect'} onClick={() => setShape('rect')} />
                  <ToggleOption label="Round" active={shape==='round'} onClick={() => setShape('round')} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><Ruler className="w-4 h-4"/> Volume: {size} ml</label>
                <input type="range" min="300" max="2000" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-2 w-full accent-emerald-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><Palette className="w-4 h-4"/> Container Color</label>
                <div className="mt-2 flex items-center gap-3">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 rounded cursor-pointer border border-gray-200" />
                  <span className="text-sm text-gray-600">{color}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2"><Type className="w-4 h-4"/> Brand Text</label>
                <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="Your brand" className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div className="flex items-center gap-2">
                <input id="lid" type="checkbox" checked={lid} onChange={(e)=>setLid(e.target.checked)} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="lid" className="text-sm text-gray-700">Include snap-lock lid</label>
              </div>

              <div className="pt-2">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
                  <Download className="w-4 h-4"/> Export SVG
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-inner">
              <div className="aspect-[4/3] rounded-2xl bg-white grid place-items-center border border-gray-100">
                <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0f172a" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* Table shadow */}
                  <ellipse cx="350" cy="420" rx="220" ry="24" fill="#0f172a" opacity="0.08" />

                  {/* Container body */}
                  {shape === 'rect' ? (
                    <g filter="url(#shadow)">
                      <rect x={200} y={160} width={dims.w} height={dims.h} rx="24" fill={color} />
                      <rect x={210} y={170} width={dims.w - 20} height={dims.h - 20} rx="20" fill="#ffffff10" />
                    </g>
                  ) : (
                    <g filter="url(#shadow)">
                      <ellipse cx="350" cy={200 + dims.h/2} rx={dims.w/2} ry={dims.h/2} fill={color} />
                      <ellipse cx="350" cy={200 + dims.h/2} rx={(dims.w/2) - 14} ry={(dims.h/2) - 14} fill="#ffffff10" />
                    </g>
                  )}

                  {/* Lid */}
                  {lid && (
                    shape === 'rect' ? (
                      <rect x={195} y={150} width={dims.w + 10} height="18" rx="10" fill="#0f766e" />
                    ) : (
                      <ellipse cx="350" cy="150" rx={dims.w/2 + 10} ry="14" fill="#0f766e" />
                    )
                  )}

                  {/* Label */}
                  <g>
                    <rect x="245" y="230" width="210" height="90" rx="14" fill="#ffffff" opacity="0.9" />
                    <text x="350" y="285" textAnchor="middle" fontFamily="Inter, system-ui, -apple-system, Segoe UI" fontWeight="700" fontSize="28" fill="#0f172a">{logo || ' '}</text>
                    <text x="350" y="310" textAnchor="middle" fontFamily="Inter, system-ui, -apple-system, Segoe UI" fontWeight="500" fontSize="12" fill="#334155">{size} ml</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleOption({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}>
      {label}
    </button>
  );
}
