import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award } from 'lucide-react';

interface FooterProps {
  onOpenWarranty: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWarranty,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <footer className="bg-[#08090d] border-t border-white/10 text-slate-400 text-xs pb-20 lg:pb-12 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto bg-white/5 p-1 rounded border border-white/10 flex items-center">
                <img
                  src="/assets/aistudio/IMG-20261012-WA0001_bd1c5aa7.jpg"
                  alt="TintGo Doorstep"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-black italic tracking-wider text-white font-display">
                TINT<span className="text-red-500">GO</span> DOORSTEP
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Certified doorstep installer for genuine Würth Automotive solar heat control films and Avery Dennison Supreme Defense Nano-Ceramic tints. We deliver showroom precision directly to your home driveway.
            </p>
            <div className="flex items-center gap-3 text-amber-400 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Authorized Würth Germany & Avery Dennison Dealer</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Products & Brands
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Würth Solar Heat Shield
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Avery Dennison Supreme Ceramic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Würth Front Windshield Sunscreen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  PPF & Sunscreen Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Doorstep Service
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Schedule Mobile Van Fitting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive VLT Shade Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Online E-Warranty Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tech')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Solar Thermal Engineering Data
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Doorstep Hotline
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>1800-TINT-GO (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>doorstep@tintgo.in</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mobile Vans Active in Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TintGo Doorstep PPF & Car Sun Control Film. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Doorstep Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors">Manufacturer Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
