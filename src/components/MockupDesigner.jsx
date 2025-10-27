import { useEffect, useMemo, useRef, useState } from 'react';
import { Palette, Package, Layers } from 'lucide-react';

const COLORS = [
  { name: 'Emerald', value: '#10b981' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Stone', value: '#64748b' },
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#111827' },
];

export default function MockupDesigner() {
  const [shape, setShape] = useState('round'); // round | rectangular
  const [capacity, setCapacity] = useState('750ml');
  const [color, setColor] = useState(COLORS[0].value);
  const [lid, setLid] = useState('flat'); // flat | dome
  const [label, setLabel] = useState('Fresh Bites Co.');
  const [logoDataUrl, setLogoDataUrl] = useState(null);

  const svgRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return setLogoDataUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setLogoDataUrl(String(e.target?.result || ''));
    reader.readAsDataURL(file);
  };

  const downloadSVG = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `container-mockup-${shape}-${capacity}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bodyFill = useMemo(() => color, [color]);
  const lidFill = useMemo(() => (lid === 'flat' ? shade(color, -15) : shade(color, -25)), [color, lid]);

  return (
    <section id="mockup" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Brand Mockup</h2>
            <p className="mt-2 text-gray-600">Customize color, shape, lid, and label. Download your branded mockup instantly.</p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Palette className="w-4 h-4 text-emerald-600" /> Designer
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700">Container Shape</label>
                <div className="mt-2 flex gap-2">
                  <ToggleButton active={shape==='round'} onClick={() => setShape('round')}>Round</ToggleButton>
                  <ToggleButton active={shape==='rect'} onClick={() => setShape('rect')}>Rectangular</ToggleButton>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Capacity</label>
                <select value={capacity} onChange={(e) => setCapacity(e.target.value)} className="mt-2 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500">
                  {['500ml','750ml','1L','1.2L'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Body Color</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button key={c.value} onClick={() => setColor(c.value)} className={`w-8 h-8 rounded-full ring-2 ${color===c.value? 'ring-emerald-600':'ring-transparent'} shadow`} style={{ background: c.value }} aria-label={c.name} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Lid</label>
                <div className="mt-2 flex gap-2">
                  <ToggleButton active={lid==='flat'} onClick={() => setLid('flat')}>Flat</ToggleButton>
                  <ToggleButton active={lid==='dome'} onClick={() => setLid('dome')}>Dome</ToggleButton>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Label Text</label>
                <input value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Your brand name" className="mt-2 w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Upload Logo (PNG/SVG)</label>
                <input type="file" accept="image/*" onChange={(e)=>handleFile(e.target.files?.[0])} className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={downloadSVG} className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black">
                <Layers className="w-4 h-4" /> Download SVG
              </button>
              <a href="#contact" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                <Package className="w-4 h-4" /> Request Quote
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Package className="w-4 h-4 text-emerald-600" /> Live Preview
            </div>

            <div className="mt-4 aspect-square w-full grid place-items-center bg-emerald-50 rounded-xl border border-emerald-100">
              <svg ref={svgRef} viewBox="0 0 400 400" className="w-full h-full max-h-[520px]">
                {/* Shadow */}
                <ellipse cx="200" cy="330" rx="120" ry="18" fill="#000" opacity="0.08" />

                {shape === 'round' ? (
                  <>
                    {/* Lid */}
                    {lid === 'flat' ? (
                      <rect x="110" y="85" width="180" height="26" rx="13" fill={lidFill} />
                    ) : (
                      <path d="M110 110 Q200 60 290 110" fill={lidFill} />
                    )}
                    {/* Body */}
                    <rect x="100" y="110" width="200" height="180" rx="22" fill={bodyFill} />
                    {/* Label area */}
                    <rect x="120" y="170" width="160" height="70" rx="12" fill="#fff" opacity="0.92" />
                    {/* Text */}
                    <text x="200" y="210" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#111827">{label}</text>
                    {/* Logo */}
                    {logoDataUrl && (
                      <image href={logoDataUrl} x="170" y="220" width="60" height="40" preserveAspectRatio="xMidYMid meet" />
                    )}
                  </>
                ) : (
                  <>
                    {/* Lid */}
                    {lid === 'flat' ? (
                      <rect x="85" y="90" width="230" height="20" rx="10" fill={lidFill} />
                    ) : (
                      <path d="M85 110 Q200 70 315 110" fill={lidFill} />
                    )}
                    {/* Body */}
                    <rect x="80" y="110" width="240" height="180" rx="14" fill={bodyFill} />
                    {/* Label */}
                    <rect x="105" y="170" width="190" height="70" rx="10" fill="#fff" opacity="0.92" />
                    {/* Text */}
                    <text x="200" y="210" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#111827">{label}</text>
                    {/* Logo */}
                    {logoDataUrl && (
                      <image href={logoDataUrl} x="175" y="220" width="50" height="40" preserveAspectRatio="xMidYMid meet" />
                    )}
                  </>
                )}

                {/* Capacity badge */}
                <g>
                  <rect x="270" y="130" width="70" height="28" rx="8" fill="#111827" opacity="0.9" />
                  <text x="305" y="149" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" fontSize="12" fill="#fff">{capacity}</text>
                </g>
              </svg>
            </div>
            <p className="mt-3 text-xs text-gray-500">Tip: Use a transparent PNG for best results. Download provides vector SVG suitable for print teams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
        active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
      }`}
    >
      {children}
    </button>
  );
}

function shade(hex, percent) {
  // simple hex shade util
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const newR = Math.round((t - R) * p) + R;
  const newG = Math.round((t - G) * p) + G;
  const newB = Math.round((t - B) * p) + B;
  return `#${(0x1000000 + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
}
