import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2, Truck, Calendar } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onProceedToDoorstepBooking: () => void;
  onCheckoutComplete: (orderSummary: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToDoorstepBooking,
  onCheckoutComplete,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod_doorstep' | 'upi'>('cod_doorstep');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Please fill in your name, contact phone, and doorstep address.');
      return;
    }

    const orderSummary = {
      orderId: `TG-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      total: subtotal,
      customerName,
      phone,
      address,
      paymentMethod,
    };

    onCheckoutComplete(orderSummary);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151e] border-l border-white/10 text-slate-200 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white uppercase font-display tracking-tight">
                Your Doorstep Order ({items.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white font-display uppercase">
                  Your bag is empty
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Select Würth or Avery Dennison sun control films to schedule doorstep installation.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wide cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            ) : !isCheckingOut ? (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-start"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider">
                          {item.product.brandDisplayName}
                        </span>
                        <h5 className="text-xs font-bold text-white truncate font-display uppercase">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Vehicle: <strong className="text-slate-300">{item.vehicleCategory.toUpperCase()}</strong>
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-bold text-amber-400 font-display tabular-nums">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              aria-label="Remove item"
                              className="text-slate-500 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Doorstep Trust Note */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep fitment fee waived: ₹0 (Complimentary mobile visit)</span>
                </div>
              </>
            ) : (
              /* Inline Checkout View */
              <form id="drawer-checkout-form" onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    Fast Doorstep Checkout
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Edit Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number (For Doorstep OTP)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Doorstep Address / Driveway Location</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Apartment #, Street, Locality & City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Payment Preference</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      onClick={() => setPaymentMethod('cod_doorstep')}
                      className={`p-2.5 rounded-lg border text-center cursor-pointer ${
                        paymentMethod === 'cod_doorstep'
                          ? 'bg-red-600/20 border-red-500 text-white font-bold'
                          : 'bg-white/5 border-white/5 text-slate-300'
                      }`}
                    >
                      Cash / UPI on Doorstep Finish
                    </label>
                    <label
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-lg border text-center cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-red-600/20 border-red-500 text-white font-bold'
                          : 'bg-white/5 border-white/5 text-slate-300'
                      }`}
                    >
                      Instant UPI Pay
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Total Order Amount:
                </span>
                <span className="text-2xl font-black text-amber-400 font-display tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {!isCheckingOut ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950 transition-all cursor-pointer"
                  >
                    <span>Proceed to Quick Doorstep Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onProceedToDoorstepBooking();
                    }}
                    className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Or Pick Custom Schedule Slot</span>
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  form="drawer-checkout-form"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Doorstep Order (₹{subtotal.toLocaleString('en-IN')})</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
