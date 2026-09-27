import React, { useState } from 'react';
import { Ticket } from '../types';
import { QRCodeDisplay, BarcodeDisplay } from '../components/QRCodeDisplay';
import {
  Ticket as TicketIcon,
  Calendar,
  Clock,
  MapPin,
  Printer,
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Download
} from 'lucide-react';

interface MyTicketsPageProps {
  tickets: Ticket[];
  onRefundTicket: (ticketId: string) => void;
  onNavigateToAfisha: () => void;
}

export const MyTicketsPage: React.FC<MyTicketsPageProps> = ({
  tickets,
  onRefundTicket,
  onNavigateToAfisha
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'used' | 'cancelled'>('active');
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState<Ticket | null>(null);
  const [confirmRefundTicketId, setConfirmRefundTicketId] = useState<string | null>(null);

  const filteredTickets = tickets.filter((t) => t.status === activeTab);

  const handlePrint = (ticket: Ticket) => {
    setSelectedTicketForPrint(ticket);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleAddToCalendar = (ticket: Ticket) => {
    const title = encodeURIComponent(ticket.eventTitle);
    const details = encodeURIComponent(`SAHNA elektron chiptasi: ${ticket.ticketNumber}. O'rindiq: ${ticket.sector}, Qator ${ticket.row}, Joy ${ticket.seat}`);
    const location = encodeURIComponent(ticket.venue);
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  };

  const handleShare = (ticket: Ticket) => {
    const text = `Men SAHNA platformasida "${ticket.eventTitle}" tadbiriga chipta oldim! Chipta raqami: ${ticket.ticketNumber}`;
    if (navigator.share) {
      navigator.share({ title: ticket.eventTitle, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Chipta ma\'lumotlari nusxalandi!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <TicketIcon className="w-4 h-4" />
            <span>Mening Hamyonim</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Elektron Chiptalarim
          </h1>
          <p className="text-xs sm:text-sm text-[#9f8e7c]">
            Kirishda ushbu QR-kodni nazoratchiga ko'rsating. Qog'oz chipta talab qilinmaydi.
          </p>
        </div>

        <button
          onClick={onNavigateToAfisha}
          className="px-5 py-2.5 rounded-2xl bg-[#1d140e] hover:bg-[#d4af37] hover:text-black border border-[#3b291a] text-xs font-bold text-white transition-colors cursor-pointer self-start sm:self-auto"
        >
          + Yangi chipta olish
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#251b12] pb-3">
        {[
          { id: 'active', label: 'Faol Chiptalar', count: tickets.filter((t) => t.status === 'active').length },
          { id: 'used', label: 'Tashrif Buyurilgan', count: tickets.filter((t) => t.status === 'used').length },
          { id: 'cancelled', label: 'Bekor Qilinganlar', count: tickets.filter((t) => t.status === 'cancelled').length }
        ].map((tab) => {
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                isSel
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-[#9c8b7a] hover:text-white hover:bg-[#1a120c]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSel ? 'bg-black text-[#d4af37]' : 'bg-[#21160d] text-[#867563]'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1e150e] text-[#6b5a4a] mx-auto flex items-center justify-center">
            <TicketIcon className="w-8 h-8" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-white">
            {activeTab === 'active' ? "Faol chiptalar mavjud emas" : "Chiptalar topilmadi"}
          </h3>
          <p className="text-xs text-[#907f6e] max-w-sm mx-auto">
            {activeTab === 'active'
              ? "Repertuardan sevimli spektakl yoki konsertingizni tanlang va qulay o'rindiqlarni band qiling."
              : "Ushbu bo'limda hech qanday chipta mavjud emas."}
          </p>
          {activeTab === 'active' && (
            <button
              onClick={onNavigateToAfisha}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-black font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Afishani ko'rish
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="relative bg-gradient-to-b from-[#18110b] to-[#100a06] border border-[#3b2a1a] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Gold Top Stripe */}
              <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f7e0a8] to-[#9a731c]" />

              {/* Ticket Upper Section */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                      {ticket.eventCategory}
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white mt-2 leading-snug">
                      {ticket.eventTitle}
                    </h3>
                    <p className="text-xs text-[#9a8978] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span>{ticket.venue}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      ticket.status === 'active'
                        ? 'bg-[#55c97b]/15 text-[#55c97b] border border-[#55c97b]/30'
                        : ticket.status === 'used'
                        ? 'bg-[#887766]/20 text-[#baa998]'
                        : 'bg-[#e06b6b]/15 text-[#e06b6b]'
                    }`}>
                      {ticket.status === 'active' ? '● Faol' : ticket.status === 'used' ? 'Tashrif etilgan' : 'Bekor qilingan'}
                    </span>
                    <span className="block font-mono text-[10px] text-[#715f50] mt-1">
                      {ticket.ticketNumber}
                    </span>
                  </div>
                </div>

                {/* Event Schedule Bar */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#1e150e] border border-[#342417] text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <div>
                      <span className="text-[10px] text-[#867563] block">Sana</span>
                      <span className="font-semibold text-white">{ticket.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <div>
                      <span className="text-[10px] text-[#867563] block">Boshlanish vaqti</span>
                      <span className="font-semibold text-white">{ticket.time}</span>
                    </div>
                  </div>
                </div>

                {/* Seating Details */}
                <div className="grid grid-cols-3 gap-2 text-center p-3.5 rounded-2xl bg-[#1e150e] border border-[#342417]">
                  <div>
                    <span className="text-[10px] text-[#867563] block uppercase font-mono">Sektor</span>
                    <span className="font-bold text-xs text-white line-clamp-1">{ticket.sector}</span>
                  </div>
                  <div className="border-x border-[#342417]">
                    <span className="text-[10px] text-[#867563] block uppercase font-mono">Qator</span>
                    <span className="font-bold text-sm text-[#d4af37] font-mono">{ticket.row}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#867563] block uppercase font-mono">O'rindiq</span>
                    <span className="font-bold text-sm text-[#d4af37] font-mono">{ticket.seat}</span>
                  </div>
                </div>
              </div>

              {/* Perforated Divider simulation */}
              <div className="relative flex items-center justify-between px-2">
                <div className="w-5 h-5 rounded-full bg-[#0b0907] -ml-5 border-r border-[#3b2a1a]" />
                <div className="flex-1 border-b-2 border-dashed border-[#342417] mx-2" />
                <div className="w-5 h-5 rounded-full bg-[#0b0907] -mr-5 border-l border-[#3b2a1a]" />
              </div>

              {/* QR and Barcode Verification Area */}
              <div className="p-6 sm:p-7 bg-[#120c08] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
                  <div className="text-xs text-[#8c7b6a]">
                    Xaridor: <strong className="text-white">{ticket.buyerName}</strong>
                  </div>
                  <div className="text-xs text-[#8c7b6a]">
                    To'langan narx: <strong className="font-mono text-[#d4af37]">{ticket.price.toLocaleString()} so'm</strong>
                  </div>
                  <BarcodeDisplay code={ticket.ticketNumber} className="pt-1" />
                </div>

                {/* Scannable SVG QR Code */}
                <div className="text-center space-y-1.5">
                  <QRCodeDisplay value={ticket.qrCodeValue} size={110} />
                  <span className="text-[9px] text-[#8c7b6a] block uppercase tracking-wider font-mono">
                    Rasmiy QR Nazorat
                  </span>
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <div className="px-6 py-4 bg-[#0e0906] border-t border-[#261a10] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePrint(ticket)}
                    className="p-2 rounded-xl bg-[#1c130d] hover:bg-[#2b1f14] text-[#b3a18d] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Chop etish"
                  >
                    <Printer className="w-4 h-4 text-[#d4af37]" />
                    <span>Chop etish</span>
                  </button>

                  <button
                    onClick={() => handleAddToCalendar(ticket)}
                    className="p-2 rounded-xl bg-[#1c130d] hover:bg-[#2b1f14] text-[#b3a18d] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Taqvimga qo'shish"
                  >
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    <span>Taqvim</span>
                  </button>

                  <button
                    onClick={() => handleShare(ticket)}
                    className="p-2 rounded-xl bg-[#1c130d] hover:bg-[#2b1f14] text-[#b3a18d] hover:text-white transition-colors cursor-pointer"
                    title="Ulashish"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {ticket.status === 'active' && (
                  <button
                    onClick={() => setConfirmRefundTicketId(ticket.id)}
                    className="text-xs text-[#8c7b6a] hover:text-[#e06b6b] transition-colors cursor-pointer underline"
                  >
                    Chiptani qaytarish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refund Confirmation Dialog */}
      {confirmRefundTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#140e0a] border border-[#3b2a1a] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#e06b6b]/20 text-[#e06b6b] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-white text-center">
              Chiptani bekor qilmoqchimisiz?
            </h3>
            <p className="text-xs text-[#9f8e7c] text-center leading-relaxed">
              Tadbir boshlanishiga 48 soatdan ortiq vaqt borligi sababli, to'lov 100% to'liq summasida bankingizga 24 soat ichida qaytariladi.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setConfirmRefundTicketId(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#22170f] text-xs font-semibold text-[#baa998] hover:text-white"
              >
                Bekor qilmaslik
              </button>
              <button
                onClick={() => {
                  onRefundTicket(confirmRefundTicketId);
                  setConfirmRefundTicketId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#e06b6b] text-xs font-bold text-white hover:bg-[#c94f4f]"
              >
                Ha, qaytarilsin (100%)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
