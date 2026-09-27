import React, { useState } from 'react';
import { Ticket, PageId } from '../types';
import {
  User,
  Phone,
  Mail,
  CreditCard,
  Bell,
  Ticket as TicketIcon,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProfilePageProps {
  tickets: Ticket[];
  onNavigate: (page: PageId) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ tickets, onNavigate }) => {
  const [userName, setUserName] = useState('Saparali Tursunboyev');
  const [userPhone, setUserPhone] = useState('+998 90 123 45 67');
  const [userEmail, setUserEmail] = useState('tursunboyevsaparali@gmail.com');
  const [city, setCity] = useState('Toshkent');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeTicketsCount = tickets.filter((t) => t.status === 'active').length;
  const totalSpent = tickets.reduce((acc, t) => acc + (t.status !== 'cancelled' ? t.price : 0), 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17100b] to-[#110b07] border border-[#3b2a1a] shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#d4af37] via-[#f7e0a8] to-[#97732a]">
            <div className="w-full h-full rounded-full bg-[#0b0907] flex items-center justify-center font-cinzel text-3xl font-bold text-[#d4af37]">
              ST
            </div>
          </div>
          <span className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#d4af37] text-black text-[10px] font-bold shadow-md">
            ★ VIP
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-cinzel text-2xl font-bold text-white">
              {userName}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
              Gold VIP A'zo
            </span>
          </div>
          <p className="text-xs text-[#9f8e7c]">
            {userEmail} • {userPhone}
          </p>

          <div className="pt-3 flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-[#1e150e] border border-[#342417]">
              <span className="text-[#8c7b6a]">Faol chiptalar: </span>
              <strong className="text-[#d4af37]">{activeTicketsCount} ta</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#1e150e] border border-[#342417]">
              <span className="text-[#8c7b6a]">Jami xaridlar: </span>
              <strong className="text-white">{totalSpent.toLocaleString()} so'm</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('my-tickets')}
          className="px-4 py-2.5 rounded-2xl bg-[#d4af37] hover:bg-[#aa801e] text-black font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <TicketIcon className="w-4 h-4" />
          <span>Chiptalarim</span>
        </button>
      </div>

      {/* Profile Details Edit Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#140e0a] border border-[#2b1f14] shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#23180f] pb-4">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-white">
              Shaxsiy Ma'lumotlar
            </h3>
            <p className="text-xs text-[#8c7b6a]">
              SMS-xabarlar va chiptalarni ro'yxatdan o'tkazish uchun ma'lumotlar
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#baa998] mb-1">To'liq ism familiyangiz</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[#baa998] mb-1">Telefon raqam (SMS chiptalar uchun)</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#baa998] mb-1">Elektron pochta</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-[#baa998] mb-1">Asosiy shahar</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c140e] border border-[#322316] text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
              </select>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-[#172b1b] border border-[#55c97b]/40 text-[#55c97b] font-medium">
              ✓ Ma'lumotlar muvaffaqiyatli saqlandi!
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#b8860b] transition-colors cursor-pointer"
            >
              O'zgarishlarni saqlash
            </button>
          </div>
        </form>
      </div>

      {/* Saved Payment Cards & Loyalty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase">
            <CreditCard className="w-4 h-4" />
            <span>Saqlangan To'lov Usullari</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#1c140e] border border-[#342417] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-6 rounded bg-[#2b1f14] border border-[#44311f] flex items-center justify-center font-bold text-[10px] text-[#55c97b]">
                  UZC
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">8600 •••• •••• 9210</div>
                  <div className="text-[10px] text-[#867563]">Asosiy karta (Humo/Uzcard)</div>
                </div>
              </div>
              <span className="text-[10px] text-[#55c97b] font-bold">Faol</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1c140e] border border-[#342417] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-6 rounded bg-[#2b1f14] border border-[#44311f] flex items-center justify-center font-bold text-[10px] text-[#5887ff]">
                  VISA
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">4000 •••• •••• 4129</div>
                  <div className="text-[10px] text-[#867563]">Xalqaro to'lovlar uchun</div>
                </div>
              </div>
              <span className="text-[10px] text-[#867563]">Saqlangan</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase">
            <Bell className="w-4 h-4" />
            <span>Xabarnomalar va Premyerlar</span>
          </div>

          <div className="space-y-3 text-xs text-[#baa998]">
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#1c140e] border border-[#342417] cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
              <span>Yangi premyeralar va afishalar e'loni (SMS / Email)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#1c140e] border border-[#342417] cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
              <span>Tadbir boshlanishiga 24 soat qolganda eslatma</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#1c140e] border border-[#342417] cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
              <span>Maxsus chegirmalar va VIP taklifnomalar</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
