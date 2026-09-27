import React, { useState } from 'react';
import { SahnaEvent, PageId } from '../types';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Ticket as TicketIcon,
  PlusCircle,
  Download,
  QrCode,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface OrganizerPageProps {
  events: SahnaEvent[];
  onAddNewEvent: (newEvent: SahnaEvent) => void;
  onNavigateToScanner: () => void;
}

export const OrganizerPage: React.FC<OrganizerPageProps> = ({
  events,
  onAddNewEvent,
  onNavigateToScanner
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventSubtitle, setNewEventSubtitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'Teatr' | 'Konsert' | 'Opera & Balet' | 'Klassika' | 'Jazz' | 'Stand Up'>('Teatr');
  const [newEventVenue, setNewEventVenue] = useState('O\'zbek Milliy Akademik Drama Teatri');
  const [newEventDate, setNewEventDate] = useState('18 Noyabr');
  const [newEventTime, setNewEventTime] = useState('19:00');
  const [newEventMinPrice, setNewEventMinPrice] = useState(100000);
  const [newEventMaxPrice, setNewEventMaxPrice] = useState(350000);
  const [newEventImage, setNewEventImage] = useState('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80');
  const [newEventDesc, setNewEventDesc] = useState('');

  // Payout Form State
  const [payoutCard, setPayoutCard] = useState('8600 49** **** 1204 (Aloqabank)');
  const [payoutAmount, setPayoutAmount] = useState('50000000');

  const totalSalesSum = 248500000;
  const totalTicketsSold = 1420;
  const avgOccupancy = 88;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDesc) {
      alert('Iltimos, sarlavha va tavsifni to\'liq kiriting!');
      return;
    }

    const created: SahnaEvent = {
      id: `custom-event-${Date.now()}`,
      title: newEventTitle,
      subtitle: newEventSubtitle || "Eksklyuziv yangi namoyish",
      category: newEventCategory,
      date: newEventDate,
      rawDate: '2024-11-18',
      dayOfWeek: 'Dushanba',
      time: newEventTime,
      duration: '2 soat',
      language: 'O\'zbek',
      ageLimit: '6+',
      venue: newEventVenue,
      city: 'Toshkent',
      minPrice: Number(newEventMinPrice),
      maxPrice: Number(newEventMaxPrice),
      image: newEventImage,
      description: newEventDesc,
      organizer: events[0].organizer,
      status: 'available',
      rating: 5.0,
      reviewsCount: 1,
      seatingTiers: {
        vip: { price: Number(newEventMaxPrice), desc: "VIP Parter" },
        premium: { price: Math.round((Number(newEventMinPrice) + Number(newEventMaxPrice)) / 2), desc: "Parter" },
        standart: { price: Number(newEventMinPrice), desc: "Balkon" }
      }
    };

    onAddNewEvent(created);
    setShowAddModal(false);
    alert('Yangi tadbir muvaffaqiyatli tasdiqlandi va umumiy Afishaga joylashtirildi!');
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowPayoutModal(false);
      alert('Pul mablag\'larini hisob raqamga o\'tkazish so\'rovi qabul qilindi.');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Tashkilotchi & Prodyuserlik Boshqaruvi</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Hamkorlik Portali & Statistika
          </h1>
          <p className="text-xs sm:text-sm text-[#9f8e7c]">
            O'zbekiston Davlat Teatrlari va Konsert Saroylari rasmiy kassa boshqaruvi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToScanner}
            className="px-4 py-2.5 rounded-2xl bg-[#1e150e] hover:bg-[#2c1f14] border border-[#3b2a1a] text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#d4af37]" />
            <span>QR Skanerni ochish</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Yangi tadbir qo'shish</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8c7b6a]">
            <span>Jami sotuv tushumi</span>
            <DollarSign className="w-4 h-4 text-[#55c97b]" />
          </div>
          <div className="font-mono text-2xl font-bold text-white">
            {totalSalesSum.toLocaleString()} <span className="text-xs text-[#d4af37]">so'm</span>
          </div>
          <span className="text-[11px] text-[#55c97b] font-medium block">
            ↑ O'tgan oyga nisbatan +18.4%
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8c7b6a]">
            <span>Sotilgan chiptalar</span>
            <TicketIcon className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="font-mono text-2xl font-bold text-white">
            {totalTicketsSold.toLocaleString()} <span className="text-xs text-[#8c7b6a]">dona</span>
          </div>
          <span className="text-[11px] text-[#baa998] block">
            Jami 12 ta faol premyera bo'yicha
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8c7b6a]">
            <span>Zal to'ldirilishi</span>
            <TrendingUp className="w-4 h-4 text-[#5887ff]" />
          </div>
          <div className="font-mono text-2xl font-bold text-white">
            {avgOccupancy}%
          </div>
          <span className="text-[11px] text-[#55c97b] block">
            Premyeralar deyarli to'liq band
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8c7b6a]">
            <span>Mavjud balans</span>
            <BarChart3 className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="font-mono text-xl font-bold text-[#d4af37]">
            195,400,000 so'm
          </div>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="w-full py-1.5 rounded-xl bg-[#23180f] hover:bg-[#342417] text-xs font-semibold text-white border border-[#3e2b1d] transition-colors cursor-pointer"
          >
            Pul yechish (Payout)
          </button>
        </div>
      </div>

      {/* Managed Events Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#140e0a] border border-[#2b1f14] shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-white">
              Boshqarilayotgan Spektakl va Konsertlar
            </h3>
            <p className="text-xs text-[#8c7b6a]">
              Chiptalar sotuvi jarayoni va zallarning to'lish holati
            </p>
          </div>
          <span className="text-xs font-mono text-[#d4af37] bg-[#22170e] px-3 py-1.5 rounded-xl border border-[#342417]">
            Jami: {events.length} ta
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#23180f] text-[#867564] uppercase font-mono text-[10px]">
                <th className="py-3 px-2">Tadbir Nomi</th>
                <th className="py-3 px-2">Kategoriya</th>
                <th className="py-3 px-2">Sana & Vaqt</th>
                <th className="py-3 px-2">Zal / Maydon</th>
                <th className="py-3 px-2">Narx diapazoni</th>
                <th className="py-3 px-2">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f150e]">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-[#1a120c] transition-colors">
                  <td className="py-4 px-2 font-semibold text-white flex items-center gap-3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#302115]"
                    />
                    <div className="min-w-0">
                      <div className="truncate max-w-xs">{event.title}</div>
                      <div className="text-[10px] text-[#786757] font-normal">{event.subtitle}</div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#241910] text-[#d4af37] font-semibold text-[10px]">
                      {event.category}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-[#baa998] font-mono whitespace-nowrap">
                    {event.date} • {event.time}
                  </td>
                  <td className="py-4 px-2 text-[#9a8978] truncate max-w-[180px]">
                    {event.venue.split(',')[0]}
                  </td>
                  <td className="py-4 px-2 font-mono text-[#d4af37]">
                    {event.minPrice.toLocaleString()} - {event.maxPrice.toLocaleString()} so'm
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      event.status === 'few_left'
                        ? 'bg-[#c53939]/20 text-[#e06b6b]'
                        : 'bg-[#55c97b]/20 text-[#55c97b]'
                    }`}>
                      {event.status === 'few_left' ? 'Chipta oz qoldi' : 'Sotuvda'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#140e0a] border border-[#3b2a1a] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#20160e] text-[#a99886] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-semibold text-[#d4af37] uppercase">Kassa Direksiyasi</div>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">
                Yangi Premyera / Konsert Qo'shish
              </h3>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#baa998] mb-1">Tadbir Nomi *</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="Masalan: 'Navoiy: Farhod va Shirin' yangi premyera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[#baa998] mb-1">Izoh / Subtitle</label>
                <input
                  type="text"
                  value={newEventSubtitle}
                  onChange={(e) => setNewEventSubtitle(e.target.value)}
                  placeholder="Masalan: Milliy Akademik Teatri sahna asari"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#baa998] mb-1">Kategoriya</label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Teatr">Teatr</option>
                    <option value="Konsert">Konsert</option>
                    <option value="Opera & Balet">Opera & Balet</option>
                    <option value="Klassika">Klassika</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Stand Up">Stand Up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#baa998] mb-1">Teatr / Konsert Zali</label>
                  <input
                    type="text"
                    required
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[#baa998] mb-1">Sana</label>
                  <input
                    type="text"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="18 Noyabr"
                    className="w-full px-3 py-2 rounded-xl bg-[#1c140e] border border-[#322316] text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#baa998] mb-1">Vaqti</label>
                  <input
                    type="text"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="19:00"
                    className="w-full px-3 py-2 rounded-xl bg-[#1c140e] border border-[#322316] text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#baa998] mb-1">Min. narx (so'm)</label>
                  <input
                    type="number"
                    required
                    value={newEventMinPrice}
                    onChange={(e) => setNewEventMinPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1c140e] border border-[#322316] text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#baa998] mb-1">Max. narx (so'm)</label>
                  <input
                    type="number"
                    required
                    value={newEventMaxPrice}
                    onChange={(e) => setNewEventMaxPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1c140e] border border-[#322316] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#baa998] mb-1">Poster rasm havolasi (URL)</label>
                <input
                  type="url"
                  value={newEventImage}
                  onChange={(e) => setNewEventImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[#baa998] mb-1">Batafsil tavsif va syujet *</label>
                <textarea
                  rows={3}
                  required
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Spektakl syujeti, bosh qahramonlar va dramaturgiya haqida..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#22170f] text-xs font-semibold text-[#baa998]"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#b8860b] transition-colors"
                >
                  Tadbirni tasdiqlash va e'lon qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#140e0a] border border-[#3b2a1a] rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel text-lg font-bold text-white">
                Mablag'ni Yechish (Payout)
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-[#8c7b6a] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8c7b6a] mb-1">Bank hisob raqami / Karta</label>
                <input
                  type="text"
                  required
                  value={payoutCard}
                  onChange={(e) => setPayoutCard(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8c7b6a] mb-1">Yechiladigan summa (so'm)</label>
                <input
                  type="number"
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white font-mono text-sm"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#1e150e] border border-[#342417] text-[11px] text-[#baa998]">
                ✓ Mablag' O'zbekiston banklarining tranzit hisob raqamiga 1-3 ish soati ichida to'liq o'tkaziladi.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#22170f] text-xs font-semibold text-[#baa998]"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={payoutSuccess}
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#b8860b] transition-colors"
                >
                  {payoutSuccess ? 'Tasdiqlanmoqda...' : 'O\'tkazmani tasdiqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
