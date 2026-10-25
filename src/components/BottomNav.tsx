import React from 'react';
import { Home, Sliders, Calendar, ShoppingBag, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  cartCount: number;
  onNavigate: (sectionId: string) => void;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenWarranty: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  cartCount,
  onNavigate,
  onOpenCart,
  onOpenBooking,
  onOpenWarranty,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0d0f14]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => onNavigate('products')}
        className={`flex flex-col items-center gap-1 py-1 px-2 transition-colors cursor-pointer ${
          activeSection === 'products' ? 'text-red-500' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Products</span>
      </button>

      <button
        onClick={() => onNavigate('simulator')}
        className={`flex flex-col items-center gap-1 py-1 px-2 transition-colors cursor-pointer ${
          activeSection === 'simulator' ? 'text-red-500' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Sliders className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Shades</span>
      </button>

      {/* Prominent Center Action */}
      <button
        onClick={onOpenBooking}
        className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-500 text-white shadow-lg shadow-red-900/50 border-2 border-[#0d0f14] transition-transform active:scale-95 cursor-pointer"
        aria-label="Book Doorstep Installation"
      >
        <Calendar className="w-5 h-5" />
      </button>

      <button
        onClick={onOpenWarranty}
        className="flex flex-col items-center gap-1 py-1 px-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Warranty</span>
      </button>

      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center gap-1 py-1 px-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">Bag</span>
      </button>
    </div>
  );
};
