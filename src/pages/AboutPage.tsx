import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  Building,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMessage) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setSenderName('');
      setSenderPhone('');
      setSenderMessage('');
      alert('Xabaringiz SAHNA operatorlariga muvaffaqiyatli yetkazildi! Tez orada siz bilan bog\'lanamiz.');
    }, 1200);
  };

  const offices = [
    {
      title: "SAHNA Bosh Kassa va Ofisi",
      address: "Toshkent shahri, Amir Temur shox ko'chasi, 107-uy",
      landmark: "Bodomzor metrosi yonida",
      hours: "Dushanba - Yakshanba: 09:00 dan 20:00 gacha",
      phone: "+998 (71) 200-00-55"
    },
    {
      title: "Xalqlar Do'stligi San'at Saroyi Kassasi",
      address: "Toshkent shahri, Furqat ko'chasi, 3-uy",
      landmark: "Xalqlar Do'stligi metro bekati",
      hours: "Har kuni: 10:00 dan 19:30 gacha",
      phone: "+998 (71) 245-02-67"
    },
    {
      title: "Alisher Navoiy Katta Teatri Kassasi",
      address: "Toshkent shahri, Zarafshon ko'chasi, 28-uy",
      landmark: "Favvoralar maydoni",
      hours: "Seshanba - Yakshanba: 10:00 dan 18:30 gacha",
      phone: "+998 (71) 233-90-81"
    },
    {
      title: "Samarqand Shahar Filiali",
      address: "Samarqand shahri, Registon ko'chasi, 14-uy",
      landmark: "Registon ansambli qarshisida",
      hours: "Dushanba - Shanba: 09:30 dan 18:30 gacha",
      phone: "+998 (66) 233-10-20"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c99b45]/10 border border-[#c99b45]/30 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Rasmiy Chiptalar Ekotizimi</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          SAHNA Haqida va Rasmiy Kassalar
        </h1>
        <p className="text-xs sm:text-sm text-[#baa998] leading-relaxed">
          Biz O'zbekiston teatr va musiqiy san'atini zamonaviy raqamli texnologiyalar orqali har bir tomoshabinga yaqinlashtirishni o'z burchimiz deb bilamiz.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-white">Rasmiy Hamkorlik</h3>
          <p className="text-xs text-[#9f8e7c] leading-relaxed">
            Platformadagi barcha chiptalar O'zbekiston Davlat Teatrlari va Konsert Saroylari bilan to'g'ridan-to'g'ri litsenziyalangan shartnomalar asosida taqdim etiladi.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-white">Shahar Bo'ylab Kassalar</h3>
          <p className="text-xs text-[#9f8e7c] leading-relaxed">
            Ilovadan tashqari, Toshkent va Samarqanddagi qulay markaziy kassalarimiz orqali maslahat olishingiz yoki chiptalarni jismoniy shaklda xarid qilishingiz mumkin.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-base font-bold text-white">24/7 Qo'llab-quvvatlash</h3>
          <p className="text-xs text-[#9f8e7c] leading-relaxed">
            Chipta olish, joy tanlash, korporativ buyurtmalar yoki to'lov bilan bog'liq har qanday savolingizga tezkor mutaxassislarimiz yordam beradi.
          </p>
        </div>
      </div>

      {/* Physical Ticket Desks (Kassalar) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#241a11] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
              Manzillar
            </span>
            <h2 className="font-cinzel text-2xl font-bold text-white mt-1">
              Rasmiy Kassa Manzillari
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] space-y-3 hover:border-[#d4af37]/50 transition-colors"
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{office.title}</span>
              </h3>
              <p className="text-xs text-[#baa998]">{office.address}</p>
              <p className="text-[11px] text-[#867563]">Mo'ljal: {office.landmark}</p>

              <div className="pt-2 border-t border-[#23180f] space-y-1.5 text-xs text-[#9f8e7c]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{office.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white font-mono">
                    {office.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Form */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#17100b] to-[#110c08] border border-[#3b2a1a] shadow-2xl space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
            Aloqada Bo'ling
          </span>
          <h2 className="font-cinzel text-2xl font-bold text-white">
            Bizga Xabar Qoldiring
          </h2>
          <p className="text-xs text-[#9f8e7c]">
            Hamkorlik, korporativ chipta buyurtmasi yoki takliflaringiz bo'lsa, quyidagi shaklni to'ldiring.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#baa998] mb-1">Ismingiz *</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Ismingiz"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[#baa998] mb-1">Telefon raqamingiz *</label>
              <input
                type="text"
                required
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#baa998] mb-1">Xabaringiz yoki savolingiz *</label>
            <textarea
              rows={4}
              required
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              placeholder="Qanday masalada yordam kerak?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            disabled={isSent}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-black font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSent ? 'Yuborilmoqda...' : 'Xabarni yuborish'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
