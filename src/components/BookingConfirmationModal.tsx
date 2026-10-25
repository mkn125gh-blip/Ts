import React from 'react';
import { CheckCircle2, Calendar, MapPin, Phone, Car, Download, X } from 'lucide-react';

interface BookingConfirmationModalProps {
  bookingDetails: any | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  bookingDetails,
  onClose,
}) => {
  if (!bookingDetails) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="bg-[#12151e] border border-white/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative text-slate-200 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
            Appointment Confirmed
          </span>
          <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-1">
            TintGo Doorstep Booked!
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Booking ID: <strong className="text-white font-mono">{bookingDetails.id || bookingDetails.orderId}</strong>
          </p>
        </div>

        {/* Product Image & Details Card */}
        <div className="space-y-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
          {bookingDetails.productImage && (
            <div className="relative h-28 rounded-lg overflow-hidden bg-slate-900 border border-white/10 mb-2">
              <img
                src={bookingDetails.productImage}
                alt={bookingDetails.product || 'Product'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-amber-400">
                {bookingDetails.brand || 'TintGo Verified'}
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <Car className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block">Vehicle & Package:</span>
              <strong className="text-white">{bookingDetails.car || 'Vehicle Fitment Package'}</strong>
              <p className="text-slate-300 text-[11px] mt-0.5">
                {bookingDetails.product || 'Avery Dennison / Würth Ceramic Sunscreen Film'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block">Date & Time Slot:</span>
              <strong className="text-white">{bookingDetails.date || 'Tomorrow'} · {bookingDetails.timeSlot || 'Morning 9:30 AM'}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block">Doorstep Address:</span>
              <span className="text-slate-200">{bookingDetails.address}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-slate-400">Total Payable at Doorstep:</span>
            <span className="text-lg font-black text-amber-400 font-display tabular-nums">
              ₹{Number(bookingDetails.price || bookingDetails.total || 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Technician note */}
        <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Our mobile installer will call you 30 mins before arrival at your driveway.</span>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done & Return to App
          </button>
        </div>
      </div>
    </div>
  );
};
