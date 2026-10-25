import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ProductCatalog } from './components/ProductCatalog';
import { ShadeSimulator } from './components/ShadeSimulator';
import { DoorstepBooking } from './components/DoorstepBooking';
import { SolarTechnology } from './components/SolarTechnology';
import { CartDrawer } from './components/CartDrawer';
import { WarrantyLookupModal } from './components/WarrantyLookupModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { Product, VehicleCategory, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<VehicleCategory>('sedan');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState<boolean>(false);
  const [selectedProductForBooking, setSelectedProductForBooking] = useState<Product | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize cart from localStorage if present
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tintgo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tintgo_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, vehicleCategory: VehicleCategory) => {
    const price = product.pricesByVehicle[vehicleCategory];
    const cartItemId = `${product.id}-${vehicleCategory}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          vehicleCategory,
          carModel: 'General',
          selectedVlt: product.specs.vlt,
          doorstepInstallation: true,
          quantity: 1,
          price,
        },
      ];
    });

    showToast(`Added "${product.name}" for ${vehicleCategory.toUpperCase()} to your bag!`);
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookDoorstep = (product: Product, vehicleCategory: VehicleCategory) => {
    setSelectedProductForBooking(product);
    setSelectedVehicleCategory(vehicleCategory);
    handleNavigate('doorstep');
  };

  const handleSelectShadeForBooking = (vlt: number, brand: 'wurth' | 'avery_dennison') => {
    const matchedProduct = PRODUCTS.find((p) => p.brand === brand) || PRODUCTS[0];
    setSelectedProductForBooking(matchedProduct);
    handleNavigate('doorstep');
    showToast(`Selected ${vlt}% VLT with ${matchedProduct.brandDisplayName} for doorstep booking!`);
  };

  const handleBookingSuccess = (bookingId: string, details: any) => {
    setBookingConfirmation(details);
    showToast(`Doorstep booking ${bookingId} confirmed successfully!`);
  };

  const handleCheckoutComplete = (orderSummary: any) => {
    setBookingConfirmation({
      ...orderSummary,
      car: 'Direct Cart Order',
      date: 'Tomorrow',
      timeSlot: 'Morning (09:30 AM - 11:30 AM)',
      price: orderSummary.total,
    });
    setCart([]);
    setIsCartOpen(false);
    showToast(`Order ${orderSummary.orderId} submitted! Technician will contact you.`);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#161a24] text-white px-4 py-3 rounded-xl border border-red-500/40 shadow-2xl shadow-red-950/50 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('doorstep')}
        onOpenWarranty={() => setIsWarrantyOpen(true)}
        activeSection={activeSection}
      />

      {/* Main App Content */}
      <main className="flex-1">
        {/* Top Slider featuring Würth & Avery Dennison products */}
        <HeroSlider
          onSelectProductFilter={(filter) => {
            setActiveFilter(filter);
            handleNavigate('products');
          }}
          onOpenBooking={() => handleNavigate('doorstep')}
          onNavigateToSimulator={() => handleNavigate('simulator')}
        />

        {/* Product Catalog Grid (Würth Car Sunscreen + Avery Dennison) */}
        <ProductCatalog
          selectedVehicleCategory={selectedVehicleCategory}
          onVehicleCategoryChange={setSelectedVehicleCategory}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onAddToCart={handleAddToCart}
          onBookDoorstep={handleBookDoorstep}
        />

        {/* Interactive Shade Visualizer */}
        <ShadeSimulator
          onSelectShadeForBooking={handleSelectShadeForBooking}
        />

        {/* Doorstep Service Booking System */}
        <DoorstepBooking
          initialProduct={selectedProductForBooking}
          initialVehicleCategory={selectedVehicleCategory}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* Solar Defense Technology */}
        <SolarTechnology />
      </main>

      {/* Footer */}
      <Footer
        onOpenWarranty={() => setIsWarrantyOpen(true)}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('doorstep')}
      />

      {/* Hybrid Mobile Navigation */}
      <BottomNav
        activeSection={activeSection}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleNavigate('doorstep')}
        onOpenWarranty={() => setIsWarrantyOpen(true)}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onProceedToDoorstepBooking={() => handleNavigate('doorstep')}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Warranty Lookup Modal */}
      <WarrantyLookupModal
        isOpen={isWarrantyOpen}
        onClose={() => setIsWarrantyOpen(false)}
      />

      {/* Booking Confirmation Receipt Modal */}
      <BookingConfirmationModal
        bookingDetails={bookingConfirmation}
        onClose={() => setBookingConfirmation(null)}
      />
    </div>
  );
}
