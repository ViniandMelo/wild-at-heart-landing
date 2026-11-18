import React, { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { BannerArtboard } from './components/BannerArtboard';
import { LandingFooter, LandingSections } from './components/LandingSections';
import { ScrollSequence } from './components/ScrollSequence';
import { exportBannerPng } from './utils/exportBanner';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
  const [location, setLocation] = useState('Wild at Heart Lake Hotel, Canadá');
  const [date, setDate] = useState('Selecione a Data');
  const [guests, setGuests] = useState('2 Pessoas');
  const [activeNav, setActiveNav] = useState('Home');

  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('Hospedagem + Helicóptero');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const bookingDialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const titleLine1 = 'Wild at Heart';
  const titleLine2 = 'Lake Hotel';

  useEffect(() => {
    if (!bookingModalOpen) return;

    const dialog = bookingDialogRef.current;
    if (!dialog) return;

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    (dialog.querySelector<HTMLElement>('#guest-name') ?? getFocusableElements()[0])?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setBookingModalOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.requestAnimationFrame(() => {
        if (lastFocusedElementRef.current?.isConnected) {
          lastFocusedElementRef.current.focus();
        }
      });
    };
  }, [bookingModalOpen]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectNav = (targetId: string, label: string) => {
    setActiveNav(label);
    const el = document.getElementById(targetId);
    if (el) {
      el.focus({ preventScroll: true });
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      el.scrollIntoView({ behavior, block: 'start' });
    }
  };

  const handleOpenBooking = (packageType = 'Hospedagem + Helicóptero') => {
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setSelectedPackage(packageType);
    setFormError(null);
    setBookingConfirmed(false);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Informe seu nome completo para continuar.');
      return;
    }
    if (!EMAIL_PATTERN.test(guestEmail.trim())) {
      setFormError('Informe um endereço de e-mail válido.');
      return;
    }
    setFormError(null);
    setBookingConfirmed(true);
  };

  const handleExport4k = async () => {
    try {
      setIsExporting(true);
      await exportBannerPng({
        titleLine1,
        titleLine2,
        location,
        date,
        guests,
        width: 3840,
        height: 2160,
      });
      setToastMessage('Banner 4K (3840 × 2160) exportado com sucesso.');
    } catch {
      setToastMessage('Não foi possível exportar o banner. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <ScrollSequence />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className="relative z-10 min-h-screen bg-transparent text-[#FFFFFF] font-dm">
        <main id="main-content" tabIndex={-1} data-testid="main-content">
          <BannerArtboard
            titleLine1={titleLine1}
            titleLine2={titleLine2}
            location={location}
            date={date}
            guests={guests}
            activeNav={activeNav}
            onChangeLocation={setLocation}
            onChangeDate={setDate}
            onChangeGuests={setGuests}
            onSelectNav={handleSelectNav}
            onBookSchedule={handleOpenBooking}
            onSpotSelect={(label) => setToastMessage(`${label} · 300+ Destinos Icônicos`)}
          />

          <LandingSections onBookPackage={handleOpenBooking} />
        </main>
        <LandingFooter onExport4kBanner={handleExport4k} isExporting={isExporting} />

      {/* Notificação discreta */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          data-testid="status-toast"
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/20 text-white text-xs font-medium flex items-center gap-2 shadow-2xl"
        >
          <Check className="w-3.5 h-3.5 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal de Reserva & Validação */}
      {bookingModalOpen && (
        <div
          data-testid="booking-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            ref={bookingDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-dialog-title"
            aria-describedby="booking-details"
            tabIndex={-1}
            data-testid="booking-dialog"
            className="w-full max-w-lg rounded-2xl bg-[#0D0D0D] border border-white/15 p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-white/60 mb-1">Prism · Reserva Exclusiva</p>
                <h2 id="booking-dialog-title" className="font-didone text-2xl sm:text-3xl font-black text-white">
                  {titleLine1} {titleLine2}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                aria-label="Fechar janela de reserva"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div id="booking-details" className="space-y-2.5 border-y border-white/12 py-4 mb-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/60">Experiência</span>
                <span className="font-medium text-white text-right">{selectedPackage}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/60">Localização</span>
                <span className="font-medium text-white text-right">{location}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/60">Data</span>
                <span className="font-medium text-white text-right">
                  {date === 'Selecione a Data' ? 'Temporada 2026 (A confirmar)' : date}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/60">Hóspedes</span>
                <span className="font-medium text-white text-right">{guests}</span>
              </div>
            </div>

            {bookingConfirmed ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-white/5 border border-white/15 flex items-start gap-3">
                  <Check className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div className="text-sm leading-relaxed">
                    <p className="font-semibold text-white mb-1">
                      Solicitação registrada para {guestName}
                    </p>
                    <p className="text-white/75">
                      Enviaremos a disponibilidade de hospedagem à beira do lago e horários do
                      sobrevoo de helicóptero para <span className="text-white">{guestEmail}</span>.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} noValidate data-testid="booking-form" className="space-y-4">
                <div>
                  <label htmlFor="guest-name" className="block text-xs font-medium text-white/80 mb-1.5">
                    Nome completo
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(formError && !guestName.trim())}
                    aria-describedby={formError ? 'booking-form-error' : undefined}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ex.: Mariana Silva"
                    className="w-full h-11 px-4 rounded-xl bg-black border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label htmlFor="guest-email" className="block text-xs font-medium text-white/80 mb-1.5">
                    E-mail para contato
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(formError && !EMAIL_PATTERN.test(guestEmail.trim()))}
                    aria-describedby={formError ? 'booking-form-error' : undefined}
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="mariana@exemplo.com"
                    className="w-full h-11 px-4 rounded-xl bg-black border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                {formError && (
                  <p id="booking-form-error" role="alert" className="text-xs text-red-400">
                    {formError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2.5 rounded-full border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
