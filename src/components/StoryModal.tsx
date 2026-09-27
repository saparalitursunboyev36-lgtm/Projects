import React, { useEffect, useState } from 'react';
import { Story, SahnaEvent } from '../types';
import { X, Volume2, VolumeX, Sparkles, Ticket as TicketIcon } from 'lucide-react';

interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
  onBookEvent: (eventId: string) => void;
  events: SahnaEvent[];
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onBookEvent,
  events
}) => {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!story) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            onClose();
            return 100;
          }
          return prev + 1.2;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [story, isPaused, onClose]);

  if (!story) return null;

  const relatedEvent = events.find((e) => e.id === story.eventId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm h-[650px] max-h-[90vh] rounded-3xl overflow-hidden bg-[#140e09] border border-[#3c2a1a] shadow-2xl flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Image / Video Simulation */}
        <div className="absolute inset-0">
          <img
            src={story.videoPoster}
            alt={story.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
        </div>

        {/* Top Header & Progress */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress bar */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#d4af37] to-[#fbf4eb] h-full transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={story.avatar}
                alt={story.organizerName}
                className="w-10 h-10 rounded-full border-2 border-[#d4af37] object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  {story.organizerName}
                  <span className="w-3.5 h-3.5 rounded-full bg-[#d4af37] text-black text-[9px] flex items-center justify-center font-bold">
                    ✓
                  </span>
                </h4>
                <p className="text-[10px] text-white/70">{story.organizerRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center audio wave / live status indicator */}
        <div className="relative z-10 px-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-[11px] text-[#f4efe8]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Artist va Bosh Rejissyordan Jonli Murojaat</span>
          </div>
          <h3 className="font-cinzel text-xl font-bold text-white leading-tight drop-shadow-md">
            "{story.title}"
          </h3>
          <p className="text-xs text-white/80 line-clamp-2">
            "Biz sahnada jonli akustika va haqiqiy dramaturgiyani his qilishingiz uchun barcha kuchiimizni sarfladik..."
          </p>
        </div>

        {/* Bottom CTA Card */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
          {relatedEvent && (
            <div className="p-3.5 rounded-2xl bg-[#1c140d]/90 border border-[#3d2b1b] backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#d4af37] font-semibold">{relatedEvent.category}</span>
                <span className="text-[#a89684]">{relatedEvent.date} • {relatedEvent.time}</span>
              </div>
              <h5 className="text-sm font-bold text-white line-clamp-1">{relatedEvent.title}</h5>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-[#8e7e6e] block">Chiptalar narxi</span>
                  <span className="text-xs font-mono font-bold text-[#fbf4eb]">
                    {relatedEvent.minPrice.toLocaleString()} so'mdan
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    onBookEvent(relatedEvent.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa801e] text-[#0e0a07] font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20"
                >
                  <TicketIcon className="w-3.5 h-3.5" />
                  <span>Joy tanlash</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
