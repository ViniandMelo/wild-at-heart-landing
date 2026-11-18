import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Calendar, ChevronDown, MapPin, Menu, Users, X } from 'lucide-react';
import {
  SpotCompassIcon,
  SpotNodesIcon,
  SpotPinIcon,
  SpotUsersIcon,
  PrismGlobeIcon,
} from './BannerIcons';

export interface BannerArtboardProps {
  titleLine1: string;
  titleLine2: string;
  location: string;
  date: string;
  guests: string;
  activeNav: string;
  onChangeLocation: (value: string) => void;
  onChangeDate: (value: string) => void;
  onChangeGuests: (value: string) => void;
  onSelectNav: (navId: string, label: string) => void;
  onBookSchedule: (packageType?: string) => void;
  onSpotSelect?: (spotLabel: string) => void;
}

const LOGICAL_WIDTH = 1440;
const LOGICAL_HEIGHT = 810;

const LOCATION_OPTIONS = [
  'Wild at Heart Lake Hotel, Canadá',
  'Banff National Park, Canadá',
  'Lake Louise Sanctuary, Canadá',
  'Whistler Alpine Ridge, Canadá',
];

const DATE_OPTIONS = [
  'Selecione a Data',
  '15 Ago 2026',
  '22 Set 2026',
  '10 Out 2026',
  '05 Nov 2026',
];

const GUEST_OPTIONS = ['1 Pessoa', '2 Pessoas', '3 Pessoas', '4 Pessoas', '6 Pessoas'];

const NAV_ITEMS = [
  { label: 'Home', target: 'home' },
  { label: 'Destinos', target: 'sobre' },
  { label: 'Sobre', target: 'sobre' },
  { label: 'Experiências', target: 'experiencias' },
  { label: 'Contato', target: 'contato' },
  { label: 'Reservar Voo', target: 'book-flight' },
];

export const BannerArtboard: React.FC<BannerArtboardProps> = ({
  titleLine1,
  titleLine2,
  location,
  date,
  guests,
  activeNav,
  onChangeLocation,
  onChangeDate,
  onChangeGuests,
  onSelectNav,
  onBookSchedule,
  onSpotSelect,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [openMenu, setOpenMenu] = useState<'location' | 'date' | 'guests' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Left-side elements slide out to the left on scroll
  const leftSubheadX = useTransform(scrollYProgress, [0, 0.55], [0, shouldReduceMotion ? 0 : -420]);
  const leftSubheadOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  const leftFooterX = useTransform(scrollYProgress, [0.03, 0.58], [0, shouldReduceMotion ? 0 : -360]);
  const leftFooterOpacity = useTransform(scrollYProgress, [0.03, 0.45], [1, 0]);

  // Right-side elements slide out to the right on scroll
  const rightCardX = useTransform(scrollYProgress, [0, 0.55], [0, shouldReduceMotion ? 0 : 440]);
  const rightCardOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const rightFooterX = useTransform(scrollYProgress, [0.04, 0.6], [0, shouldReduceMotion ? 0 : 380]);
  const rightFooterOpacity = useTransform(scrollYProgress, [0.04, 0.48], [1, 0]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setScale(w / LOGICAL_WIDTH);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleNavClick = (item: { label: string; target: string }) => {
    setMobileMenuOpen(false);
    if (item.target === 'book-flight') {
      onBookSchedule('Sobrevoo de Helicóptero + Hospedagem');
      return;
    }
    onSelectNav(item.target, item.label);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      tabIndex={-1}
      aria-label="Apresentação do Wild at Heart Lake Hotel"
      data-testid="hero-section"
      className="relative w-full bg-transparent text-[#FFFFFF] overflow-x-clip"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && openMenu) {
          const triggerId = `desktop-${openMenu}`;
          setOpenMenu(null);
          document.getElementById(triggerId)?.focus();
        }
      }}
    >
      <h1 className="sr-only">{titleLine1} {titleLine2}</h1>
      {/* Desktop / Wide Viewport: Exact faithful 16:9 scaled editorial banner */}
      <div
        ref={containerRef}
        className="hidden min-[1440px]:block relative w-full aspect-video max-w-[1600px] mx-auto bg-transparent overflow-hidden select-none"
        onClick={() => {
          if (openMenu) setOpenMenu(null);
        }}
      >
        <div
          style={{
            width: `${LOGICAL_WIDTH}px`,
            height: `${LOGICAL_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="absolute top-0 left-0 bg-transparent text-[#FFFFFF] font-dm"
        >
          {/* 1. Top Bar */}
          <header
            style={{
              left: '112px',
              right: '112px',
              top: '29px',
              height: '44px',
            }}
            className="absolute flex items-center justify-between gap-8"
          >
            <button
              type="button"
              onClick={() => onSelectNav('home', 'Home')}
              aria-label="Prism - início"
              data-testid="brand-home"
              className="flex items-center gap-[9px] text-[#FFFFFF] whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
            >
              <PrismGlobeIcon className="w-[34px] h-[34px]" />
              <span className="text-[22px] font-bold tracking-[-0.02em] leading-none text-[#FFFFFF]">
                Prism
              </span>
            </button>

            {/* Center: 6 navigation links */}
            <nav
              aria-label="Navegação principal"
              data-testid="primary-navigation-desktop"
              className="flex items-center gap-[32px] text-[14px] font-normal text-[#FFFFFF]"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`whitespace-nowrap shrink-0 cursor-pointer transition-opacity duration-150 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm ${
                    activeNav === item.label ? 'font-semibold underline underline-offset-4' : 'font-normal'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right: Primary CTA + Circle arrow button */}
            <div className="flex items-center gap-[6px] shrink-0">
              <button
                type="button"
                onClick={() => onBookSchedule('Hospedagem + Helicóptero')}
                data-testid="cta-book-experience"
                className="h-[44px] px-[24px] rounded-full border border-white/88 text-[#FFFFFF] text-[14px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Reservar Experiência
              </button>
              <button
                type="button"
                onClick={() => onBookSchedule('Hospedagem + Helicóptero')}
                aria-label="Abrir reserva de experiência"
                className="w-[44px] h-[44px] rounded-full border border-white/88 text-[#FFFFFF] flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-150 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ArrowUpRight className="w-[17px] h-[17px]" strokeWidth={1.75} />
              </button>
            </div>
          </header>

          {/* 2. Dominant Hero Title (Playfair Display Black 900, Pure White) */}
          <div
            aria-hidden="true"
            style={{
              top: '138px',
              left: '64px',
              right: '64px',
              fontSize: '154px',
              lineHeight: '0.94',
              letterSpacing: '-0.018em',
            }}
            className="absolute text-center font-didone font-black text-[#FFFFFF] m-0 p-0"
          >
            <span className="block whitespace-nowrap">{titleLine1}</span>
            <span className="block whitespace-nowrap">{titleLine2}</span>
          </div>

          {/* 3. Middle Row: Left Subheadline + Right White Booking Card */}
          <motion.div
            style={{
              left: '112px',
              top: '508px',
              x: leftSubheadX,
              opacity: leftSubheadOpacity,
            }}
            className="absolute will-change-transform"
          >
            <h2
              style={{
                fontSize: '40px',
                lineHeight: '1.18',
                letterSpacing: '-0.022em',
              }}
              className="font-dm font-bold text-[#FFFFFF] m-0"
            >
              <span className="block whitespace-nowrap">Uncover the World’s</span>
              <span className="block whitespace-nowrap">Natural Wonders.</span>
            </h2>
          </motion.div>

          {/* Right White Booking Card */}
          <motion.div
            style={{
              left: '580px',
              top: '496px',
              width: '748px',
              height: '126px',
              borderRadius: '22px',
              padding: '20px 22px',
              x: rightCardX,
              opacity: rightCardOpacity,
            }}
            role="group"
            aria-label="Busca rápida de experiências"
            data-testid="hero-search-form"
            className="absolute bg-[#FFFFFF] text-[#111111] flex items-end gap-[10px] will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Localização */}
            <div className="relative w-[240px] shrink-0">
              <label htmlFor="desktop-location" className="block text-[12.5px] font-semibold text-[#111111] mb-[8px] pl-[4px] leading-none">
                Localização
              </label>
              <button
                id="desktop-location"
                type="button"
                aria-expanded={openMenu === 'location'}
                aria-controls="desktop-location-options"
                onClick={() => setOpenMenu(openMenu === 'location' ? null : 'location')}
                className="w-full h-[46px] px-[12px] rounded-full bg-[#F3F4F6] hover:bg-[#E9ECEF] transition-colors flex items-center gap-[7px] text-[12.5px] font-medium text-[#111111] cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-[15px] h-[15px] shrink-0 text-[#111111]" strokeWidth={1.8} />
                <span className="truncate">{location}</span>
              </button>
              <div id="desktop-location-options" role="group" aria-label="Opções de localização" className={`${openMenu === 'location' ? 'block' : 'hidden'} absolute left-0 bottom-[52px] w-[265px] bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-30`}>
                  {LOCATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChangeLocation(opt);
                        setOpenMenu(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[12.5px] hover:bg-neutral-100 cursor-pointer transition-colors ${
                        opt === location ? 'font-semibold text-black bg-neutral-50' : 'text-neutral-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            </div>

            {/* Data */}
            <div className="relative w-[144px] shrink-0">
              <label htmlFor="desktop-date" className="block text-[12.5px] font-semibold text-[#111111] mb-[8px] pl-[4px] leading-none">
                Data
              </label>
              <button
                id="desktop-date"
                type="button"
                aria-expanded={openMenu === 'date'}
                aria-controls="desktop-date-options"
                onClick={() => setOpenMenu(openMenu === 'date' ? null : 'date')}
                className="w-full h-[46px] px-[12px] rounded-full bg-[#F3F4F6] hover:bg-[#E9ECEF] transition-colors flex items-center gap-[7px] text-[12.5px] font-medium text-[#111111] cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-[15px] h-[15px] shrink-0 text-[#111111]" strokeWidth={1.8} />
                <span className="truncate">{date}</span>
              </button>
              <div id="desktop-date-options" role="group" aria-label="Opções de data" className={`${openMenu === 'date' ? 'block' : 'hidden'} absolute left-0 bottom-[52px] w-[195px] bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-30`}>
                  {DATE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChangeDate(opt);
                        setOpenMenu(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[12.5px] hover:bg-neutral-100 cursor-pointer transition-colors ${
                        opt === date ? 'font-semibold text-black bg-neutral-50' : 'text-neutral-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            </div>

            {/* Hóspedes */}
            <div className="relative w-[128px] shrink-0">
              <label htmlFor="desktop-guests" className="block text-[12.5px] font-semibold text-[#111111] mb-[8px] pl-[4px] leading-none">
                Hóspedes
              </label>
              <button
                id="desktop-guests"
                type="button"
                aria-expanded={openMenu === 'guests'}
                aria-controls="desktop-guests-options"
                onClick={() => setOpenMenu(openMenu === 'guests' ? null : 'guests')}
                className="w-full h-[46px] px-[12px] rounded-full bg-[#F3F4F6] hover:bg-[#E9ECEF] transition-colors flex items-center justify-between gap-[4px] text-[12.5px] font-medium text-[#111111] cursor-pointer whitespace-nowrap"
              >
                <span className="flex items-center gap-[6px] truncate">
                  <Users className="w-[15px] h-[15px] shrink-0 text-[#111111]" strokeWidth={1.8} />
                  <span>{guests}</span>
                </span>
                <ChevronDown className="w-[13px] h-[13px] shrink-0 text-[#111111]" strokeWidth={2} />
              </button>
              <div id="desktop-guests-options" role="group" aria-label="Opções de hóspedes" className={`${openMenu === 'guests' ? 'block' : 'hidden'} absolute left-0 bottom-[52px] w-[150px] bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-30`}>
                  {GUEST_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onChangeGuests(opt);
                        setOpenMenu(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[12.5px] hover:bg-neutral-100 cursor-pointer transition-colors ${
                        opt === guests ? 'font-semibold text-black bg-neutral-50' : 'text-neutral-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            </div>

            {/* Botão Reservar Experiência */}
            <button
              type="button"
              onClick={() => onBookSchedule('Hospedagem + Helicóptero')}
              className="flex-1 h-[46px] px-[14px] rounded-full bg-[#000000] hover:bg-neutral-800 transition-colors text-[#FFFFFF] text-[12.5px] font-medium whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Reservar Experiência
            </button>
          </motion.div>

          {/* 4. Bottom Footer Strip */}
          <div
            style={{
              left: '112px',
              right: '112px',
              top: '702px',
            }}
            className="absolute flex items-center justify-between"
          >
            {/* Left cluster */}
            <motion.div
              style={{ x: leftFooterX, opacity: leftFooterOpacity }}
              className="flex items-center will-change-transform"
            >
              <div className="text-[13px] font-semibold leading-[1.35] text-[#FFFFFF] whitespace-nowrap">
                <span className="block">300+ Destinos Icônicos Incluídos</span>
                <span className="block font-normal text-white/85 text-[12px] mt-0.5">
                  Experiências Exclusivas em Helicóptero e Hospedagem.
                </span>
              </div>

              <div className="flex items-center gap-[8px] ml-[22px]">
                {[
                  { label: 'Estadia à Beira do Lago', Icon: SpotCompassIcon },
                  { label: 'Guias Especialistas', Icon: SpotUsersIcon },
                  { label: 'Rotas de Helicóptero', Icon: SpotNodesIcon },
                  { label: 'Montanhas do Canadá', Icon: SpotPinIcon },
                ].map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    onClick={() => onSpotSelect?.(label)}
                    className="w-[32px] h-[32px] rounded-full border border-white/70 text-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Icon className="w-[15px] h-[15px]" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right cluster: Aligned directly beneath the white booking card */}
            <motion.p
              style={{ width: '748px', x: rightFooterX, opacity: rightFooterOpacity }}
              className="text-[13.5px] font-normal leading-[1.52] text-[#FFFFFF] m-0 will-change-transform"
            >
              Descubra os lugares mais puros da natureza, paisagens de tirar o fôlego e o refúgio
              perfeito nas montanhas do Canadá. Viva a experiência de se hospedar à beira do lago e
              tocar o céu.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Viewport: Accessible, high-contrast responsive Hero preserving exact hierarchy */}
      <div className="min-[1440px]:hidden bg-transparent text-[#FFFFFF] px-5 pt-5 pb-12 font-dm">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 mb-10">
          <button
            type="button"
            onClick={() => onSelectNav('home', 'Home')}
            aria-label="Prism - início"
            data-testid="brand-home"
            className="flex items-center gap-2 text-white whitespace-nowrap shrink-0"
          >
            <PrismGlobeIcon className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">Prism</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBookSchedule('Hospedagem + Helicóptero')}
              data-testid="cta-book-experience"
              className="hidden min-[376px]:inline-flex min-h-11 items-center px-4 py-2 rounded-full border border-white/80 text-xs font-medium text-white whitespace-nowrap"
            >
              Reservar Experiência
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              data-testid="mobile-menu-toggle"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Menu móvel"
            data-testid="mobile-navigation"
            className={`${mobileMenuOpen ? 'grid' : 'hidden'} mb-8 border border-white/15 rounded-2xl p-4 grid-cols-2 gap-2 bg-[#090909]`}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className="text-left px-3 py-2.5 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Hero Title */}
        <div aria-hidden="true" className="font-didone font-black text-white text-center text-[clamp(2rem,12vw,4.75rem)] leading-[0.95] tracking-tight mb-8">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </div>

        <motion.h2
          style={{ x: leftSubheadX, opacity: leftSubheadOpacity }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 text-balance will-change-transform"
        >
          Uncover the World’s Natural Wonders.
        </motion.h2>

        <motion.p
          style={{ x: rightFooterX, opacity: rightFooterOpacity }}
          className="text-sm sm:text-base text-white leading-relaxed mb-7 will-change-transform"
        >
          Descubra os lugares mais puros da natureza, paisagens de tirar o fôlego e o refúgio
          perfeito nas montanhas do Canadá. Viva a experiência de se hospedar à beira do lago e tocar
          o céu.
        </motion.p>

        {/* Mobile Booking Card */}
        <motion.div
          style={{ x: rightCardX, opacity: rightCardOpacity }}
          role="group"
          aria-label="Busca rápida de experiências"
          data-testid="hero-search-form"
          className="bg-white text-[#111111] rounded-2xl p-4 space-y-3 mb-8 will-change-transform"
        >
          <div>
            <label htmlFor="mobile-location" className="block text-xs font-semibold mb-1.5 pl-1">Localização</label>
            <select
              id="mobile-location"
              value={location}
              onChange={(e) => onChangeLocation(e.target.value)}
              className="w-full h-11 px-3.5 rounded-full bg-[#F3F4F6] text-xs font-medium text-[#111111] focus:outline-none"
            >
              {LOCATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="mobile-date" className="block text-xs font-semibold mb-1.5 pl-1">Data</label>
              <select
                id="mobile-date"
                value={date}
                onChange={(e) => onChangeDate(e.target.value)}
                className="w-full h-11 px-3.5 rounded-full bg-[#F3F4F6] text-xs font-medium text-[#111111] focus:outline-none"
              >
                {DATE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="mobile-guests" className="block text-xs font-semibold mb-1.5 pl-1">Hóspedes</label>
              <select
                id="mobile-guests"
                value={guests}
                onChange={(e) => onChangeGuests(e.target.value)}
                className="w-full h-11 px-3.5 rounded-full bg-[#F3F4F6] text-xs font-medium text-[#111111] focus:outline-none"
              >
                {GUEST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onBookSchedule('Hospedagem + Helicóptero')}
            data-testid="cta-book-experience"
            className="w-full h-11 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Reservar Experiência
          </button>
        </motion.div>

        {/* Mobile Footer Strip */}
        <motion.div
          style={{ x: leftFooterX, opacity: leftFooterOpacity }}
          className="pt-4 border-t border-white/15 flex flex-col gap-2 text-xs text-white will-change-transform"
        >
          <span className="font-semibold">300+ Destinos Icônicos Incluídos</span>
          <span className="text-white/80">
            Experiências Exclusivas em Helicóptero e Hospedagem.
          </span>
        </motion.div>
      </div>
    </section>
  );
};
