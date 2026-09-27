import React from 'react';
import { SahnaEvent } from '../types';
import { X, Heart, ArrowRight, Ticket as TicketIcon } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: SahnaEvent[];
  onRemoveFavorite: (eventId: string) => void;
  onBookEvent: (eventId: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onBookEvent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130d08] border-l border-[#322316] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#291d13] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#c99b45]/10 text-[#d4af37]">
                <Heart className="w-5 h-5 fill-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-cinzel">Sevimlilar</h3>
                <p className="text-xs text-[#8c7c6b]">{favorites.length} ta saqlangan tadbir</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8c7c6b] hover:text-white hover:bg-[#20150d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#1e150e] border border-[#342417] flex items-center justify-center text-[#6e5d4d]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-[#baa998]">Hozircha sevimlilar yo'q</h4>
                <p className="text-xs text-[#7e6d5d] max-w-xs">
                  Sizga yoqqan spektakl va konsertlarni yurakcha tugmasi orqali shu yerga saqlab qo'yishingiz mumkin.
                </p>
              </div>
            ) : (
              favorites.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-2xl bg-[#1b130c] border border-[#2f2014] flex flex-col gap-3 relative group"
                >
                  <div className="flex gap-3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-20 rounded-xl object-cover border border-[#352518]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-[#d4af37] uppercase">
                          {event.category}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(event.id)}
                          className="text-[#7e6d5d] hover:text-[#e06b6b]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h5 className="text-xs font-bold text-white line-clamp-2 mt-0.5">{event.title}</h5>
                      <p className="text-[11px] text-[#907f6e] mt-1">{event.venue}</p>
                      <p className="text-[11px] font-mono font-bold text-[#d4af37] mt-1">
                        {event.minPrice.toLocaleString()} so'mdan
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onBookEvent(event.id);
                    }}
                    className="w-full py-2 rounded-xl bg-[#261b11] hover:bg-[#d4af37] hover:text-[#0b0907] border border-[#3b2b1d] text-xs font-bold text-[#e5d8cb] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <TicketIcon className="w-3.5 h-3.5" />
                    <span>Joy tanlash</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
