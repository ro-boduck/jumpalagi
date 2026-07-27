'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    {/* Boxicons v3.0.8 https://boxicons.com | License https://docs.boxicons.com/free */}
    <path
      fillRule="evenodd"
      d="M18.403 5.633A8.92 8.92 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a9 9 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.93 8.93 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.45 7.45 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.45 7.45 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.41 7.41 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73s-.354-.112-.504.112-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393s.149-.224.224-.374.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a10 10 0 0 0-.429-.008.83.83 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321 1.582 2.415 3.832 3.387c.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066s.187-.973.131-1.067-.207-.151-.43-.263"
      clipRule="evenodd"
    />
  </svg>
);

const DICT = {
  ID: {
    timerPrefix: 'SIAP-SIAP! MENGHUBUNGKAN DALAM',
    timerSuffix: 'DETIK... ;)',
    subtextPrefix: 'Biar gak cuma sekadar wacana di WAG, tim concierge kami siap racik itinerary khusus buat',
    subtextSuffix: 'Anda! :)',
    primaryBtn: 'LANGSUNG CHAT AGENT VIA WA',
    secondaryBtn: 'NANTI DULU, MAU LIHAT-LIHAT ;)',
  },
  EN: {
    timerPrefix: 'GET READY! CONNECTING IN',
    timerSuffix: 'SECONDS... ;)',
    subtextPrefix: 'No more lost plans in group chats! Our concierge team is drafting your custom plan for',
    subtextSuffix: '! :)',
    primaryBtn: 'CHAT AGENT NOW ON WHATSAPP',
    secondaryBtn: 'WAIT, STILL BROWSING ;)',
  },
};

interface WhatsAppRedirectModalProps {
  isOpen: boolean;
  packageName: string;
  customMessage?: string;
  onClose: () => void;
}

export function WhatsAppRedirectModal({
  isOpen,
  packageName,
  customMessage,
  onClose,
}: WhatsAppRedirectModalProps) {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const { lang } = useLanguage();
  const t = DICT[lang] || DICT.ID;

  const COUNTDOWN_INITIAL = 5;
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_INITIAL);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasRedirectedRef = useRef(false);

  const phone = '6287754764598';
  const defaultText = customMessage || `Halo Tim Jumpa Lagi, saya mau konsultasi buat ${packageName || 'Paket Reuni'} nih!`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;

  const executeRedirect = () => {
    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      hasRedirectedRef.current = false;
      setTimeLeft(COUNTDOWN_INITIAL);
      document.body.style.overflow = 'hidden';

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            if (!hasRedirectedRef.current) {
              hasRedirectedRef.current = true;
              // 300ms delay after timer reaches 0 before executing redirect
              setTimeout(() => {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                onClose();
              }, 300);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      document.body.style.overflow = 'unset';
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, whatsappUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with Deep Navy tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F2D4A]/70 backdrop-blur-xs"
          />

          {/* Compact Neobrutalist Modal Card */}
          <motion.div
            initial={{ scale: 0.9, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 15, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-[#FEFCFF] border-4 border-[#0F2D4A] shadow-[10px_10px_0_0_#0F2D4A] p-6 sm:p-8 z-10 flex flex-col items-center text-center my-auto select-none pt-10"
          >
            {/* Top Right Neobrutalist Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 border-2 border-[#0F2D4A] bg-[#FEFCFF] text-[#0F2D4A] p-1.5 hover:bg-[#E7AF36] transition-all hover:shadow-[2px_2px_0_0_#0F2D4A] active:translate-x-0 active:translate-y-0 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 stroke-[3px]" />
            </button>

            {/* Dynamic Countdown Headline */}
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0F2D4A] leading-tight mb-3">
              {t.timerPrefix} <span className="text-[#E7AF36] underline decoration-4 underline-offset-4">{timeLeft}</span> {t.timerSuffix}
            </h2>

            {/* Playful & Clean Copy with text emoticon */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F2D4A]/80 max-w-md leading-relaxed mb-6">
              {t.subtextPrefix}{' '}
              <span className="font-black text-[#1D699B]">
                {packageName || 'Paket Reuni'}
              </span>{' '}
              {t.subtextSuffix}
            </p>

            {/* Stacked Action Buttons */}
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={executeRedirect}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                className="neo-btn-primary relative overflow-hidden group !bg-[#25D366] !text-white hover:!bg-[#0F2D4A] border-3 border-[#0F2D4A] shadow-[4px_4px_0_0_#0F2D4A] flex items-center justify-center gap-3 !py-3.5 text-sm font-black tracking-widest uppercase cursor-pointer"
              >
                <WhatsappIcon className="w-5 h-5 shrink-0 relative z-10" />
                <span className="relative z-10">{t.primaryBtn}</span>
                <ArrowRight className="w-4 h-4 stroke-[3px] relative z-10" />
                <div className={`absolute inset-0 pointer-events-none transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/70 to-transparent ${isBtnHovered ? "translate-x-full" : "-translate-x-full"}`} />
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 border-2 border-[#0F2D4A] bg-[#F9F6EE] text-[#0F2D4A] hover:bg-[#E7AF36] font-black text-xs uppercase tracking-widest transition-all duration-150 shadow-[2px_2px_0_0_#0F2D4A] active:translate-x-0 active:translate-y-0 cursor-pointer"
              >
                {t.secondaryBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
