import React, { useState } from 'react';
import { ConcertVenue, SahnaEvent } from '../types';
import {
  Music2,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Ticket as TicketIcon,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Disc
} from 'lucide-react';

interface ConcertsPageProps {
  venues: ConcertVenue[];
  events: SahnaEvent[];
  onSelectEvent: (event: SahnaEvent) => void;
  onSelectSeats: (event: SahnaEvent) => void;
}

export const ConcertsPage: React.FC<ConcertsPageProps> = ({
  venues,
  events,
  onSelectEvent,
  onSelectSeats
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('Hammasi');

  const concertEvents = events.filter(
    (e) => e.category === 'Konsert' || e.category === 'Jazz' || e.category === 'Klassika'
  );

  const genres = ['Hammasi', 'Klassika', 'Jazz', 'Arena Shou', 'Simfoniya'];

  const filteredEvents = selectedGenre === 'Hammasi'
    ? concertEvents
    : concertEvents.filter((e) => {
        if (selectedGenre === 'Arena Shou') return e.venue.includes('Humo') || e.venue.includes('Arena');
        if (selectedGenre === 'Simfoniya') return e.title.toLowerCase().includes('simfoniya');
        return e.category === selectedGenre;
      });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c99b45]/10 border border-[#c99b45]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
          <Music2 className="w-4 h-4" />
          <span>Jonli Ijro & Akustika</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          Konsertlar, Arenalar va Jonli Shoular
        </h1>
        <p className="text-xs sm:text-sm text-[#9f8e7c] max-w-2xl leading-relaxed">
          O'zbekistondagi yirik konsert saroylari va muz arenalarida jahon yulduzlari, davlat simfonik orkestrlari va eksklyuziv multimedia shoulari.
        </p>
      </div>

      {/* Venues Showcase Banner */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
          O'zbekistonning Asosiy Konsert Maydonlari
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="p-4 rounded-3xl bg-[#140e0a] border border-[#2c1f14] hover:border-[#d4af37]/50 transition-colors flex flex-col justify-between space-y-3 group"
            >
              <div className="relative h-32 rounded-2xl overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-[#d4af37]">
                  {venue.capacity.toLocaleString()} o'rindiq
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white line-clamp-1 group-hover:text-[#d4af37] transition-colors">
                  {venue.name}
                </h4>
                <p className="text-[11px] text-[#867563] line-clamp-2 mt-1">
                  {venue.description}
                </p>
              </div>
              <div className="pt-2 border-t border-[#23170e] flex items-center justify-between text-[11px] text-[#a99886]">
                <span>{venue.upcomingEventCount} ta tadbir</span>
                <span className="text-[#d4af37]">Toshkent</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {genres.map((g) => {
          const isSel = selectedGenre === g;
          return (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSel
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-[#0b0907] font-bold shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#150f0b] text-[#b09f8c] hover:text-white hover:bg-[#221810] border border-[#2c1f14]'
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Concerts Grid */}
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
                {event.isUpcomingSoon && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#c53939] text-white flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Bugun / Ertaga
                  </span>
                )}
              </div>

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
                <p className="font-serif italic text-xs text-[#d2c3b2] mt-0.5">
                  "{event.subtitle}"
                </p>
                <p className="text-xs text-[#9a8978] mt-2 line-clamp-2">
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
        ))}
      </div>
    </div>
  );
};
