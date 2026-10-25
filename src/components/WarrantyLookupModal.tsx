import React, { useState } from 'react';
import { ShieldCheck, Search, X, CheckCircle, FileText, QrCode } from 'lucide-react';

interface WarrantyLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarrantyLookupModal: React.FC<WarrantyLookupModalProps> = ({ isOpen, onClose }) => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setHasSearched(true);
    // Realistic lookup demonstration for TintGo / Würth / Avery Dennison warranty serials
    if (lookupQuery.toLowerCase().includes('w') || lookupQuery.toLowerCase().includes('wurth')) {
      setResult({
        certNumber: 'WURTH-DE-2024-8849',
        customer: 'Registered Customer',
        vehicle: 'Toyota Fortuner 4x4 (Black)',
        filmType: 'Würth Automotive Solar Heat Shield (75% Windshield + 35% Sides)',
        installationDate: '14 May 2024',
        validUntil: '14 May 2029 (5 Years Active)',
        status: 'Active & Verified Genuine',
        installer: 'TintGo Certified Doorstep Master Tech #104',
        origin: 'Künzelsau, Germany',
      });
    } else {
      setResult({
        certNumber: `AD-USA-${lookupQuery.toUpperCase() || '77291'}`,
        customer: 'Authorized Vehicle Owner',
        vehicle: 'BMW 330i M Sport',
        filmType: 'Avery Dennison Supreme Defense Nano-Ceramic 35%',
        installationDate: '22 October 2024',
        validUntil: 'Lifetime Transferable Warranty',
        status: 'Active & Lifetime Protected',
        installer: 'TintGo Mobile Technician #08',
        origin: 'Glendale, California, USA',
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-[#12151e] border border-white/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative text-slate-200">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
              E-Warranty & Authenticity Check
            </h3>
            <p className="text-xs text-slate-400">
              Verify genuine roll serial for Würth and Avery Dennison films
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Vehicle Plate or Warranty Card #"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-1.5 block">
            Try typing: <code className="text-amber-400 bg-white/5 px-1 py-0.5 rounded cursor-pointer" onClick={() => setLookupQuery('WURTH-8849')}>WURTH-8849</code> or <code className="text-amber-400 bg-white/5 px-1 py-0.5 rounded cursor-pointer" onClick={() => setLookupQuery('AD-9921')}>AD-9921</code>
          </span>
        </form>

        {hasSearched && result && (
          <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 space-y-3 text-xs animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {result.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {result.certNumber}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Film Certified:</span>
                <span className="font-semibold text-white">{result.filmType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Manufactured In:</span>
                <span className="font-medium text-slate-200">{result.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle Protected:</span>
                <span className="font-medium text-slate-200">{result.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty Coverage:</span>
                <span className="font-bold text-amber-400">{result.validUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Installed By:</span>
                <span className="text-slate-300">{result.installer}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                Digital QR Hologram Synced
              </span>
              <span className="text-emerald-400 font-medium">Original Roll Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
