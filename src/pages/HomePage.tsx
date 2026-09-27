import React, { useState } from 'react';
import { SahnaEvent, Story, PageId, Theater } from '../types';
import {
  Sparkles,
  Ticket as TicketIcon,
  Calendar,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Users,
  HelpCircle,
  Play,
  Heart,
  Flame,
  ArrowRight
} from 'lucide-react';

interface HomePageProps {
  events: SahnaEvent[];
  stories: Story[];
  theaters: Theater[];
  onSelectEvent: (event: SahnaEvent) => void;
  onSelectSeats: (event: SahnaEvent) => void;
  onOpenStory: (story: Story) => void;
  onNavigate: (page: PageId) => void;
  favorites: string[];
  onToggleFavorite: (event: SahnaEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  stories,
  theaters,
  onSelectEvent,
  onSelectSeats,
  onOpenStory,
  onNavigate,
  favorites,
  onToggleFavorite
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Hammasi');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  const theaterPremieres = events.filter((e) => e.category === 'Teatr' || e.category === 'Opera & Balet');
  const hotConcerts = events.filter((e) => e.category === 'Konsert' || e.category === 'Jazz' || e.category === 'Klassika');

  const daysList = [
    { label: 'Hammasi', value: 'Hammasi' },
    { label: 'Bugun', value: 'Bugun', isHot: true },
    { label: 'Ertaga', value: 'Ertaga' },
    { label: 'DU 21', value: '21 Okt' },
    { label: 'SE 22', value: '22 Okt' },
    { label: 'CH 23', value: '23 Okt' },
    { label: 'PA 24', value: '24 Okt' },
    { label: 'JU 25', value: '25 Okt' },
    { label: 'SH 26', value: '26 Okt' },
    { label: 'YA 27', value: '27 Okt' }
  ];

  const filteredEventsByDay = selectedDay === 'Hammasi'
    ? events
    : events.filter((e) => e.date.includes(selectedDay) || (selectedDay === 'Bugun' && e.date === 'Bugun') || (selectedDay === 'Ertaga' && e.date === 'Ertaga'));

  const faqs = [
    {
      q: "Chiptani qaytarish imkoniyati bormi?",
      a: "Ha, tadbir boshlanishiga kamida 48 soat qolganda siz 'Chiptalarim' sahifasi orqali chiptani bir tugma bilan bekor qilishingiz va pulni 100% to'liq qaytarib olishingiz mumkin."
    },
    {
      q: "Video-murojaatni qanday ko'rish mumkin?",
      a: "Bosh sahifadagi tashkilotchi va artistlarning aylana belgilarini bosing. Siz bevosita rejissyor, dirijyor yoki bosh qahramonning jonli samimiy murojaatini tomosha qila olasiz."
    },
    {
      q: "To'lov usullari qanday?",
      a: "Biz barcha ommabop to'lov tizimlarini (Click, Payme, Uzum Bank) va xalqaro Visa/Mastercard kartalarini qabul qilamiz. Hech qanday yashirin komissiya yo'q."
    },
    {
      q: "Do'stlar bilan guruh xaridi (Split payment) qanday ishlaydi?",
      a: "Zal sxemasidan o'rindiqlarni tanlagach, 'Do'stlarni taklif qilish' havolasini nusxalab ulashing. Har bir do'stingiz o'z o'rindig'i uchun o'zi to'laydi va birga o'tirasiz."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. CINEMATIC VIP HERO SPOTLIGHT */}
      <section className="relative min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden border border-[#2b1f14] bg-[#120c08] shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-4">
        {/* Background Visual */}
        <div className="absolute inset-0">
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0907] via-[#0b0907]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0907] via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl p-6 sm:p-12 lg:p-16 flex flex-col justify-center min-h-[580px] lg:min-h-[640px] space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#9e7619] text-[#0b0907] shadow-lg shadow-[#d4af37]/20">
              Mavsumning Bosh Premyerasi
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md border border-[#4a3623] text-[#f4efe8]">
              {featuredEvent.category} • {featuredEvent.ageLimit}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#4a3623] text-xs text-[#f5d68d]">
              <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-bold">{featuredEvent.rating}</span>
              <span className="text-[#a89886]">({featuredEvent.reviewsCount} sharh)</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide leading-tight drop-shadow-xl">
              {featuredEvent.title}
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-[#f3dfb4] max-w-2xl">
              "{featuredEvent.subtitle}"
            </p>
            <p className="text-xs sm:text-sm text-[#c8b7a5] max-w-xl line-clamp-3 leading-relaxed">
              {featuredEvent.description}
            </p>
          </div>

          {/* Event details chips */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#e6d9cc]">
            <div className="flex items-center gap-2 bg-[#1b130c]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#3b2818]">
              <Calendar className="w-4 h-4 text-[#d4af37]" />
              <span className="font-semibold">{featuredEvent.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1b130c]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#3b2818]">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span className="font-semibold">{featuredEvent.time} ({featuredEvent.duration})</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1b130c]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#3b2818]">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span className="font-semibold">{featuredEvent.venue}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectSeats(featuredEvent)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f0cf7e] to-[#b8860b] text-[#0e0a07] font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#d4af37]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <TicketIcon className="w-4 h-4" />
              <span>Joy tanlash ({featuredEvent.minPrice.toLocaleString()} so'mdan)</span>
            </button>

            <button
              onClick={() => onSelectEvent(featuredEvent)}
              className="px-6 py-4 rounded-2xl bg-[#1b130c]/80 hover:bg-[#2b1f14] backdrop-blur-md border border-[#483420] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Batafsil ma'lumot</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. ARTIST & DIRECTOR STORIES (Live video messages) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#d4af37] animate-ping" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
              Jonli Video-Murojaatlar
            </h3>
          </div>
          <span className="text-xs text-[#9f8e7c]">Artistlar va rejissyorlar samimiy ovozi</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => onOpenStory(story)}
              className="flex flex-col items-center gap-2 text-center group shrink-0 focus:outline-none cursor-pointer"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#d4af37] via-[#f7e0a8] to-[#9b731e] group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full rounded-full overflow-hidden bg-black border-2 border-[#0b0907] relative">
                  <img
                    src={story.avatar}
                    alt={story.organizerName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white opacity-80 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center border-2 border-[#0b0907]">
                  ✓
                </div>
              </div>
              <span className="text-xs font-medium text-[#ded1c1] max-w-[90px] truncate group-hover:text-[#d4af37]">
                {story.organizerName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. QUICK DATE FILTER STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 rounded-2xl bg-[#140e0a] border border-[#2b1f14] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {daysList.map((day) => {
            const isSel = selectedDay === day.value;
            return (
              <button
                key={day.value}
                onClick={() => setSelectedDay(day.value)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSel
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#ab8424] text-[#0b0907] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#1c140e] text-[#a99886] hover:text-white hover:bg-[#281d14]'
                }`}
              >
                {day.isHot && <Flame className="w-3.5 h-3.5 text-[#e06b6b]" />}
                <span>{day.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. TEATR PREMYERALARI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#241a11] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
              Klassika & Zamonaviylik
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
              🎭 Teatrda Eng Qaynoq Premyeralar
            </h2>
          </div>
          <button
            onClick={() => onNavigate('theaters')}
            className="text-xs font-semibold text-[#d4af37] hover:text-[#f7e0a8] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Barcha teatrlarni ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaterPremieres.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="group bg-[#130d08] border border-[#2b1f14] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
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
                      Faqat {event.fewLeftCount} ta qoldi
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(event);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#d4af37] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    {event.date} • {event.time}
                  </span>
                  <span className="text-[11px] font-mono text-[#f7e0a8]">
                    {event.ageLimit}
                  </span>
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
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#baa998]">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#23180f] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#867563] block">Chiptalar narxi</span>
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
      </section>

      {/* 5. HOT CONCERTS & ARENA SHOWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#241a11] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
              Jonli Simfoniya & Arenalar
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
              🔥 Qaynoq Konsertlar va Shoular
            </h2>
          </div>
          <button
            onClick={() => onNavigate('concerts')}
            className="text-xs font-semibold text-[#d4af37] hover:text-[#f7e0a8] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Barcha konsertlarni ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotConcerts.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="group bg-[#130d08] border border-[#2b1f14] hover:border-[#d4af37]/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
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
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(event);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#d4af37] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    {event.date} • {event.time}
                  </span>
                  <span className="text-[11px] font-mono text-[#f7e0a8]">
                    {event.venue.split(',')[0]}
                  </span>
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
                </div>

                <div className="pt-4 border-t border-[#23180f] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#867563] block">Chiptalar narxi</span>
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
      </section>

      {/* 6. NEGA AYNAN SAHNA? (Value Props) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#160f0a] to-[#0d0906] border border-[#2d2015] shadow-2xl space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
              Xizmat Standartlari
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Nega Aynan SAHNA Platformasi?
            </h2>
            <p className="text-xs sm:text-sm text-[#9f8e7c]">
              Biz O'zbekiston madaniy hayotida chipta xaridini yuqori darajadagi qulaylik va xavfsizlik bilan ta'minlaymiz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#1c140d] border border-[#342417] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">100% Haqiqiy QR Chipta</h4>
              <p className="text-xs text-[#8c7b6a] leading-relaxed">
                Har bir chipta noyob kriptografik QR kod bilan himoyalangan va to'g'ridan-to'g'ri kassa tizimiga kiritiladi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c140d] border border-[#342417] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">48 Soatda 100% Qaytarish</h4>
              <p className="text-xs text-[#8c7b6a] leading-relaxed">
                Rejangiz o'zgarganda tadbirga 48 soat qolguncha chiptangizni bir tugma bilan bekor qilib pulingizni qaytarib oling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c140d] border border-[#342417] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Split Payment (Do'stlar)</h4>
              <p className="text-xs text-[#8c7b6a] leading-relaxed">
                Yonma-yon o'rindiqlarni band qiling va havolani do'stlaringizga yuboring — har kim o'z chiptasi uchun to'laydi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c140d] border border-[#342417] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">VIP Concierge & Aloqa</h4>
              <p className="text-xs text-[#8c7b6a] leading-relaxed">
                24/7 operatorlarimiz har qanday savolingizga javob beradi va lojalarni band qilishda shaxsan yordam beradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>Savollaringiz Bormi?</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
            Ko'p So'raladigan Savollar
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#140e0a] border border-[#2b1f14] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#f4efe8] hover:text-[#d4af37] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className={`text-[#d4af37] text-lg font-bold transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#9f8e7c] leading-relaxed border-t border-[#23180f] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
