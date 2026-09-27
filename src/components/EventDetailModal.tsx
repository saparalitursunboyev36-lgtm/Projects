import React from 'react';
import { SahnaEvent } from '../types';
import { X, Calendar, Clock, MapPin, ShieldCheck, Ticket as TicketIcon, Heart, Share2, Sparkles, Star } from 'lucide-react';

interface EventDetailModalProps {
  event: SahnaEvent | null;
  onClose: () => void;
  onSelectSeats: (event: SahnaEvent) => void;
  isFavorite: boolean;
  onToggleFavorite: (event: SahnaEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onSelectSeats,
  isFavorite,
  onToggleFavorite
}) => {
  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `SAHNA platformasida "${event.title}" tadbiriga chipta xarid qiling!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Havola nusxalandi!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#140e0a] border border-[#3b2a1a] rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close & Share button */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
            title="Ulashish"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleFavorite(event)}
            className="p-2.5 rounded-full bg-black/60 text-white/80 hover:text-[#d4af37] backdrop-blur-md border border-white/10 transition-colors"
            title="Sevimlilarga qo'shish"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md border border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero image banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-[#140e0a]/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37] text-[#0e0a07] uppercase tracking-wider">
                {event.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/60 text-white border border-white/10">
                {event.ageLimit}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#f7d88c] bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                <span className="font-bold">{event.rating}</span>
                <span className="text-white/60">({event.reviewsCount})</span>
              </div>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white drop-shadow-md">
              {event.title}
            </h2>
            <p className="text-xs text-[#d2c3b2] mt-0.5">{event.subtitle}</p>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6">
          {/* Key metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#1b140e] border border-[#322316] text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <div>
                <span className="text-[10px] text-[#827161] block">Sana</span>
                <span className="font-semibold text-white">{event.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <div>
                <span className="text-[10px] text-[#827161] block">Vaqt & Davomiylik</span>
                <span className="font-semibold text-white">{event.time} ({event.duration})</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:col-span-2">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
              <div>
                <span className="text-[10px] text-[#827161] block">Manzil</span>
                <span className="font-semibold text-white line-clamp-1">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
              Tadbir Haqida
            </h4>
            <p className="text-xs sm:text-sm text-[#c8b9a8] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Program / Highlights if available */}
          {event.program && event.program.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
                Dastur va Pardalar
              </h4>
              <div className="space-y-1.5 bg-[#1b140e] p-3.5 rounded-2xl border border-[#322316]">
                {event.program.map((p, i) => (
                  <div key={i} className="text-xs text-[#baa998] flex items-start gap-2">
                    <span className="text-[#d4af37]">•</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cast / Role performers */}
          {event.cast && event.cast.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
                Bosh Qahramonlar & Ijrochilar
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {event.cast.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#1b140e] border border-[#322316] text-xs">
                    <span className="text-[10px] text-[#8e7e6e] block">{c.role}</span>
                    <span className="font-bold text-white">{c.actor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seating Tiers Guide */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
              Zal Narxlari
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#21170f] border border-[#3b2a1a]">
                <span className="text-[10px] text-[#d4af37] font-bold block uppercase">VIP Zona</span>
                <span className="text-xs text-[#a99887] block">{event.seatingTiers.vip.desc}</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">
                  {event.seatingTiers.vip.price.toLocaleString()} so'm
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#21170f] border border-[#3b2a1a]">
                <span className="text-[10px] text-[#8ec5fc] font-bold block uppercase">Premium</span>
                <span className="text-xs text-[#a99887] block">{event.seatingTiers.premium.desc}</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">
                  {event.seatingTiers.premium.price.toLocaleString()} so'm
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#21170f] border border-[#3b2a1a]">
                <span className="text-[10px] text-[#a8e6cf] font-bold block uppercase">Standart</span>
                <span className="text-xs text-[#a99887] block">{event.seatingTiers.standart.desc}</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">
                  {event.seatingTiers.standart.price.toLocaleString()} so'm
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#291e14]">
            <div>
              <span className="text-[10px] text-[#867564] block">Narx oralig'i:</span>
              <span className="text-sm sm:text-base font-mono font-bold text-[#d4af37]">
                {event.minPrice.toLocaleString()} — {event.maxPrice.toLocaleString()} so'm
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectSeats(event);
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e2c17b] to-[#b8860b] text-[#0e0a07] font-bold text-sm tracking-wide shadow-xl shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <TicketIcon className="w-4 h-4" />
              <span>Joy tanlash & Chipta xaridi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
