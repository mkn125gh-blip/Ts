import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, PhoneCall, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenWarranty: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenBooking,
  onOpenWarranty,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/95 backdrop-blur-md border-b border-white/10">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-red-950/80 via-black to-amber-950/80 border-b border-red-500/20 text-xs text-slate-300 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline font-medium text-amber-400">
            ☀️ Peak Summer Alert: Free Doorstep Heat Inspection with every Würth & Avery Dennison Fitment
          </span>
          <span className="sm:hidden font-medium text-amber-400 mx-auto">
            Doorstep Fitting · Würth & Avery Dennison
          </span>
          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <button
              onClick={onOpenWarranty}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify E-Warranty</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>Doorstep Hotline: 1800-TINT-GO</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="flex items-center gap-3 group"
          >
            {/* User Logo Asset */}
            <div className="relative h-12 w-auto flex items-center bg-white/5 px-2.5 py-1 rounded border border-white/10 group-hover:border-red-500/50 transition-colors">
              <img
                src="/assets/aistudio/IMG-20261012-WA0001_bd1c5aa7.jpg"
                alt="TintGo Doorstep Logo"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black italic tracking-wider text-white font-display leading-none">
                TINT<span className="text-red-500">GO</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 leading-tight">
                DOORSTEP SERVICE
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide">
          <button
            onClick={() => handleNavClick('products')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'products' ? 'text-red-500' : 'text-slate-300'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'simulator' ? 'text-red-500' : 'text-slate-300'
            }`}
          >
            Shade Visualizer
          </button>
          <button
            onClick={() => handleNavClick('doorstep')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'doorstep' ? 'text-red-500' : 'text-slate-300'
            }`}
          >
            Doorstep Fitment
          </button>
          <button
            onClick={() => handleNavClick('tech')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              activeSection === 'tech' ? 'text-red-500' : 'text-slate-300'
            }`}
          >
            Solar Technology
          </button>
          <button
            onClick={onOpenWarranty}
            className="text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            E-Warranty
          </button>
        </nav>

        {/* Zone 3: Primary Action + Cart trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Bag and Doorstep Schedule"
            className="relative p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold tracking-wide uppercase shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Doorstep</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12151d] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('products')}
            className="block w-full text-left py-2 px-3 rounded text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Products (Würth & Avery Dennison)
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className="block w-full text-left py-2 px-3 rounded text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Interactive Shade Visualizer
          </button>
          <button
            onClick={() => handleNavClick('doorstep')}
            className="block w-full text-left py-2 px-3 rounded text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Doorstep Fitment Booking
          </button>
          <button
            onClick={() => handleNavClick('tech')}
            className="block w-full text-left py-2 px-3 rounded text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Solar Control Comparison
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWarranty();
            }}
            className="block w-full text-left py-2 px-3 rounded text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Verify E-Warranty
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold tracking-wide uppercase text-sm"
            >
              Book Doorstep Installation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
