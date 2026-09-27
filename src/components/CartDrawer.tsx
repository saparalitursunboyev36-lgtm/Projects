import React from 'react';
import { SahnaEvent, Seat } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Ticket as TicketIcon } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartSeats: { event: SahnaEvent; seat: Seat }[];
  onRemoveItem: (seatId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartSeats,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalSum = cartSeats.reduce((acc, item) => acc + item.seat.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130d08] border-l border-[#322316] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#291d13] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#c99b45]/10 text-[#d4af37]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-cinzel">Savatcha</h3>
                <p className="text-xs text-[#8c7c6b]">{cartSeats.length} ta o'rindiq band qilingan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8c7c6b] hover:text-white hover:bg-[#20150d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartSeats.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#1e150e] border border-[#342417] flex items-center justify-center text-[#6e5d4d]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-[#baa998]">Savatchangiz bo'sh</h4>
                <p className="text-xs text-[#7e6d5d] max-w-xs">
                  Repertuardan istalgan spektakl yoki konsertni tanlang va zal sxemasidan o'rindiqlarni band qiling.
                </p>
              </div>
            ) : (
              cartSeats.map(({ event, seat }) => (
                <div
                  key={seat.id}
                  className="p-4 rounded-2xl bg-[#1b130c] border border-[#2f2014] flex items-start justify-between gap-3 relative group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                      {event.category}
                    </span>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{event.title}</h5>
                    <div className="text-[11px] text-[#9a8978] flex items-center gap-1.5">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="pt-1.5 text-xs font-mono text-[#e5d8cb]">
                      <span className="text-[#baa998]">{seat.sector}: </span>
                      <span className="text-[#d4af37] font-bold">Qator {seat.row}, Joy {seat.number}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white pt-0.5">
                      {seat.price.toLocaleString()} so'm
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(seat.id)}
                    className="p-2 rounded-lg text-[#827161] hover:text-[#e06b6b] hover:bg-[#2b1717] transition-colors"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with checkout */}
          {cartSeats.length > 0 && (
            <div className="p-6 border-t border-[#291d13] bg-[#100a06] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#9a8978]">Jami summa:</span>
                <span className="text-lg font-mono font-bold text-[#d4af37]">
                  {totalSum.toLocaleString()} so'm
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e2c17b] to-[#b8860b] text-[#0e0a07] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-[#d4af37]/20 cursor-pointer"
              >
                <span>To'lovga o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
