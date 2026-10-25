import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Sun, Droplets, CheckCircle, Zap } from 'lucide-react';

export const SolarTechnology: React.FC = () => {
  const bentoPillars = [
    {
      icon: Sun,
      iconColor: 'text-amber-400',
      title: '1. 99.9% UV Protection',
      description:
        'Prolonged sun exposure damages skin and bleaches vehicle interiors. Our films act like SPF 1000 sunscreen on your automotive glass.',
    },
    {
      icon: Flame,
      iconColor: 'text-red-500',
      title: '2. -22°C Interior Temp Reduction',
      description:
        'Step into a cooler car even when parked under blazing sun. Reduces AC load, saving fuel and battery range on electric vehicles.',
    },
    {
      icon: Droplets,
      iconColor: 'text-emerald-400',
      title: '3. Doorstep Dust-Free Fitting',
      description:
        'Our mobile van deploys an electrostatic containment canopy right in your driveway, preventing dust nibs and bubbles during installation.',
    },
  ];

  return (
    <section id="tech" className="py-16 lg:py-24 bg-[#090b0f] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Thermal Defense Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic text-white uppercase font-display tracking-tight">
            How Würth & Avery Dennison Stop Solar Heat
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Conventional cheap dyed tints merely darken windows while letting infrared heat cook the cabin. Nano-ceramic solar films reject up to 98% of heat at the molecular level.
          </p>
        </motion.div>

        {/* 2-Column Comparison between Wurth and Avery Dennison with Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-14">
          {/* Würth Box */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#12151f] rounded-2xl border border-red-500/30 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/60 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-bl-full pointer-events-none" />
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-red-500 block mb-1">
                Künzelsau, Germany
              </span>
              <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">
                Würth Solar Heat Shield Series
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Formulated by Adolf Würth GmbH & Co. KG for premium European automobiles. Uses multi-layer dielectric ceramics to block high-frequency infrared radiation without metallic signal interference.
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span><strong>82% - 88% Infrared Heat Deflection:</strong> Cuts thermal load on vehicle AC compressor.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span><strong>99% UV-A / UV-B Shield:</strong> Prevents cracking of leather seats and steering dash.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span><strong>Optical German Clarity:</strong> Zero internal haze or milky distortion during night drives.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Standard Warranty: 5 Years</span>
              <span className="text-red-400 font-bold">German Quality Mark</span>
            </div>
          </motion.div>

          {/* Avery Dennison Box */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#12151f] rounded-2xl border border-amber-500/30 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/60 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 block mb-1">
                Glendale, California, USA
              </span>
              <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight">
                Avery Dennison Supreme Defense Nano
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pioneers of adhesive science and high-performance automotive materials. Supreme Defense features sputtered nano-ceramic technology engineered for harsh sun environments.
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>98% Infrared Solar Heat Barrier:</strong> Extreme heat dissipation tested in Death Valley.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Zero RF & Satellite Distortion:</strong> Total transparency to 5G, GPS, FasTag, and keyless entry.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Never Fades or Purples:</strong> Inorganic metal-free ceramic particles withstand intense sun years.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Standard Warranty: Lifetime</span>
              <span className="text-amber-400 font-bold">USA Flagship Certified</span>
            </div>
          </motion.div>
        </div>

        {/* 3 Pillar Bento Grid with Staggered Scroll-Triggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoPillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
              >
                <IconComponent className={`w-8 h-8 ${pillar.iconColor} mb-3`} />
                <h4 className="text-base font-bold text-white uppercase font-display">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
