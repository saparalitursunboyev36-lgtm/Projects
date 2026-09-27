import React, { useState } from 'react';
import { Theater, SahnaEvent } from '../types';
import {
  Theater as TheaterIcon,
  MapPin,
  Phone,
  Users,
  Calendar,
  Sparkles,
  ChevronRight,
  Ticket as TicketIcon,
  Info,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface TheatersPageProps {
  theaters: Theater[];
  events: SahnaEvent[];
  onSelectEvent: (event: SahnaEvent) => void;
  onSelectSeats: (event: SahnaEvent) => void;
}

export const TheatersPage: React.FC<TheatersPageProps> = ({
  theaters,
  events,
  onSelectEvent,
  onSelectSeats
}) => {
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [filterType, setFilterType] = useState<string>('Barchasi');

  const theaterTypes = [
    'Barchasi',
    'Akademik Drama',
    'Opera va Balet',
    'Avangard & Eksperimental',
    'Musiqali Drama',
    'Yoshlar va Musiqiy Drama'
  ];

  const filteredTheaters = filterType === 'Barchasi'
    ? theaters
    : theaters.filter((t) => t.type.toLowerCase().includes(filterType.toLowerCase()));

  // Get active repertoire events for selected theater
  const getTheaterEvents = (theater: Theater) => {
    return events.filter(
      (e) => theater.repertoireEventIds.includes(e.id) || e.venue.toLowerCase().includes(theater.shortName.toLowerCase())
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c99b45]/10 border border-[#c99b45]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
          <TheaterIcon className="w-4 h-4" />
          <span>Madaniyat va San'at Koshonalari</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          O'zbekistonning Nufuzli Teatrlari
        </h1>
        <p className="text-xs sm:text-sm text-[#9f8e7c] max-w-2xl leading-relaxed">
          Toshkent va viloyatlarning tarixiy, akademik va avangard teatr sahnalari. Ularning repertuarlari, spektakllar taqvimi va qulay o'rindiqlarga chiptalar.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {theaterTypes.map((type) => {
          const isSel = filterType === type;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSel
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-[#0b0907] font-bold shadow-md shadow-[#d4af37]/20'
                  : 'bg-[#150f0b] text-[#b09f8c] hover:text-white hover:bg-[#221810] border border-[#2c1f14]'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Theaters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTheaters.map((theater) => {
          const theaterEvents = getTheaterEvents(theater);
          return (
            <div
              key={theater.id}
              className="group bg-[#140e0a] border border-[#2b1f14] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Theater Photo Header */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={theater.image}
                  alt={theater.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-[#140e0a]/40 to-black/30" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d4af37] text-[#0b0907]">
                    {theater.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md border border-white/10 text-white">
                    Tashkil etilgan: {theater.founded} y.
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {theater.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#d2c3b2] mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      {theater.city}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                      {theater.capacity} o'rindiq
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-[#baa998] leading-relaxed">
                    {theater.description}
                  </p>

                  {/* Highlights pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {theater.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-[#cbbdaf]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact row */}
                  <div className="pt-2 text-xs text-[#8c7b6a] space-y-1.5 border-t border-[#23180f]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{theater.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Kassa: {theater.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Upcoming repertoire for this theater */}
                <div className="space-y-3 pt-3 border-t border-[#251a11]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#f4efe8]">
                    <span className="flex items-center gap-1.5 text-[#d4af37]">
                      <Calendar className="w-3.5 h-3.5" />
                      Yaqin spektakllar repertuari
                    </span>
                    <span className="text-[#8c7b6a]">{theaterEvents.length} ta faol spektakl</span>
                  </div>

                  {theaterEvents.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#1c140e] text-xs text-[#8c7b6a] text-center">
                      Hozirda yangi spektakl jadvali yangilanmoqda. Tez orada e'lon qilinadi.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {theaterEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className="p-3 rounded-2xl bg-[#1a120c] border border-[#2e2014] flex items-center justify-between gap-3 hover:border-[#d4af37]/40 transition-colors"
                        >
                          <div className="min-w-0">
                            <h5
                              onClick={() => onSelectEvent(ev)}
                              className="text-xs font-bold text-white hover:text-[#d4af37] cursor-pointer truncate"
                            >
                              {ev.title}
                            </h5>
                            <p className="text-[11px] text-[#907f6e]">
                              {ev.date} • {ev.time} • <span className="font-mono text-[#d4af37]">{ev.minPrice.toLocaleString()} so'mdan</span>
                            </p>
                          </div>

                          <button
                            onClick={() => onSelectSeats(ev)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#2b1f14] hover:bg-[#d4af37] hover:text-[#0b0907] border border-[#44311f] text-[11px] font-bold text-white transition-all shrink-0 cursor-pointer flex items-center gap-1"
                          >
                            <TicketIcon className="w-3 h-3" />
                            <span>Chipta olish</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => setSelectedTheater(theater)}
                      className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span>Teatr tarixi va zali haqida batafsil</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Theater Detail Modal */}
      {selectedTheater && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#140e0a] border border-[#3d2a1b] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedTheater(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#20160e] text-[#a99886] hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {selectedTheater.type}
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-white">
                {selectedTheater.name}
              </h2>
              <p className="text-xs text-[#8c7b6a]">
                Bosh rejissyor: {selectedTheater.director} • Tashkil etilgan yili: {selectedTheater.founded}
              </p>
            </div>

            <img
              src={selectedTheater.image}
              alt={selectedTheater.name}
              className="w-full h-56 object-cover rounded-2xl border border-[#302115]"
            />

            <div className="space-y-3 text-xs sm:text-sm text-[#baa998] leading-relaxed">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Tarix va Sahna Imkoniyatlari
              </h4>
              <p>{selectedTheater.description}</p>
              <p>
                Ushbu teatr O'zbekistonning eng yuqori unvonlariga sazovor bo'lgan atoqli san'atkorlar va yosh iste'dodlar ansamblini o'z ichiga oladi. Akustik zali {selectedTheater.capacity} nafar tomoshabinga mo'ljallangan bo'lib, har bir qatordan sahna a'lo darajada ko'rinadi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b130c] border border-[#2f2014] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8c7b6a]">Bosh kassa manzili:</span>
                <span className="text-white font-medium">{selectedTheater.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c7b6a]">Ma'lumotlar telefoni:</span>
                <span className="text-[#d4af37] font-mono font-medium">{selectedTheater.phone}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTheater(null)}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#aa801e] transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
