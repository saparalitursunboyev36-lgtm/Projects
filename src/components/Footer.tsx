import React from 'react';
import { PageId } from '../types';
import { Phone, Mail, MapPin, ShieldCheck, Clock, CreditCard, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#080605] border-t border-[#231a11] text-[#9a8977] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#1c150e] mb-12">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0f0b08] border border-[#211810]">
            <div className="p-3 rounded-xl bg-[#c99b45]/10 text-[#d4af37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f4efe8]">100% Rasmiy Chiptalar</h4>
              <p className="text-xs text-[#827160] mt-1">O'zbekiston Madaniyat vazirligi va teatrlar bilan to'g'ridan-to'g'ri integratsiya.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0f0b08] border border-[#211810]">
            <div className="p-3 rounded-xl bg-[#c99b45]/10 text-[#d4af37]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f4efe8]">Kafolatlangan Qaytarish</h4>
              <p className="text-xs text-[#827160] mt-1">Tadbirga 48 soat qolgunga qadar 100% mablag'ni shaxsiy kabinet orqali qaytarib oling.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0f0b08] border border-[#211810]">
            <div className="p-3 rounded-xl bg-[#c99b45]/10 text-[#d4af37]">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#f4efe8]">Qulay To'lovlar</h4>
              <p className="text-xs text-[#827160] mt-1">Click, Payme, Uzum Bank va xalqaro Visa/Mastercard orqali komissiyasiz to'lang.</p>
            </div>
          </div>
        </div>

        {/* Main link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c99b45] to-[#6d4d16] flex items-center justify-center p-[2px]">
                <div className="w-full h-full bg-[#0b0907] rounded-[6px] flex items-center justify-center font-cinzel text-sm font-bold text-[#c99b45]">
                  S
                </div>
              </div>
              <span className="font-cinzel text-xl font-bold tracking-widest text-[#f4efe8]">
                SAHNA
              </span>
            </div>
            <p className="text-xs text-[#827160] leading-relaxed">
              O'zbekistondagi nufuzli teatrlar, simfonik konsertlar va katta arena shoulariga eksklyuziv chiptalar platformasi.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#211911] text-[#d4af37] border border-[#3b2a1a]">
                <Sparkles className="w-3 h-3" />
                V2.5 Yangilangan Platforma
              </span>
            </div>
          </div>

          {/* Sahifalar */}
          <div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-[#f4efe8] mb-4">
              Asosiy Bo'limlar
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('afisha')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Afisha & Repertuar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('theaters')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Teatrlar zali
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('concerts')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Konsertlar & Arenalar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-tickets')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Mening Chiptalarim (Elektron QR)
                </button>
              </li>
            </ul>
          </div>

          {/* Tashkilotchilar uchun */}
          <div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-[#f4efe8] mb-4">
              Tashkilotchilarga
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('organizer')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Hamkorlik portali (B2B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('organizer')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Tadbir qo'shish & Kassa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scanner')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  QR Chipta Nazorati (Skaner)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Teatr va san'at saroylari shartnomalari
                </button>
              </li>
            </ul>
          </div>

          {/* Bog'lanish */}
          <div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-[#f4efe8] mb-4">
              Bog'lanish & Kassalar
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Toshkent sh., Amir Temur shox ko'chasi, 107-uy (Bosh kassa)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+998712000055" className="hover:text-[#f4efe8]">
                  +998 (71) 200-00-55
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:support@sahna.uz" className="hover:text-[#f4efe8]">
                  support@sahna.uz
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs text-[#d4af37] hover:underline"
                >
                  Barcha savol-javoblar (FAQ) →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-[#1a130d] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#6b5d4e]">
          <div>
            © {new Date().getFullYear()} SAHNA TICKETS LLC. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#8a7764] cursor-pointer">Maxfiylik siyosati</span>
            <span>•</span>
            <span className="hover:text-[#8a7764] cursor-pointer">Ommaviy oferta</span>
            <span>•</span>
            <span className="hover:text-[#8a7764] cursor-pointer">Xavfsiz to'lov shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
