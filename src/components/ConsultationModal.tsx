'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsultation } from '@/contexts/ConsultationContext';

const DICT = {
  ID: {
    title: 'KONSULTASI GRATIS',
    subtitle: 'Biar kami yang susun rencana reuni Anda.',
    nameLabel: 'NAMA LENGKAP *',
    namePlaceholder: 'MISAL: BUDI SANTOSO',
    emailLabel: 'EMAIL',
    emailPlaceholder: 'BUDI@EMAIL.COM',
    whatsappLabel: 'NOMOR WHATSAPP *',
    whatsappPlaceholder: 'MISAL: 08123456789',
    packageLabel: 'TIPE REUNI',
    participantsLabel: 'ESTIMASI PESERTA',
    participantsPlaceholder: 'MISAL: 50',
    dateLabel: 'TANGGAL REUNI',
    notesLabel: 'CATATAN TAMBAHAN / KEINGINAN KHUSUS',
    notesPlaceholder: 'TULISKAN DETAIL ACARA ATAU PERMINTAAN KHUSUS DI SINI...',
    submitBtn: 'KIRIM PERMINTAAN KONSULTASI',
    submittingBtn: 'SEDANG MENGIRIM...',
    successTitle: 'BERHASIL DIKIRIM!',
    successDesc: 'Terima kasih! Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email dalam 1x24 jam.',
    errorTitle: 'PENGIRIMAN GAGAL',
    errorDesc: 'Terjadi kesalahan saat mengirim formulir. Silakan coba beberapa saat lagi atau hubungi kami langsung via WhatsApp.',
    closeBtn: 'TUTUP',
    packages: {
      corporate: 'Alumni Korporat',
      intimate: 'Teman Masa Kecil',
      batch: 'Teman Sekolah',
      family: 'Keluarga Besar',
      custom: 'Lainnya / Kustom'
    }
  },
  EN: {
    title: 'FREE CONSULTATION',
    subtitle: 'Let us draft your perfect reunion plan.',
    nameLabel: 'FULL NAME *',
    namePlaceholder: 'E.G. JOHN DOE',
    emailLabel: 'EMAIL',
    emailPlaceholder: 'JOHN@EMAIL.COM',
    whatsappLabel: 'WHATSAPP NUMBER *',
    whatsappPlaceholder: 'E.G. +628123456789',
    packageLabel: 'REUNION TYPE',
    participantsLabel: 'ESTIMATED PARTICIPANTS',
    participantsPlaceholder: 'E.G. 50',
    dateLabel: 'REUNION DATE',
    notesLabel: 'ADDITIONAL NOTES / SPECIAL REQUESTS',
    notesPlaceholder: 'DESCRIBE YOUR EVENT OR SPECIAL DEMANDS HERE...',
    submitBtn: 'SUBMIT CONSULTATION REQUEST',
    submittingBtn: 'SUBMITTING...',
    successTitle: 'SUCCESSFULLY SENT!',
    successDesc: 'Thank you! Our team will contact you via WhatsApp or Email within 24 hours.',
    errorTitle: 'SUBMISSION FAILED',
    errorDesc: 'Something went wrong. Please try again later or contact us directly via WhatsApp.',
    closeBtn: 'CLOSE',
    packages: {
      corporate: 'Corporate Alumni',
      intimate: 'Childhood Friends',
      batch: 'School Friends',
      family: 'Extended Family',
      custom: 'Other / Custom'
    }
  }
};

export function ConsultationModal() {
  const { lang } = useLanguage();
  const { isConsultOpen, selectedPackage, closeConsult } = useConsultation();
  const t = DICT[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    packageType: '',
    participants: '',
    date: '',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Sync selected package from context to form state
  useEffect(() => {
    if (isConsultOpen) {
      setStatus('idle');
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        packageType: selectedPackage || 'custom',
        participants: '',
        date: '',
        notes: '',
      });
    }
  }, [isConsultOpen, selectedPackage]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isConsultOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isConsultOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;

    setStatus('submitting');
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          packageType: t.packages[formData.packageType as keyof typeof t.packages] || formData.packageType,
          participants: formData.participants,
          date: formData.date,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isConsultOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeConsult}
            className="fixed inset-0 bg-[#0F2D4A]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-bg border-4 border-primary shadow-[8px_8px_0_0_#0F2D4A] p-6 md:p-10 z-10 flex flex-col my-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeConsult}
              className="absolute top-4 right-4 md:top-6 md:right-6 border-2 border-primary bg-bg text-primary p-2 hover:bg-accent hover:text-white transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F2D4A] active:translate-x-0 active:translate-y-0 active:shadow-none"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[3px]" />
            </button>

            {status === 'success' ? (
              /* Success UI */
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-20 h-20 bg-accent flex items-center justify-center border-4 border-primary shadow-[4px_4px_0_0_#0F2D4A] mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white stroke-[3px]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary mb-4">
                  {t.successTitle}
                </h2>
                <p className="font-bold uppercase tracking-widest text-sm text-text/90 max-w-md leading-relaxed mb-8">
                  {t.successDesc}
                </p>
                <button
                  onClick={closeConsult}
                  className="neo-btn-primary max-w-xs"
                >
                  {t.closeBtn}
                </button>
              </div>
            ) : status === 'error' ? (
              /* Error UI */
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-20 h-20 bg-destructive/10 border-4 border-primary shadow-[4px_4px_0_0_#0F2D4A] flex items-center justify-center mb-6">
                  <AlertTriangle className="w-10 h-10 text-red-600 stroke-[3px]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-red-600 mb-4">
                  {t.errorTitle}
                </h2>
                <p className="font-bold uppercase tracking-widest text-sm text-text/90 max-w-md leading-relaxed mb-8">
                  {t.errorDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={() => setStatus('idle')}
                    className="neo-btn-primary sm:w-auto"
                  >
                    COBA LAGI
                  </button>
                  <button
                    onClick={closeConsult}
                    className="border-2 border-primary bg-bg text-primary px-6 py-3 font-black uppercase tracking-widest hover:bg-muted transition-all duration-200"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              </div>
            ) : (
              /* Form UI */
              <>
                <div className="mb-6 md:mb-8 pr-10">
                  <span className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm block mb-1">
                    {t.title}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-none">
                    {t.title}
                  </h2>
                  <p className="font-bold uppercase tracking-widest text-xs text-text-light mt-2">
                    {t.subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
                  <div className="flex flex-col gap-4 md:gap-5 max-h-[48vh] overflow-y-auto pr-2 pb-4">
                    {/* Row 1: Name & Whatsapp */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.nameLabel}
                        </label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.namePlaceholder}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none placeholder:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.whatsappLabel}
                        </label>
                        <input
                          required
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder={t.whatsappPlaceholder}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none placeholder:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Reunion Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.emailLabel}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.emailPlaceholder}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none placeholder:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.packageLabel}
                        </label>
                        <select
                          name="packageType"
                          value={formData.packageType}
                          onChange={handleChange}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none cursor-pointer appearance-none relative"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230F2D4A' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '16px'
                          }}
                        >
                          <option value="corporate">{t.packages.corporate}</option>
                          <option value="intimate">{t.packages.intimate}</option>
                          <option value="batch">{t.packages.batch}</option>
                          <option value="family">{t.packages.family}</option>
                          <option value="custom">{t.packages.custom}</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Participants & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.participantsLabel}
                        </label>
                        <input
                          type="number"
                          name="participants"
                          value={formData.participants}
                          onChange={handleChange}
                          placeholder={t.participantsPlaceholder}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none placeholder:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">
                          {t.dateLabel}
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none"
                        />
                      </div>
                    </div>

                    {/* Row 4: Notes */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase tracking-widest text-primary">
                        {t.notesLabel}
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder={t.notesPlaceholder}
                        className="w-full border-2 border-primary bg-white text-primary p-3 font-bold uppercase tracking-wider text-sm outline-none focus:shadow-[4px_4px_0_0_#E7AF36] transition-all duration-150 rounded-none placeholder:opacity-50 resize-none min-h-[80px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="neo-btn-primary flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-5 h-5 stroke-[2.5px]" />
                    <span>{status === 'submitting' ? t.submittingBtn : t.submitBtn}</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
