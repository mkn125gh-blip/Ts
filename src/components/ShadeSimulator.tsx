import React, { useState } from 'react';
import { Sun, Moon, ShieldCheck, Thermometer, Eye, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { SHADE_OPTIONS } from '../data/products';

interface ShadeSimulatorProps {
  onSelectShadeForBooking: (vlt: number, brand: 'wurth' | 'avery_dennison') => void;
}

export const ShadeSimulator: React.FC<ShadeSimulatorProps> = ({
  onSelectShadeForBooking,
}) => {
  const [selectedVlt, setSelectedVlt] = useState<number>(35);
  const [selectedBrand, setSelectedBrand] = useState<'wurth' | 'avery_dennison'>('wurth');
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  const currentShade = SHADE_OPTIONS.find((s) => s.vlt === selectedVlt) || SHADE_OPTIONS[2];

  // Dynamic opacity calculation based on VLT (lower VLT = darker window)
  const tintOpacity = (100 - selectedVlt) / 100 * 0.85;

  return (
    <section id="simulator" className="py-16 lg:py-24 bg-[#0a0c10] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background ambient solar glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Sun Control Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic text-white uppercase font-display tracking-tight">
            Compare Tint Shades & Heat Rejection
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Visualize Visible Light Transmission (VLT) percentages, daytime glare reduction, and cabin cooling performance before technician arrives at your doorstep.
          </p>
        </div>

        {/* Brand & Ambient Lighting Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-[#141822] border border-white/10 mb-8">
          {/* Brand Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 pl-2">Film Technology:</span>
            <button
              onClick={() => setSelectedBrand('wurth')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === 'wurth'
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Würth German Ceramic
            </button>
            <button
              onClick={() => setSelectedBrand('avery_dennison')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === 'avery_dennison'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Avery Dennison Supreme Nano
            </button>
          </div>

          {/* Time of Day Lighting Toggle */}
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setIsNightMode(false)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                !isNightMode
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Direct Sun (Day)</span>
            </button>
            <button
              onClick={() => setIsNightMode(true)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isNightMode
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night Driving</span>
            </button>
          </div>
        </div>

        {/* Visualizer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Car Window Graphic Simulation (7 Cols) */}
          <div className="lg:col-span-7 bg-[#12151e] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 relative">
            {/* Viewport Frame */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
              {/* Background Landscape / Environment */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isNightMode
                    ? 'bg-gradient-to-b from-[#05070e] via-[#091124] to-[#04060c]'
                    : 'bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100'
                }`}
              >
                {/* Sun or Moon representation */}
                {!isNightMode ? (
                  <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-amber-300 blur-sm shadow-[0_0_50px_rgba(245,158,11,0.8)]" />
                ) : (
                  <div className="absolute top-4 right-8 w-12 h-12 rounded-full bg-slate-200 blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                )}
                {/* Distant mountains / road silhouette */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-[#181d29] opacity-80 clip-path-polygon" />
              </div>

              {/* Automotive Car Profile Outline with Tint Window */}
              <div className="relative z-10 w-full max-w-lg px-4 flex flex-col items-center">
                {/* Simulated Glass Section */}
                <div className="relative w-full h-44 rounded-t-[70px] rounded-b-xl border-4 border-slate-700 overflow-hidden shadow-2xl backdrop-blur-[0.5px]">
                  {/* Dynamic Tint Film Layer */}
                  <div
                    className="absolute inset-0 transition-all duration-300 flex items-center justify-center"
                    style={{
                      backgroundColor: selectedBrand === 'wurth' ? '#090a0f' : '#0c0f17',
                      opacity: tintOpacity,
                    }}
                  />

                  {/* Glass Reflection Highlighting */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Inside Car Interior Silhouette */}
                  <div className="absolute bottom-2 inset-x-8 flex items-end justify-between pointer-events-none opacity-40">
                    <div className="w-16 h-12 bg-black rounded-t-lg" />
                    <div className="w-20 h-16 bg-black rounded-full" />
                    <div className="w-16 h-12 bg-black rounded-t-lg" />
                  </div>

                  {/* Center live shade watermark badge */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-3xl sm:text-5xl font-black text-white font-display tabular-nums drop-shadow-md">
                      {selectedVlt}% VLT
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1 drop-shadow">
                      {selectedBrand === 'wurth' ? 'Würth German Heat Shield' : 'Avery Dennison Supreme'}
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium mt-0.5">
                      {currentShade.privacyLevel}
                    </span>
                  </div>
                </div>

                {/* Car Door Body Metal Lower Base */}
                <div className="w-full h-14 bg-gradient-to-b from-[#1b202c] to-[#0c0e14] rounded-b-xl border-x-4 border-b-4 border-slate-700 flex items-center justify-between px-6 shadow-inner">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-display">
                    TintGo Doorstep Calibration
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>UV Ray Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VLT Shade Selector Buttons */}
            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Select Shade Percentage (Visible Light Transmission):
              </span>
              <div className="grid grid-cols-5 gap-2">
                {SHADE_OPTIONS.map((shade) => (
                  <button
                    key={shade.vlt}
                    onClick={() => setSelectedVlt(shade.vlt)}
                    className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedVlt === shade.vlt
                        ? 'bg-red-600 text-white ring-2 ring-red-400 shadow-lg shadow-red-950'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-black font-display tabular-nums">
                      {shade.vlt}%
                    </span>
                    <span className="text-[10px] font-medium opacity-80 truncate max-w-full">
                      {shade.vlt === 70 ? 'Front' : shade.vlt <= 20 ? 'Dark' : 'Medium'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Data & Specs Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#12151e] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    Tested Specification
                  </span>
                  <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">
                    {currentShade.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentShade.description}
              </p>

              {/* Metrics Grid */}
              <div className="mt-6 space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-slate-300">Parked Cabin Temp Drop</span>
                  </div>
                  <span className="text-base font-bold text-amber-400 font-display tabular-nums">
                    -{currentShade.tempDrop}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-300">Ultraviolet (UV) Radiation Cut</span>
                  </div>
                  <span className="text-base font-bold text-emerald-400 font-display tabular-nums">
                    {currentShade.uvBlock}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-medium text-slate-300">Sun & Headlight Glare Reduction</span>
                  </div>
                  <span className="text-base font-bold text-sky-400 font-display tabular-nums">
                    {currentShade.glareCut}
                  </span>
                </div>
              </div>

              {/* Legal & Driving Guidance Note */}
              <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                <span className="font-bold">Tip:</span>
                <span>{currentShade.legalStatus}. TintGo technicians verify full regional transport compliance on-site.</span>
              </div>
            </div>

            {/* Direct Booking CTA with Shade Selected */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                onClick={() => onSelectShadeForBooking(selectedVlt, selectedBrand)}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950 transition-all cursor-pointer"
              >
                <span>Book Doorstep Fitment For {selectedVlt}% Shade</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
