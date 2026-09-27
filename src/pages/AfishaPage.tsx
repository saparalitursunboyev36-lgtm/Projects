import React, { useState, useMemo } from 'react';
import { SahnaEvent, EventCategory } from '../types';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Star,
  Heart,
  Ticket as TicketIcon,
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface AfishaPageProps {
  events: SahnaEvent[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectEvent: (event: SahnaEvent) => void;
  onSelectSeats: (event: SahnaEvent) => void;
  favorites: string[];
  onToggleFavorite: (event: SahnaEvent) => void;
  initialCategory?: string;
}

export const AfishaPage: React.FC<AfishaPageProps> = ({
  events,
  searchQuery,
  onSearchChange,
  onSelectEvent,
  onSelectSeats,
  favorites,
  onToggleFavorite,
  initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Hammasi');
  const [selectedCity, setSelectedCity] = useState<string>('Barchasi');
  const [selectedStatus, setSelectedStatus] = useState<string>('Barchasi');
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'date'>('rating');
  const [maxPrice, setMaxPrice] = useState<number>(800000);

  const categories: string[] = [
    'Hammasi',
    'Teatr',
    'Konsert',
    'Opera & Balet',
    'Klassika',
    'Jazz',
    'Stand Up',
    'Ko\'rgazma'
  ];

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchDesc = event.description.toLowerCase().includes(q);
          const matchVenue = event.venue.toLowerCase().includes(q);
          const matchCategory = event.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchVenue && !matchCategory) return false;
        }

        // Category
        if (selectedCategory !== 'Hammasi' && event.category !== selectedCategory) {
          return false;
        }

        // City
        if (selectedCity !== 'Barchasi' && event.city !== selectedCity) {
          return false;
        }

        // Status / Timing
        if (selectedStatus === 'Bugun' && event.date !== 'Bugun') return false;
        if (selectedStatus === 'Ertaga' && event.date !== 'Ertaga') return false;
        if (selectedStatus === 'few_left' && event.status !== 'few_left') return false;

        // Max price
        if (event.minPrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_asc') return a.minPrice - b.minPrice;
        if (sortBy === 'price_desc') return b.minPrice - a.minPrice;
        return a.rawDate.localeCompare(b.rawDate);
      });
  }, [events, searchQuery, selectedCategory, selectedCity, selectedStatus, sortBy, maxPrice]);

  const handleResetFilters = () => {
    onSearchChange('');
    setSelectedCategory('Hammasi');
    setSelectedCity('Barchasi');
    setSelectedStatus('Barchasi');
    setSortBy('rating');
    setMaxPrice(800000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>To'liq Repertuar & Chiptalar</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
          Afisha: Barcha Teatr va Konsertlar
        </h1>
        <p className="text-xs sm:text-sm text-[#9f8e7c] max-w-2xl">
          Toshkent, Samarqand va Buxoro shaharlarining eng yorqin premyeralari, simfonik oqshomlari va xalqaro festivallariga rasmiy chiptalar.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-5 shadow-xl">
        {/* Top search & Sort controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8a7866] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Qidiruv: spektakl nomi, ijrochi, teatr yoki konsert zali..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#1c140e] border border-[#342417] text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-3 text-xs text-[#8a7866] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2 bg-[#1c140e] border border-[#342417] rounded-2xl px-3 py-2 text-xs text-[#a99886]">
              <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="rating" className="bg-[#1c140e]">Reyting bo'yicha</option>
                <option value="price_asc" className="bg-[#1c140e]">Narx: avval arzonlari</option>
                <option value="price_desc" className="bg-[#1c140e]">Narx: avval qimmatlari</option>
                <option value="date" className="bg-[#1c140e]">Sana bo'yicha</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#1c140e] border border-[#342417] rounded-2xl px-3 py-2 text-xs text-[#a99886]">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="Barchasi" className="bg-[#1c140e]">Barcha shaharlar</option>
                <option value="Toshkent" className="bg-[#1c140e]">Toshkent</option>
                <option value="Samarqand" className="bg-[#1c140e]">Samarqand</option>
                <option value="Buxoro" className="bg-[#1c140e]">Buxoro</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="p-2.5 rounded-2xl bg-[#1c140e] hover:bg-[#281d14] border border-[#342417] text-[#a99886] hover:text-[#d4af37] transition-colors"
              title="Filtrlarni tozalash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSel
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-[#0b0907] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#1b130d] text-[#b3a18d] hover:text-white hover:bg-[#261b11] border border-[#2e2014]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick status & Price range */}
        <div className="pt-3 border-t border-[#23180f] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#887766]">Vaqt:</span>
            {['Barchasi', 'Bugun', 'Ertaga', 'few_left'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40'
                    : 'text-[#887766] hover:text-white'
                }`}
              >
                {st === 'Barchasi' ? 'Barcha kunlar' : st === 'few_left' ? 'Chiptasi kam qolganlar' : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#887766]">Maks. narx:</span>
            <input
              type="range"
              min="50000"
              max="800000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#d4af37] w-32 cursor-pointer"
            />
            <span className="font-mono font-bold text-white">
              {maxPrice.toLocaleString()} so'm
            </span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#9f8e7c]">
        <span>Jami topilgan tadbirlar: <strong className="text-white">{filteredEvents.length} ta</strong></span>
        {filteredEvents.length > 0 && (
          <span>Karta orqali 0% komissiyali to'lov</span>
        )}
      </div>

      {/* Grid of Events */}
      {filteredEvents.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1f1610] text-[#6b5a4a] mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white">
            Mos keluvchi tadbir topilmadi
          </h3>
          <p className="text-xs text-[#907f6e] max-w-sm mx-auto">
            Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring. Barcha tadbirlarni ko'rish uchun filtrlarni tiklang.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#261b12] hover:bg-[#d4af37] hover:text-black text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-[#130d08] border border-[#2b1f14] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130d08] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37] text-black">
                    {event.category}
                  </span>
                  {event.status === 'few_left' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#c53939] text-white">
                      {event.fewLeftCount} ta qoldi
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(event);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{event.date} • {event.time}</span>
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[#f7d88c]">
                    <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                    <span className="font-bold text-[11px]">{event.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectEvent(event)}
                    className="font-cinzel text-lg font-bold text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
                  >
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#9a8978] mt-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#baa998]">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#23180f] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#867563] block">Chipta narxi</span>
                    <span className="text-sm font-mono font-bold text-white">
                      {event.minPrice.toLocaleString()} so'mdan
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectEvent(event)}
                      className="p-2 rounded-xl bg-[#20160e] hover:bg-[#2c1f15] text-[#b3a18d] hover:text-white transition-colors cursor-pointer"
                      title="Batafsil"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectSeats(event)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-[#0e0a07] font-bold text-xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#d4af37]/20 cursor-pointer"
                    >
                      <TicketIcon className="w-3.5 h-3.5" />
                      <span>Joy tanlash</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
