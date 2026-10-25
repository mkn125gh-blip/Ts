import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Shield, CheckCircle, Truck, Car, AlertCircle, Wrench, Sparkles } from 'lucide-react';
import { Product, VehicleCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface DoorstepBookingProps {
  initialProduct?: Product | null;
  initialVehicleCategory?: VehicleCategory;
  initialVlt?: number;
  onBookingSuccess: (bookingId: string, bookingDetails: any) => void;
}

export const DoorstepBooking: React.FC<DoorstepBookingProps> = ({
  initialProduct,
  initialVehicleCategory = 'sedan',
  initialVlt,
  onBookingSuccess,
}) => {
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>(initialVehicleCategory);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct ? initialProduct.id : PRODUCTS[0].id
  );
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('2024');
  const [serviceCoverage, setServiceCoverage] = useState<'full_car' | 'sides_rear' | 'front_shield' | 'combo'>('full_car');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [doorstepAddress, setDoorstepAddress] = useState('');
  const [doorstepCity, setDoorstepCity] = useState('Delhi NCR');
  const [doorstepPincode, setDoorstepPincode] = useState('110001');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM - 11:30 AM (Morning)');
  const [specialNote, setSpecialNote] = useState('');
  const [paymentOption, setPaymentOption] = useState<'cod_doorstep' | 'upi' | 'card'>('cod_doorstep');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const calculatedBasePrice = currentProduct.pricesByVehicle[vehicleCategory];

  // Adjust coverage multiplier
  let finalPrice = calculatedBasePrice;
  if (serviceCoverage === 'sides_rear') {
    finalPrice = Math.round(calculatedBasePrice * 0.8);
  } else if (serviceCoverage === 'front_shield') {
    finalPrice = Math.min(3199, Math.round(calculatedBasePrice * 0.45));
  } else if (serviceCoverage === 'combo') {
    finalPrice = Math.round(calculatedBasePrice * 1.35);
  }

  const timeSlots = [
    { id: 'morning_1', time: '09:00 AM - 11:00 AM (Early Slot)' },
    { id: 'morning_2', time: '11:30 AM - 01:30 PM (Midday)' },
    { id: 'afternoon_1', time: '02:30 PM - 04:30 PM (Afternoon)' },
    { id: 'evening_1', time: '05:00 PM - 07:00 PM (Sunset Fitting)' },
  ];

  const popularCities = ['Delhi NCR', 'Mumbai & Thane', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Ahmedabad'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!carMake.trim() || !carModel.trim()) {
      setValidationError('Please enter your car make and model (e.g., Hyundai Creta, BMW 3 Series).');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setValidationError('Please provide your name and phone number for technician contact.');
      return;
    }
    if (!doorstepAddress.trim()) {
      setValidationError('Please enter your doorstep fitting address (Home/Office driveway or parking).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `TG-${Math.floor(100000 + Math.random() * 900000)}`;
      const details = {
        id: generatedId,
        car: `${carMake} ${carModel} (${carYear}) - ${vehicleCategory.toUpperCase()}`,
        product: currentProduct.name,
        productImage: currentProduct.image,
        brand: currentProduct.brandDisplayName,
        coverage: serviceCoverage,
        address: `${doorstepAddress}, ${doorstepCity} - ${doorstepPincode}`,
        date: selectedDate,
        timeSlot: selectedSlot,
        customerName,
        customerPhone,
        price: finalPrice,
        paymentOption,
      };
      setIsSubmitting(false);
      onBookingSuccess(generatedId, details);
    }, 600);
  };

  return (
    <section id="doorstep" className="py-16 lg:py-24 bg-[#0d0f14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Mobile Doorstep Precision Fitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic text-white uppercase font-display tracking-tight">
            Schedule TintGo At Your Doorstep
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Our certified mobile installation van arrives with pre-cut Würth and Avery Dennison films, dust-free containment canopy, and computerized tools.
          </p>
        </div>

        {/* Form & Summary Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#12151e] border border-white/10 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {validationError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Step 1: Vehicle Details */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-3">
                  <Car className="w-4 h-4" />
                  <span>1. Select Vehicle Classification & Details</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {(['hatchback', 'sedan', 'suv', 'luxury'] as VehicleCategory[]).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setVehicleCategory(cat)}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                        vehicleCategory === cat
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. BMW / Hyundai / Toyota"
                      value={carMake}
                      onChange={(e) => setCarMake(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. 330i / Creta / Fortuner"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="2024"
                      value={carYear}
                      onChange={(e) => setCarYear(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Product & Coverage Selection */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>2. Select Sunscreen Film Brand</span>
                </h3>

                <div className="space-y-2.5 mb-4">
                  {PRODUCTS.map((prod) => (
                    <label
                      key={prod.id}
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedProductId === prod.id
                          ? 'bg-red-600/10 border-red-500 text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="productSelection"
                        checked={selectedProductId === prod.id}
                        onChange={() => setSelectedProductId(prod.id)}
                        className="text-red-600 focus:ring-0 shrink-0"
                      />
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase text-white font-display truncate">
                            {prod.name}
                          </span>
                          <span className="text-xs font-bold text-amber-400 tabular-nums shrink-0">
                            ₹{prod.pricesByVehicle[vehicleCategory].toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {prod.subtitle} · {prod.specs.irRejection}% Heat Cut · {prod.specs.warrantyYears} Yr Warranty
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Coverage Area on Car:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceCoverage('full_car')}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      serviceCoverage === 'full_car'
                        ? 'bg-white text-slate-900 shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Full Vehicle (Sides & Rear)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceCoverage('sides_rear')}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      serviceCoverage === 'sides_rear'
                        ? 'bg-white text-slate-900 shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Sides Glass Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceCoverage('front_shield')}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      serviceCoverage === 'front_shield'
                        ? 'bg-white text-slate-900 shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Front Windshield Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceCoverage('combo')}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                      serviceCoverage === 'combo'
                        ? 'bg-white text-slate-900 shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Sun Film + PPF Armor
                  </button>
                </div>
              </div>

              {/* Step 3: Doorstep Location & Contact */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>3. Doorstep Service Address & Slot</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number (For OTP / Technician)</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Doorstep Address (Street, Building, Apartment, Parking info)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Villa 42, Palm Meadows, Whitefield Driveway"
                    value={doorstepAddress}
                    onChange={(e) => setDoorstepAddress(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Metro Region</label>
                    <select
                      value={doorstepCity}
                      onChange={(e) => setDoorstepCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    >
                      {popularCities.map((city) => (
                        <option key={city} value={city} className="bg-[#12151e] text-white">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="110001"
                      value={doorstepPincode}
                      onChange={(e) => setDoorstepPincode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Date and Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Time Slot</label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.time} className="bg-[#12151e] text-white">
                          {slot.time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Basement visitor parking, power outlet available or use van generator"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold uppercase tracking-wider text-sm shadow-xl shadow-red-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Wrench className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Confirming Appointment...' : `Confirm Doorstep Booking (₹${finalPrice.toLocaleString('en-IN')})`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Doorstep Service Guarantee & Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Pricing Breakdown Card */}
            <div className="bg-[#141824] border border-white/10 rounded-2xl p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 block">
                Doorstep Booking Summary
              </span>
              
              {/* Selected Product Image Preview */}
              <div className="mt-3 relative h-40 rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold text-amber-400 border border-white/10">
                  {currentProduct.brandDisplayName}
                </div>
              </div>

              <h4 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-4">
                {currentProduct.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Brand: <strong className="text-slate-200">{currentProduct.brandDisplayName}</strong> · Vehicle: <strong className="text-slate-200">{vehicleCategory.toUpperCase()}</strong>
              </p>

              <div className="mt-6 space-y-2.5 text-xs border-t border-b border-white/10 py-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Film & Material Fee</span>
                  <span className="font-bold text-white tabular-nums">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Doorstep Mobile Van Travel</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    FREE (₹0)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certified Master Installer Labor</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    INCLUDED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Official E-Warranty Hologram</span>
                  <span className="font-bold text-emerald-400 uppercase">
                    INCLUDED
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Payable:</span>
                  <span className="text-3xl font-black text-amber-400 font-display tabular-nums">
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Pay after doorstep inspection
                </span>
              </div>
            </div>

            {/* Why TintGo Doorstep? */}
            <div className="bg-[#12151e] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                The TintGo Doorstep Standard
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">100% Genuine Roll Sealed</strong>
                    Unboxed in front of you with official Würth / Avery Dennison security seal.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Self-Powered Mobile Van</strong>
                    We bring silent inverter power and pressurized sprayers. No power plug needed from your home.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Zero Bubble & Creep Guarantee</strong>
                    Any imperfection or peeling replaced immediately under written warranty.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
