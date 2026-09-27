import React, { useState } from 'react';
import { Ticket } from '../types';
import {
  QrCode,
  Scan,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  History,
  RotateCcw,
  Sparkles,
  Ticket as TicketIcon
} from 'lucide-react';

interface ScannerPageProps {
  tickets: Ticket[];
  onMarkTicketUsed: (ticketId: string) => void;
}

interface ScanLog {
  id: string;
  code: string;
  time: string;
  verdict: 'valid' | 'used' | 'invalid';
  eventTitle?: string;
  seatInfo?: string;
}

export const ScannerPage: React.FC<ScannerPageProps> = ({
  tickets,
  onMarkTicketUsed
}) => {
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'valid' | 'used' | 'invalid' | null;
    ticket?: Ticket;
    message?: string;
  }>({ status: null });

  const [logs, setLogs] = useState<ScanLog[]>([
    {
      id: 'log-1',
      code: 'SHN-2024-762900',
      time: '18:24:10',
      verdict: 'used',
      eventTitle: "Abdulla Qodiriy: 'O'tkan kunlar'",
      seatInfo: 'Parter Q-1, J-8'
    }
  ]);

  const handleValidate = (codeToTest: string) => {
    const cleanCode = codeToTest.trim().toUpperCase();
    if (!cleanCode) return;

    const matched = tickets.find(
      (t) => t.ticketNumber.toUpperCase() === cleanCode || t.qrCodeValue.toUpperCase().includes(cleanCode)
    );

    const now = new Date().toLocaleTimeString('uz-UZ');

    if (!matched) {
      setScanResult({
        status: 'invalid',
        message: "Chipta topilmadi yoki soxta! Tizimda bunday seriya raqami mavjud emas."
      });
      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          code: cleanCode,
          time: now,
          verdict: 'invalid'
        },
        ...prev
      ]);
      return;
    }

    if (matched.status === 'used') {
      setScanResult({
        status: 'used',
        ticket: matched,
        message: "Diqqat: Ushbu chipta oldin ishlatilgan! Takroriy kirish taqiqlanadi."
      });
      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          code: cleanCode,
          time: now,
          verdict: 'used',
          eventTitle: matched.eventTitle,
          seatInfo: `${matched.sector}, Q-${matched.row}, J-${matched.seat}`
        },
        ...prev
      ]);
      return;
    }

    if (matched.status === 'cancelled') {
      setScanResult({
        status: 'invalid',
        message: "Diqqat: Ushbu chipta xaridor tomonidan bekor qilingan va puli qaytarilgan!"
      });
      setLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          code: cleanCode,
          time: now,
          verdict: 'invalid',
          eventTitle: matched.eventTitle
        },
        ...prev
      ]);
      return;
    }

    // Valid ticket -> mark used
    onMarkTicketUsed(matched.id);
    setScanResult({
      status: 'valid',
      ticket: matched,
      message: `Chipta haqiqiy! Xush kelibsiz: ${matched.eventTitle}`
    });

    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        code: cleanCode,
        time: now,
        verdict: 'valid',
        eventTitle: matched.eventTitle,
        seatInfo: `${matched.sector}, Q-${matched.row}, J-${matched.seat}`
      },
      ...prev
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
          <QrCode className="w-4 h-4" />
          <span>Nazoratchi & Kassir Xizmati</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
          QR Chipta Nazorati (Skaner)
        </h1>
        <p className="text-xs sm:text-sm text-[#9f8e7c]">
          Kirish joyida tomoshabinlar chiptasini tezkor tekshirish, haqiqiyligini tasdiqlash va soxta chiptalarni aniqlash tizimi.
        </p>
      </div>

      {/* Main Scanner Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scanner Simulation Window */}
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Scan className="w-4 h-4 text-[#d4af37]" />
              <span>Kamera yoki Kod O'qish Maydoni</span>
            </h3>

            {/* Simulated viewfinder */}
            <div className="relative h-60 rounded-2xl bg-[#0b0805] border-2 border-dashed border-[#443120] flex items-center justify-center overflow-hidden">
              <div className="w-44 h-44 rounded-2xl border-2 border-[#d4af37] relative flex items-center justify-center">
                {/* Scanning animated laser bar */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_#d4af37] animate-pulse" />
                <QrCode className="w-20 h-20 text-[#4a3725]" />
              </div>

              <div className="absolute bottom-3 text-[11px] font-mono text-[#8a7764] bg-black/70 px-3 py-1 rounded-full">
                Skaner holati: FAOL (Kutmoqda)
              </div>
            </div>

            {/* Manual Code Input */}
            <div className="space-y-2">
              <label className="text-xs text-[#8c7b6a] block">
                Chipta raqamini kiriting yoki shtrix-kodni o'qing:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Masalan: SHN-2024-918234"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#1b140e] border border-[#342417] text-xs font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleValidate(inputCode);
                    setInputCode('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#b8860b] text-black font-bold text-xs transition-colors cursor-pointer"
                >
                  Tekshirish
                </button>
              </div>
            </div>
          </div>

          {/* Quick test buttons for testing */}
          <div className="pt-4 border-t border-[#23180f] space-y-2">
            <span className="text-[11px] text-[#726252] block font-mono uppercase">
              Tezkor test qilish uchun namuna bosing:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {tickets.slice(0, 2).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleValidate(t.ticketNumber)}
                  className="px-2.5 py-1 rounded-lg bg-[#22170e] hover:bg-[#342417] text-[#baa998] border border-[#362517] font-mono text-[11px]"
                >
                  {t.ticketNumber} ({t.status})
                </button>
              ))}
              <button
                onClick={() => handleValidate('FAKE-CODE-999')}
                className="px-2.5 py-1 rounded-lg bg-[#291717] hover:bg-[#3d1e1e] text-[#e06b6b] border border-[#4a2222] font-mono text-[11px]"
              >
                Soxta chipta kodi
              </button>
            </div>
          </div>
        </div>

        {/* Verification Result Display */}
        <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2d1f14] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center justify-between">
              <span>Tekshiruv Natijasi</span>
              {scanResult.status && (
                <button
                  onClick={() => setScanResult({ status: null })}
                  className="text-xs text-[#8a7866] hover:text-white"
                >
                  Tozalash
                </button>
              )}
            </h3>

            {scanResult.status === null ? (
              <div className="h-56 rounded-2xl bg-[#1b140e] border border-[#2f2115] flex flex-col items-center justify-center text-center p-6 space-y-2">
                <TicketIcon className="w-10 h-10 text-[#504031]" />
                <h4 className="text-xs font-semibold text-[#8c7b6a]">Hech qanday chipta skanerlanmadi</h4>
                <p className="text-[11px] text-[#6b5b4c]">
                  Chiptaning QR kodini kameraga qarating yoki chap tomondagi maydonga seriya raqamini yozing.
                </p>
              </div>
            ) : scanResult.status === 'valid' ? (
              <div className="p-5 rounded-2xl bg-[#172b1b] border-2 border-[#55c97b] space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-3 text-[#55c97b]">
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">CHIPTA HAQIQIY! XUSH KELIBSIZ</h4>
                    <p className="text-xs text-white/80">Kirishga ruxsat berildi</p>
                  </div>
                </div>

                {scanResult.ticket && (
                  <div className="pt-2 border-t border-[#55c97b]/30 space-y-1.5 text-xs text-white/90 font-mono">
                    <div>Tadbir: <strong className="text-white">{scanResult.ticket.eventTitle}</strong></div>
                    <div>Xaridor: <strong className="text-white">{scanResult.ticket.buyerName}</strong></div>
                    <div>O'rindiq: <strong className="text-[#f7d88c]">{scanResult.ticket.sector}, Qator {scanResult.ticket.row}, Joy {scanResult.ticket.seat}</strong></div>
                    <div>Chipta raqami: <strong>{scanResult.ticket.ticketNumber}</strong></div>
                  </div>
                )}
              </div>
            ) : scanResult.status === 'used' ? (
              <div className="p-5 rounded-2xl bg-[#2e2614] border-2 border-[#e5a93c] space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-3 text-[#e5a93c]">
                  <AlertTriangle className="w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">CHIPTA OLDIN ISHLATILGAN!</h4>
                    <p className="text-xs text-white/80">Takroriy kirish urinishi aniqlandi</p>
                  </div>
                </div>
                {scanResult.ticket && (
                  <div className="pt-2 border-t border-[#e5a93c]/30 text-xs text-white/90 font-mono space-y-1">
                    <div>Tadbir: {scanResult.ticket.eventTitle}</div>
                    <div>O'rindiq: {scanResult.ticket.sector}, Q-{scanResult.ticket.row}, J-{scanResult.ticket.seat}</div>
                    <div className="text-[#e5a93c]">Holat: 1-marta kirish ro'yxatdan o'tgan</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-[#301616] border-2 border-[#e06b6b] space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-3 text-[#e06b6b]">
                  <XCircle className="w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider">CHIPTA TOPILMADI YOKI SOXTA!</h4>
                    <p className="text-xs text-white/80">Tizimda bunday raqam qayd etilmagan</p>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed pt-1">
                  Ushbu chipta soxtalashtirilgan yoki bekor qilingan bo'lishi mumkin. Iltimos, xaridordan rasmiy ilovani ko'rsatishni so'rang.
                </p>
              </div>
            )}
          </div>

          {/* Controller Stats */}
          <div className="pt-4 border-t border-[#23180f] grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#1b140e]">
              <span className="text-[10px] text-[#8c7b6a] block">Jami tekshirildi</span>
              <span className="font-bold text-white font-mono">{logs.length} ta</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1b140e]">
              <span className="text-[10px] text-[#55c97b] block">Muvaffaqiyatli</span>
              <span className="font-bold text-white font-mono">
                {logs.filter((l) => l.verdict === 'valid').length} ta
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1b140e]">
              <span className="text-[10px] text-[#e06b6b] block">Rad etildi</span>
              <span className="font-bold text-white font-mono">
                {logs.filter((l) => l.verdict !== 'valid').length} ta
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scan Logs */}
      <div className="p-6 rounded-3xl bg-[#140e0a] border border-[#2b1f14] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <History className="w-4 h-4 text-[#d4af37]" />
            <span>So'nggi O'qilgan Chiptalar Tarixi</span>
          </h3>
          <span className="text-xs text-[#8c7b6a]">Jonli hisob</span>
        </div>

        <div className="divide-y divide-[#23180f] text-xs">
          {logs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  log.verdict === 'valid' ? 'bg-[#55c97b]' : log.verdict === 'used' ? 'bg-[#e5a93c]' : 'bg-[#e06b6b]'
                }`} />
                <div>
                  <span className="font-mono font-bold text-white">{log.code}</span>
                  {log.eventTitle && <p className="text-[11px] text-[#8c7b6a] truncate max-w-sm">{log.eventTitle} • {log.seatInfo}</p>}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`font-bold ${
                  log.verdict === 'valid' ? 'text-[#55c97b]' : log.verdict === 'used' ? 'text-[#e5a93c]' : 'text-[#e06b6b]'
                }`}>
                  {log.verdict === 'valid' ? '✓ Kirish berildi' : log.verdict === 'used' ? '⚠ Oldin ishlatilgan' : '✗ Soxta / Topilmadi'}
                </span>
                <span className="block font-mono text-[10px] text-[#715f50] mt-0.5">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
