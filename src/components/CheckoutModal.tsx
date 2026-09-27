import React, { useState } from 'react';
import { SahnaEvent, Seat, Ticket } from '../types';
import { X, ShieldCheck, Ticket as TicketIcon, CheckCircle2, ArrowRight, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: SahnaEvent;
  selectedSeats: Seat[];
  onPaymentSuccess: (newTickets: Ticket[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedSeats,
  onPaymentSuccess
}) => {
  const [buyerName, setBuyerName] = useState('Saparali Tursunboyev');
  const [buyerPhone, setBuyerPhone] = useState('+998 90 123 45 67');
  const [buyerEmail, setBuyerEmail] = useState('tursunboyevsaparali@gmail.com');
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'uzum' | 'card'>('payme');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const rawTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'SAHNA10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (code === 'PREMYERA' || code === 'VIP') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      setPromoError('Ushbu promokod mavjud emas yoki muddati o\'tgan.');
    }
  };

  const handlePay = () => {
    if (!buyerName || !buyerPhone) {
      alert('Iltimos, ism va telefon raqamingizni kiriting!');
      return;
    }

    setIsProcessing(true);

    // Simulate secure payment gateway transaction
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      // Generate actual tickets for each selected seat
      const createdTickets: Ticket[] = selectedSeats.map((seat, idx) => {
        const randNum = Math.floor(100000 + Math.random() * 900000);
        const ticketNumber = `SHN-2024-${randNum}`;
        return {
          id: `tkt-${Date.now()}-${idx}`,
          ticketNumber,
          eventId: event.id,
          eventTitle: event.title,
          eventCategory: event.category,
          venue: event.venue,
          date: `${event.date}, 2024`,
          time: event.time,
          sector: seat.sector,
          row: seat.row,
          seat: seat.number,
          price: seat.price,
          buyerName,
          buyerPhone,
          purchaseDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'active',
          qrCodeValue: `SAHNA_TKT_${ticketNumber}_VALID_ROW${seat.row}_SEAT${seat.number}`
        };
      });

      setTimeout(() => {
        onPaymentSuccess(createdTickets);
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#140e0a] border border-[#3b2a1a] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        {!isProcessing && !isDone && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#201710] text-[#a49381] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isDone ? (
          /* Payment Success view */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] mx-auto flex items-center justify-center text-[#d4af37] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              To'lov Muvaffaqiyatli Amalga Oshirildi!
            </h3>
            <p className="text-sm text-[#baa998] max-w-sm mx-auto">
              Chiptalaringiz tayyorlandi va shaxsiy kabinetingizga saqlandi. SMS orqali tasdiq yuborildi.
            </p>
            <div className="p-4 rounded-2xl bg-[#1d150e] border border-[#392818] text-left text-xs space-y-1.5 font-mono text-[#d6c7b7]">
              <div>Tadbir: <span className="text-white font-bold">{event.title}</span></div>
              <div>O'rindiqlar: <span className="text-[#d4af37] font-bold">{selectedSeats.length} ta chipta</span></div>
              <div>Jami summa: <span className="text-white font-bold">{finalTotal.toLocaleString()} so'm</span></div>
            </div>
            <div className="text-xs text-[#d4af37] flex items-center justify-center gap-1.5 font-medium pt-2">
              <span>"Chiptalarim" sahifasiga yo'naltirilmoqda...</span>
            </div>
          </div>
        ) : (
          /* Order & payment details view */
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                <TicketIcon className="w-4 h-4" />
                <span>Buyurtmani rasmiylashtirish</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                {event.title}
              </h3>
              <p className="text-xs text-[#9f8e7c] mt-0.5">
                {event.venue} • {event.date}, soat {event.time}
              </p>
            </div>

            {/* Selected seats list */}
            <div className="p-3.5 rounded-2xl bg-[#1d150e] border border-[#342417] space-y-2">
              <div className="text-xs font-semibold text-[#baa998] flex justify-between">
                <span>Tanlangan o'rindiqlar ({selectedSeats.length}):</span>
                <span className="text-[#d4af37]">Har biri uchun rasmiy QR beriladi</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#271d13] border border-[#44311f] text-xs font-mono text-[#f4efe8]"
                  >
                    <span>{seat.sector}</span>
                    <span className="text-[#d4af37]">Qator {seat.row}, Joy {seat.number}</span>
                    <span className="text-[10px] text-[#8e7e6e]">({seat.price.toLocaleString()} so'm)</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Buyer Contact Form */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
                Xaridor Ma'lumotlari
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#806f5f] block mb-1">To'liq ismingiz</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="Ism Familiya"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#806f5f] block mb-1">Telefon raqam (SMS chipta uchun)</label>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
                Promokod yoki Vauchyer
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#8a7966] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Masalan: SAHNA10 yoki PREMYERA"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1b140e] border border-[#342417] text-xs text-white uppercase focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-[#261c13] hover:bg-[#34261a] border border-[#44311f] text-xs font-bold text-[#d4af37] transition-colors cursor-pointer"
                >
                  Qo'llash
                </button>
              </div>
              {promoApplied && (
                <div className="text-[11px] text-[#55c97b] font-medium">
                  ✓ Promokod tasdiqlandi: {discountPercent}% chegirma qo'llanildi!
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-[#e06b6b]">{promoError}</div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9f8e7c]">
                To'lov Tizimini Tanlang
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'payme', label: 'Payme', badge: '0% komissiya' },
                  { id: 'click', label: 'Click', badge: '0% komissiya' },
                  { id: 'uzum', label: 'Uzum Bank', badge: 'Keshbek' },
                  { id: 'card', label: 'Humo / Uzcard', badge: 'Tezkor' }
                ].map((m) => {
                  const isSel = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#2b1f13] border-[#d4af37] shadow-md shadow-[#d4af37]/10'
                          : 'bg-[#1b140e] border-[#312316] hover:border-[#44311f]'
                      }`}
                    >
                      <div className={`text-xs font-bold ${isSel ? 'text-[#d4af37]' : 'text-white'}`}>
                        {m.label}
                      </div>
                      <div className="text-[9px] text-[#8a7966] mt-0.5">{m.badge}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="pt-3 border-t border-[#2d1f14] space-y-1.5 text-xs text-[#a99886]">
              <div className="flex justify-between">
                <span>Chiptalar narxi ({selectedSeats.length} ta):</span>
                <span>{rawTotal.toLocaleString()} so'm</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#55c97b]">
                  <span>Chegirma ({discountPercent}%):</span>
                  <span>-{discountAmount.toLocaleString()} so'm</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#2d1f14]">
                <span>Yakuniy to'lov:</span>
                <span className="font-mono text-base text-[#d4af37]">
                  {finalTotal.toLocaleString()} so'm
                </span>
              </div>
            </div>

            {/* Security note & submit button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-[#7d6e5e]">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>256-bit shifrlangan xavfsiz to'lov va rasmiy elektron chek taqdim etiladi.</span>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e2c17b] to-[#b8860b] text-[#0e0a07] font-bold text-sm tracking-wide shadow-xl shadow-[#d4af37]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>To'lov o'tkazilmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>{finalTotal.toLocaleString()} so'm to'lash</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
