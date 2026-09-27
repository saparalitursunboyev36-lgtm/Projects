import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Search,
  Heart,
  ShoppingBag,
  Ticket as TicketIcon,
  Menu,
  X,
  QrCode,
  Building2,
  User,
  Sparkles,
  MapPin,
  Theater as TheaterIcon,
  Music2,
  Compass
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  favoritesCount: number;
  cartCount: number;
  activeTicketsCount: number;
  onOpenFavorites: () => void;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCity: string;
  onCityChange: (city: 'Toshkent' | 'Samarqand' | 'Buxoro') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  favoritesCount,
  cartCount,
  activeTicketsCount,
  onOpenFavorites,
  onOpenCart,
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Compass className="w-4 h-4" /> },
    { id: 'afisha', label: 'Afisha', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'theaters', label: 'Teatrlar', icon: <TheaterIcon className="w-4 h-4" /> },
    { id: 'concerts', label: 'Konsertlar', icon: <Music2 className="w-4 h-4" /> },
    { id: 'my-tickets', label: 'Chiptalarim', icon: <TicketIcon className="w-4 h-4" />, badge: activeTicketsCount },
    { id: 'organizer', label: 'Tashkilotchi', icon: <Building2 className="w-4 h-4" /> },
    { id: 'scanner', label: 'QR Skaner', icon: <QrCode className="w-4 h-4" /> }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0e0b08]/90 backdrop-blur-md border-b border-[#291e14] transition-all">
      {/* Top micro announcement bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 text-[11px] bg-[#140f0a] border-b border-[#231a11] text-[#9f8e7c]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
          <span>Rasmiy teatr va konsert chiptalari: 100% haqiqiylik kafolati & 48 soat ichida bekor qilish</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[#d4af37]">
            <MapPin className="w-3.5 h-3.5" />
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value as any)}
              className="bg-transparent border-none text-[11px] font-medium text-[#f4efe8] cursor-pointer focus:outline-none"
            >
              <option value="Toshkent" className="bg-[#140f0a]">Toshkent</option>
              <option value="Samarqand" className="bg-[#140f0a]">Samarqand</option>
              <option value="Buxoro" className="bg-[#140f0a]">Buxoro</option>
            </select>
          </div>
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-[#f4efe8] transition-colors cursor-pointer"
          >
            Kassalar & Qo'llab-quvvatlash
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c99b45] to-[#6d4d16] flex items-center justify-center p-[2px] shadow-lg shadow-[#c99b45]/10 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b0907] rounded-[10px] flex items-center justify-center">
              <span className="font-cinzel text-xl font-bold bg-gradient-to-r from-[#f7e0a8] to-[#c99b45] bg-clip-text text-transparent">
                S
              </span>
            </div>
          </div>
          <div>
            <div className="font-cinzel text-2xl font-extrabold tracking-widest bg-gradient-to-r from-[#fbf4eb] via-[#e2c17b] to-[#c99b45] bg-clip-text text-transparent">
              SAHNA
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#867561] font-mono -mt-1">
              Eksklyuziv chiptalar
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#140f0b]/80 p-1.5 rounded-full border border-[#2d2217]">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c99b45] to-[#97732a] text-[#0b0907] shadow-md shadow-[#c99b45]/20 font-bold'
                    : 'text-[#b3a18d] hover:text-[#f4efe8] hover:bg-[#201811]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-full font-mono ${
                      isActive ? 'bg-[#0b0907] text-[#e2c17b]' : 'bg-[#c99b45]/20 text-[#e2c17b]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action icons & controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative">
            <div className="hidden md:flex items-center bg-[#17110c] border border-[#2e2216] rounded-full px-3 py-1.5 focus-within:border-[#c99b45] transition-colors">
              <Search className="w-4 h-4 text-[#8a7966] mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'afisha' && e.target.value.trim().length > 0) {
                    onNavigate('afisha');
                  }
                }}
                placeholder="Spektakl, konsert, teatr..."
                className="bg-transparent text-xs text-[#f4efe8] placeholder-[#796957] focus:outline-none w-36 lg:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-[#8a7966] hover:text-[#f4efe8] ml-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="md:hidden p-2.5 rounded-full bg-[#17110c] border border-[#2e2216] text-[#b3a18d] hover:text-[#f4efe8]"
              title="Qidiruv"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full bg-[#17110c] border border-[#2e2216] text-[#b3a18d] hover:text-[#f4efe8] hover:border-[#c99b45]/50 transition-all cursor-pointer"
            title="Sevimlilar"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c99b45] text-[#0b0907] text-[10px] font-bold flex items-center justify-center font-mono">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#17110c] border border-[#2e2216] text-[#b3a18d] hover:text-[#f4efe8] hover:border-[#c99b45]/50 transition-all cursor-pointer"
            title="Savatcha"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b0907] text-[10px] font-bold flex items-center justify-center font-mono animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Shortcut */}
          <button
            onClick={() => handleNavClick('profile')}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              currentPage === 'profile'
                ? 'bg-[#c99b45] text-[#0b0907] border-[#c99b45]'
                : 'bg-[#17110c] border-[#2e2216] text-[#b3a18d] hover:text-[#f4efe8] hover:border-[#c99b45]/50'
            }`}
            title="Mening profilim"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-full bg-[#17110c] border border-[#2e2216] text-[#b3a18d] hover:text-[#f4efe8] cursor-pointer"
            title="Menyu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {showSearchInput && (
        <div className="md:hidden px-4 py-3 bg-[#120d09] border-b border-[#291e14]">
          <div className="flex items-center bg-[#1a130c] border border-[#372819] rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-[#8a7966] mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentPage !== 'afisha') onNavigate('afisha');
              }}
              placeholder="Qidiruv: spektakl, konsert, teatr..."
              className="bg-transparent text-sm text-[#f4efe8] placeholder-[#796957] focus:outline-none w-full"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="text-sm text-[#8a7966]">
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e0b08] border-b border-[#291e14] px-4 py-5 shadow-2xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c99b45] to-[#97732a] text-[#0b0907] font-bold'
                      : 'bg-[#15100b] text-[#b3a18d] hover:text-[#f4efe8] border border-[#231a11]'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#0b0907] text-[#e2c17b]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#231a11] flex justify-between items-center text-xs text-[#8a7966]">
            <span>Shahar: {selectedCity}</span>
            <button
              onClick={() => handleNavClick('about')}
              className="text-[#c99b45] hover:underline"
            >
              Aloqa va Ma'lumot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
