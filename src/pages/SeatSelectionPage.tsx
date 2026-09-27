import React, { useState, useEffect } from 'react';
import { SahnaEvent, Seat } from '../types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Ticket as TicketIcon,
  Share2,
  Sparkles,
  Info
} from 'lucide-react';

interface SeatSelectionPageProps {
  event: SahnaEvent;
  onBack: () => void;
  onProceedToCheckout: (selectedSeats: Seat[]) => void;
}

export const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({
  event,
  onBack,
  onProceedToCheckout
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes hold timer
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);

  // Generate realistic hall seating grid for this event
  useEffect(() => {
    const generated: Seat[] = [];
    const rows = 12;
    const seatsPerRow = 16;

    for (let r = 1; r <= rows; r++) {
      let sector: 'VIP Loja' | 'Parter' | 'Amfiteatr' | 'Balkon' = 'Parter';
      let price = event.seatingTiers.premium.price;

      if (r <= 2) {
        sector = 'VIP Loja';
        price = event.seatingTiers.vip.price;
      } else if (r <= 6) {
        sector = 'Parter';
        price = event.seatingTiers.premium.price;
      } else if (r <= 9) {
        sector = 'Amfiteatr';
        price = Math.round(event.seatingTiers.premium.price * 0.75);
      } else {
        sector = 'Balkon';
        price = event.seatingTiers.standart.price;
      }

      for (let s = 1; s <= seatsPerRow; s++) {
        // Deterministically mark some seats as already sold
        const isSold = (r * 7 + s * 13) % 5 === 0 || (r === 1 && (s === 4 || s === 5 || s === 12));
        generated.push({
          id: `seat-${r}-${s}`,
          sector,
          row: r,
          number: s,
          price,
          status: isSold ? 'sold' : 'available'
        });
      }
    }

    setSeats(generated);
  }, [event]);

  // Hold timer countdown
  useEffect(() => {
    if (selectedSeatIds.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedSeatIds]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'sold') return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 6) {
        alert('Bitta buyurtmada maksimal 6 ta o\'rindiq tanlash mumkin.');
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalSum = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleShareGroup = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar with Back & Event Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#140e0a] border border-[#2d1f14]">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 rounded-2xl bg-[#1e150e] hover:bg-[#2b1f14] border border-[#342417] text-[#a99886] hover:text-white transition-colors cursor-pointer"
            title="Orqaga"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase">
              <span>{event.category}</span>
              <span>•</span>
              <span className="text-[#a99886]">{event.venue}</span>
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-white line-clamp-1">
              {event.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#9f8e7c] mt-0.5">
              <span>{event.date}</span>
              <span>•</span>
              <span>Soat {event.time}</span>
            </div>
          </div>
        </div>

        {selectedSeatIds.length > 0 && (
          <div className="flex items-center gap-2 bg-[#20150e] border border-[#3f2b1c] px-4 py-2 rounded-2xl text-xs font-mono">
            <span className="text-[#a99886]">Bron ushlab turiladi:</span>
            <span className="text-[#d4af37] font-bold">{formatTimer(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Hall & Seat Map Canvas Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0f0a07] border border-[#2b1f14] shadow-2xl space-y-10 overflow-hidden relative">
        {/* Curved Stage Glowing Podium */}
        <div className="max-w-xl mx-auto text-center space-y-2">
          <div className="relative h-12 w-full flex items-center justify-center">
            {/* Stage curve bar */}
            <div className="w-full h-8 rounded-t-full bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/10 to-transparent border-t-2 border-[#d4af37] shadow-[0_-10px_30px_rgba(212,175,55,0.25)] flex items-center justify-center">
              <span className="font-cinzel text-xs font-extrabold tracking-[0.4em] text-[#f7e0a8] uppercase">
                SAHNA / STAGE
              </span>
            </div>
          </div>
          <p className="text-[10px] text-[#705e4d] uppercase tracking-widest font-mono">
            Barcha nigohlar markazi
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#d4af37]" />
            <span className="text-[#baa998]">VIP Loja ({event.seatingTiers.vip.price.toLocaleString()} so'm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#5887ff]" />
            <span className="text-[#baa998]">Parter ({event.seatingTiers.premium.price.toLocaleString()} so'm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#4ecdc4]" />
            <span className="text-[#baa998]">Amfiteatr</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#88d49e]" />
            <span className="text-[#baa998]">Balkon ({event.seatingTiers.standart.price.toLocaleString()} so'm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#2d2116] border border-[#443121]" />
            <span className="text-[#726252]">Band / Sotilgan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-white border-2 border-[#d4af37] ring-2 ring-[#d4af37]" />
            <span className="text-white font-bold">Tanlangan</span>
          </div>
        </div>

        {/* Seat Grid View */}
        <div className="overflow-x-auto pb-6 pt-2 no-scrollbar">
          <div className="min-w-[620px] max-w-2xl mx-auto space-y-2.5">
            {Array.from({ length: 12 }, (_, rIdx) => {
              const rowNum = rIdx + 1;
              const rowSeats = seats.filter((s) => s.row === rowNum);

              return (
                <div key={rowNum} className="flex items-center justify-between gap-3">
                  {/* Left row number */}
                  <span className="w-6 text-right font-mono text-[11px] text-[#7d6c5c]">
                    {rowNum}
                  </span>

                  {/* Seat Nodes */}
                  <div className="flex items-center justify-center gap-1.5 flex-1">
                    {rowSeats.map((seat, sIdx) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      const isSold = seat.status === 'sold';

                      let colorClass = 'bg-[#5887ff] hover:opacity-90';
                      if (seat.sector === 'VIP Loja') colorClass = 'bg-[#d4af37]';
                      if (seat.sector === 'Amfiteatr') colorClass = 'bg-[#4ecdc4]';
                      if (seat.sector === 'Balkon') colorClass = 'bg-[#88d49e]';

                      return (
                        <React.Fragment key={seat.id}>
                          {/* Center aisle gap */}
                          {sIdx === 8 && <div className="w-4" />}

                          <button
                            type="button"
                            disabled={isSold}
                            onClick={() => toggleSeat(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[9px] font-mono flex items-center justify-center transition-all duration-150 cursor-pointer ${
                              isSold
                                ? 'bg-[#22170f] text-[#554435] cursor-not-allowed border border-[#312215]'
                                : isSelected
                                ? 'bg-white text-black font-extrabold ring-2 ring-[#d4af37] shadow-lg scale-110 z-10'
                                : `${colorClass} text-[#0e0a07] font-semibold hover:scale-110 shadow-sm`
                            }`}
                            title={`Qator ${seat.row}, Joy ${seat.number} (${seat.price.toLocaleString()} so'm)`}
                          >
                            {seat.number}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Right row number */}
                  <span className="w-6 text-left font-mono text-[11px] text-[#7d6c5c]">
                    {rowNum}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover details badge */}
        <div className="h-8 flex items-center justify-center text-xs">
          {hoveredSeat ? (
            <div className="px-4 py-1.5 rounded-full bg-[#1b130d] border border-[#3b2a1a] text-[#f4efe8] flex items-center gap-2">
              <span className="text-[#d4af37] font-bold">{hoveredSeat.sector}</span>
              <span>•</span>
              <span>Qator: <strong>{hoveredSeat.row}</strong>, Joy: <strong>{hoveredSeat.number}</strong></span>
              <span>•</span>
              <span className="font-mono text-[#d4af37] font-bold">{hoveredSeat.price.toLocaleString()} so'm</span>
              {hoveredSeat.status === 'sold' && <span className="text-[#e06b6b]">(Band qilingan)</span>}
            </div>
          ) : (
            <span className="text-[#726252] text-xs">
              O'rindiq ustiga olib boring yoki bosing
            </span>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs text-[#a99886] flex items-center gap-2">
            <span>Tanlangan o'rindiqlar:</span>
            <span className="font-bold text-white">{selectedSeats.length} ta</span>
            <span className="text-[#715f50]">(maks. 6 ta)</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {selectedSeats.length === 0 ? (
              <span className="text-xs text-[#715f50] italic">Hech qanday o'rindiq tanlanmadi</span>
            ) : (
              selectedSeats.map((s) => (
                <span
                  key={s.id}
                  className="px-2.5 py-1 rounded-lg bg-[#21160e] border border-[#392617] text-xs font-mono text-[#f4efe8]"
                >
                  Q-{s.row}, J-{s.number} <span className="text-[#d4af37]">({s.price.toLocaleString()} so'm)</span>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between sm:justify-end">
          <button
            type="button"
            onClick={handleShareGroup}
            className="px-4 py-3 rounded-2xl bg-[#1d140d] hover:bg-[#2b1d14] border border-[#362517] text-xs text-[#baa998] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            title="Do'stlarni taklif qilish (Split Payment)"
          >
            <Share2 className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden sm:inline">Do'stlarni taklif qilish</span>
          </button>

          <div>
            <span className="text-[10px] text-[#867563] block">Jami to'lov:</span>
            <span className="text-lg sm:text-xl font-mono font-bold text-[#d4af37]">
              {totalSum.toLocaleString()} so'm
            </span>
          </div>

          <button
            type="button"
            disabled={selectedSeats.length === 0}
            onClick={() => onProceedToCheckout(selectedSeats)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f0cf7e] to-[#b8860b] text-[#0e0a07] font-bold text-sm tracking-wide shadow-xl shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <TicketIcon className="w-4 h-4" />
            <span>Chiptalarni rasmiylashtirish</span>
          </button>
        </div>
      </div>

      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#d4af37] text-black text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <span>✓ Do'stlar uchun havola nusxalandi! Har kim o'z o'rnini to'lashi mumkin.</span>
        </div>
      )}
    </div>
  );
};
