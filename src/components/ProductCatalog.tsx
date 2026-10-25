import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Check, Info, Calendar, ShoppingBag, Eye, X } from 'lucide-react';
import { Product, VehicleCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductCatalogProps {
  selectedVehicleCategory: VehicleCategory;
  onVehicleCategoryChange: (category: VehicleCategory) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onAddToCart: (product: Product, vehicleCategory: VehicleCategory) => void;
  onBookDoorstep: (product: Product, vehicleCategory: VehicleCategory) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedVehicleCategory,
  onVehicleCategoryChange,
  activeFilter,
  onFilterChange,
  onAddToCart,
  onBookDoorstep,
}) => {
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const vehicleOptions: { key: VehicleCategory; label: string; icon: string }[] = [
    { key: 'hatchback', label: 'Hatchback', icon: '🚗' },
    { key: 'sedan', label: 'Sedan', icon: '🏎️' },
    { key: 'suv', label: 'SUV / Compact', icon: '🚙' },
    { key: 'luxury', label: 'Luxury / MPV', icon: '🚘' },
  ];

  const filterTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'wurth', label: 'Würth Germany' },
    { id: 'avery_dennison', label: 'Avery Dennison USA' },
    { id: 'windshield_sunscreen', label: 'Windshield Sunscreens' },
    { id: 'hybrid_bundle', label: 'Doorstep Combos' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'wurth') return product.brand === 'wurth';
    if (activeFilter === 'avery_dennison') return product.brand === 'avery_dennison';
    if (activeFilter === 'windshield_sunscreen') return product.category === 'windshield_sunscreen';
    if (activeFilter === 'hybrid_bundle') return product.category === 'hybrid_bundle' || product.category === 'ppf_sun_combo';
    return true;
  });

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#0d0f14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Certified Sun Protection Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic text-white uppercase font-display tracking-tight">
              Würth & Avery Dennison Sunscreen Range
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Authentic German Würth solar control films and US Avery Dennison nano-ceramic window tinting installed at your doorstep with zero dust guarantee.
            </p>
          </div>

          {/* Vehicle Category Selector: Instant Price Adaptor */}
          <div className="bg-[#161a23] p-1.5 rounded-xl border border-white/10 flex items-center gap-1 shrink-0 overflow-x-auto max-w-full">
            <span className="text-xs font-semibold text-slate-400 px-3 hidden sm:inline whitespace-nowrap">
              Vehicle Type:
            </span>
            {vehicleOptions.map((v) => (
              <button
                key={v.key}
                onClick={() => onVehicleCategoryChange(v.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  selectedVehicleCategory === v.key
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{v.icon}</span>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer relative ${
                activeFilter === tab.id
                  ? 'bg-white text-slate-900 shadow'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Product Cards Grid with Staggered Scroll-Triggered Reveal */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const currentPrice = product.pricesByVehicle[selectedVehicleCategory];

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.08, 0.35),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-[#12151d] rounded-2xl border border-white/10 overflow-hidden flex flex-col group hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300"
                >
                  {/* Product Image Stage */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-transparent to-black/30" />

                    {/* Brand & Badge Pills */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded tracking-wide uppercase ${
                          product.brand === 'wurth'
                            ? 'bg-red-600 text-white'
                            : product.brand === 'avery_dennison'
                            ? 'bg-slate-900/90 text-amber-400 border border-amber-500/40'
                            : 'bg-amber-500 text-black'
                        }`}
                      >
                        {product.brandDisplayName}
                      </span>
                      {product.badge && (
                        <span className="text-[11px] font-semibold px-2 py-1 rounded bg-black/60 text-slate-200 border border-white/10 backdrop-blur-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Quick Detail View Button */}
                    <button
                      onClick={() => setSelectedProductForModal(product)}
                      aria-label={`View specs for ${product.name}`}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-black text-white border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Specs</span>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
                        <span>{product.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>Warranty: {product.specs.warrantyYears} {typeof product.specs.warrantyYears === 'number' ? 'Years' : ''}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-400">★ {product.rating}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight group-hover:text-red-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>

                      {/* Solar Specs Grid */}
                      <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                        <div>
                          <span className="block text-xs font-semibold text-slate-400">IR Heat Cut</span>
                          <span className="text-sm font-bold text-amber-400 tabular-nums">
                            {product.specs.irRejection}%
                          </span>
                        </div>
                        <div className="border-x border-white/5">
                          <span className="block text-xs font-semibold text-slate-400">UV Block</span>
                          <span className="text-sm font-bold text-emerald-400 tabular-nums">
                            {product.specs.uvBlock}%
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-slate-400">VLT Tint</span>
                          <span className="text-sm font-bold text-white tabular-nums">
                            {product.specs.vlt}%
                          </span>
                        </div>
                      </div>

                      {/* Highlights bullet list */}
                      <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
                        {product.highlights.slice(0, 2).map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing and Action Strip */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-xs text-slate-400 uppercase tracking-wider block">
                            Doorstep Price ({selectedVehicleCategory})
                          </span>
                          <span className="text-2xl font-black text-white font-display tabular-nums">
                            ₹{currentPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-medium">
                          ✓ Free Doorstep Fitment
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onAddToCart(product, selectedVehicleCategory)}
                          className="py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add To Bag</span>
                        </button>

                        <button
                          onClick={() => onBookDoorstep(product, selectedVehicleCategory)}
                          className="py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-red-950 transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Slot</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product Detail Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedProductForModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#12151d] border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-slate-200"
            >
              <button
                onClick={() => setSelectedProductForModal(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden bg-slate-900 border border-white/10 aspect-[4/3]">
                    <img
                      src={selectedProductForModal.image}
                      alt={selectedProductForModal.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedProductForModal.secondaryImage && (
                    <div className="rounded-xl overflow-hidden bg-slate-900 border border-white/10 aspect-[16/9]">
                      <img
                        src={selectedProductForModal.secondaryImage}
                        alt="Product in-cabin performance"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                    {selectedProductForModal.brandDisplayName}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-1">
                    {selectedProductForModal.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {selectedProductForModal.description}
                  </p>

                  {/* Detailed Spec List */}
                  <div className="mt-5 space-y-2 border-t border-b border-white/10 py-4 text-xs">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Infrared (Heat) Rejection</span>
                      <span className="font-bold text-amber-400 tabular-nums">
                        {selectedProductForModal.specs.irRejection}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">UV Ray Blockage</span>
                      <span className="font-bold text-emerald-400 tabular-nums">
                        {selectedProductForModal.specs.uvBlock}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Total Solar Energy Rejected (TSER)</span>
                      <span className="font-bold text-white tabular-nums">
                        {selectedProductForModal.specs.totalSolarEnergyRejected}%
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Film Construction</span>
                      <span className="font-medium text-slate-200">
                        {selectedProductForModal.specs.material}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Warranty Coverage</span>
                      <span className="font-bold text-amber-400">
                        {selectedProductForModal.specs.warrantyYears} Years E-Warranty
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Country of Origin</span>
                      <span className="font-medium text-slate-200">
                        {selectedProductForModal.specs.countryOfOrigin}
                      </span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Package Includes (Doorstep Fitment):
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedProductForModal.packageIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-slate-400 block">
                        Price for {selectedVehicleCategory}:
                      </span>
                      <span className="text-2xl font-black text-white font-display tabular-nums">
                        ₹{selectedProductForModal.pricesByVehicle[selectedVehicleCategory].toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onBookDoorstep(selectedProductForModal, selectedVehicleCategory);
                        setSelectedProductForModal(null);
                      }}
                      className="py-3 px-6 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wide shadow-lg shadow-red-950 transition-colors cursor-pointer"
                    >
                      Schedule Doorstep Fitting
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
