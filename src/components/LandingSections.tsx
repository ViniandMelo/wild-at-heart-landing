import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Compass, Download, ShieldCheck, Sparkles, Utensils, Waves } from 'lucide-react';
import helicopterImage from '../assets/images/imagens-site-wild/b88cbf0757327972cb3b9542071a1667.jpg';
import alpineImage from '../assets/images/imagens-site-wild/b7626e43f237d3a0ebe397ef2cb8518f.jpg';
import hotelImage from '../assets/images/imagens-site-wild/2961e82311db412b3466b28fbcc4bb9a.jpg';
import { PrismGlobeIcon } from './BannerIcons';

interface LandingSectionsProps {
  onBookPackage: (packageType: string) => void;
}

interface LandingFooterProps {
  onExport4kBanner: () => void;
  isExporting: boolean;
}

const HOTEL_HIGHLIGHTS = [
  {
    title: 'Estadia à Beira do Lago',
    description:
      'Quartos e chalés com vistas panorâmicas incomparáveis para as águas e florestas.',
    Icon: Waves,
  },
  {
    title: 'Gastronomia Local',
    description:
      'Sabores autênticos inspirados na culinária canadense com ingredientes frescos da região.',
    Icon: Utensils,
  },
  {
    title: 'Tranquilidade Absoluta',
    description:
      'Um refúgio privativo pensado para proporcionar descanso profundo e aventura na medida certa.',
    Icon: Sparkles,
  },
];

const HELI_HIGHLIGHTS = [
  {
    title: 'Glaciares de Cima',
    description:
      'Contemple de perto as formações de gelo ancestral e rios azuis esculpidos nas montanhas.',
    Icon: Compass,
  },
  {
    title: 'Panorâmica do Lago',
    description:
      'Vista aérea espetacular do Wild at Heart Lake Hotel e de toda a bacia hidrográfica ao redor.',
    Icon: ArrowUpRight,
  },
  {
    title: 'Segurança e Conforto',
    description:
      'Aeronaves modernas e pilotos experientes garantindo um voo suave, seguro e repleto de paisagens fotográficas.',
    Icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Ficar no Wild at Heart Lake Hotel já era um sonho, mas fazer o passeio de helicóptero para ver o glaciar de cima superou absolutamente todas as expectativas. É de tirar o fôlego!',
    author: 'Mariana S.',
    context: 'Hospedagem & Sobrevoo Glaciar · Canadá',
  },
  {
    quote:
      'A organização da viagem é impecável. O conforto do hotel aliado à aventura de sobrevoar as montanhas canadenses faz desta uma experiência de vida obrigatória.',
    author: 'Carlos E.',
    context: 'Pacote Completo Lago & Montanhas',
  },
];

export const LandingSections: React.FC<LandingSectionsProps> = ({
  onBookPackage,
}) => {
  const testimonialsRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
    offset: ['start 18%', 'end start'],
  });

  // Top header row: Title slides left, supporting paragraph slides right
  const testiTitleX = useTransform(
    testimonialsProgress,
    [0, 0.55],
    [0, shouldReduceMotion ? 0 : -380]
  );
  const testiTitleOpacity = useTransform(testimonialsProgress, [0, 0.45], [1, 0]);

  const testiDescX = useTransform(
    testimonialsProgress,
    [0, 0.55],
    [0, shouldReduceMotion ? 0 : 380]
  );
  const testiDescOpacity = useTransform(testimonialsProgress, [0, 0.45], [1, 0]);

  // Cards row: Left card (Mariana S.) slides left, Right card (Carlos E.) slides right
  const cardLeftX = useTransform(
    testimonialsProgress,
    [0.1, 0.72],
    [0, shouldReduceMotion ? 0 : -440]
  );
  const cardLeftOpacity = useTransform(testimonialsProgress, [0.1, 0.62], [1, 0]);

  const cardRightX = useTransform(
    testimonialsProgress,
    [0.1, 0.72],
    [0, shouldReduceMotion ? 0 : 440]
  );
  const cardRightOpacity = useTransform(testimonialsProgress, [0.1, 0.62], [1, 0]);

  return (
    <div className="bg-[#000000] text-[#FFFFFF] font-dm">
      {/* Seção 2: Sobre o Destino & O Hotel */}
      <section
        id="sobre"
        tabIndex={-1}
        aria-labelledby="about-title"
        data-testid="hotel-section"
        className="border-t border-white/12 py-20 lg:py-28 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto"
      >
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Coluna Editorial */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-white/65 mb-4">
                Sobre o Destino &amp; O Hotel
              </p>
              <h2 id="about-title" className="font-didone font-black text-white text-[clamp(2rem,4vw,3.35rem)] leading-[1.06] tracking-tight text-balance mb-6">
                Onde o Luxo Encontra a Natureza Intocada
              </h2>
              <p className="text-base sm:text-[17px] text-white/90 leading-[1.65] max-w-xl mb-10">
                O Wild at Heart Lake Hotel é o seu santuário particular nas profundezas das
                paisagens deslumbrantes do Canadá. Desperte com o reflexo das montanhas nas águas
                cristalinas do lago, desfrute de acomodações sofisticadas que respeitam o meio
                ambiente e desconecte-se do mundo exterior para se reconectar com o que importa.
              </p>
            </div>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {HOTEL_HIGHLIGHTS.map(({ title, description, Icon }) => (
                <div key={title} className="py-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <Icon className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem do Hotel à Beira do Lago */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[340px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-neutral-950">
              <img
                src={hotelImage}
                alt="Hotel às margens de um lago glacial, cercado por montanhas e floresta canadense"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                <p className="text-xs text-white/80">
                  Santuário Alpino · Rochosas Canadenses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3: A Experiência de Helicóptero (O Sobrevoo) */}
      <section
        id="experiencias"
        tabIndex={-1}
        aria-labelledby="experiences-title"
        data-testid="experiences-section"
        className="border-t border-white/12 py-20 lg:py-28 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto"
      >
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Imagem do Helicóptero sobre Glaciares */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex">
            <div className="relative w-full min-h-[340px] lg:h-full rounded-2xl overflow-hidden border border-white/15 bg-neutral-950">
              <img
                src={helicopterImage}
                alt="Vista aérea de um lago glacial cercado por floresta e montanhas das Rochosas canadenses"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                <p className="text-xs text-white/80">
                  Sobrevoo Privativo · Partida Direta da Região do Hotel
                </p>
              </div>
            </div>
          </div>

          {/* Coluna Editorial do Sobrevoo */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-white/65 mb-4">
                A Experiência de Helicóptero
              </p>
              <h2 id="experiences-title" className="font-didone font-black text-white text-[clamp(2rem,4vw,3.35rem)] leading-[1.06] tracking-tight text-balance mb-6">
                Voe Alto: O Canadá Visto dos Céus
              </h2>
              <p className="text-base sm:text-[17px] text-white/90 leading-[1.65] max-w-xl mb-10">
                Eleve sua viagem a outro patamar com o nosso tour panorâmico de helicóptero
                partindo diretamente da região do hotel. Sinta a emoção de sobrevoar vales
                profundos, paredões rochosos imponentes e geleiras milenares cintilantes. Uma
                perspectiva inesquecível que apenas poucos têm o privilégio de vivenciar.
              </p>
            </div>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {HELI_HIGHLIGHTS.map(({ title, description, Icon }) => (
                <div key={title} className="py-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <Icon className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Depoimentos */}
      <section
        ref={testimonialsRef}
        id="depoimentos"
        tabIndex={-1}
        aria-labelledby="testimonials-title"
        data-testid="testimonials-section"
        className="border-t border-white/12 py-20 lg:py-28 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto overflow-x-clip"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            style={{ x: testiTitleX, opacity: testiTitleOpacity }}
            className="will-change-transform"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-white/65 mb-4">
              Depoimentos
            </p>
            <h2 id="testimonials-title" className="font-didone font-black text-white text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] tracking-tight text-balance">
              Histórias de Quem Já Viveu Esse Sonho
            </h2>
          </motion.div>
          <motion.p
            style={{ x: testiDescX, opacity: testiDescOpacity }}
            className="text-sm text-white/75 max-w-sm will-change-transform"
          >
            Relatos reais de viajantes que combinaram a serenidade do lago com o sobrevoo pelos
            glaciares canadenses.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.blockquote
                key={item.author}
                data-testid="testimonial-card"
                style={{
                  x: isLeft ? cardLeftX : cardRightX,
                  opacity: isLeft ? cardLeftOpacity : cardRightOpacity,
                }}
                className="rounded-2xl border border-white/15 bg-[#080808] p-8 sm:p-10 flex flex-col justify-between gap-8 will-change-transform"
              >
                <p className="text-lg sm:text-xl text-white leading-[1.55] font-normal">
                  “{item.quote}”
                </p>
                <footer className="pt-6 border-t border-white/12 flex items-center justify-between gap-4">
                  <div>
                    <cite className="not-italic font-semibold text-base text-white block">
                      {item.author}
                    </cite>
                    <span className="text-xs text-white/70">{item.context}</span>
                  </div>
                </footer>
              </motion.blockquote>
            );
          })}
        </div>
      </section>

      {/* Seção 5: Chamada para Ação Final (CTA) */}
      <section
        id="contato"
        tabIndex={-1}
        aria-labelledby="contact-title"
        data-testid="contact-section"
        className="border-t border-white/12 py-16 lg:py-24 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#050505]">
          <img
            src={alpineImage}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/55"
            aria-hidden="true"
          />

          <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-white/75 mb-4">
              Temporada Exclusiva · Vagas Limitadas
            </p>
            <h2 id="contact-title" className="font-didone font-black text-white text-[clamp(2rem,4.2vw,3.45rem)] leading-[1.06] tracking-tight text-balance mb-6">
              Pronto para Desbravar as Maravilhas do Canadá?
            </h2>
            <p className="text-base sm:text-[17px] text-white/90 leading-[1.65] mb-10 max-w-2xl">
              As vagas para a temporada de passeios de helicóptero e hospedagem no Wild at Heart
              Lake Hotel são limitadas para preservar a exclusividade e a tranquilidade do local.
              Garanta o seu lugar agora mesmo.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onBookPackage('Pacote Completo: Hospedagem + Helicóptero')}
                data-testid="cta-book-flight"
                className="h-12 px-7 rounded-full bg-[#FFFFFF] text-[#000000] text-sm font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2.5 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Garantir Minha Viagem Completa</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onExport4kBanner,
  isExporting,
}) => (
  <footer
    data-testid="site-footer"
    className="border-t border-white/12 py-10 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto bg-[#000000] text-white"
  >
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <PrismGlobeIcon className="w-7 h-7" />
        <span className="font-bold text-lg text-white tracking-tight">Prism</span>
        <span className="text-white/40" aria-hidden="true">·</span>
        <span className="text-sm text-white/75">Wild at Heart Lake Hotel, Canadá</span>
      </div>

      <nav aria-label="Navegação do rodapé" className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-white/75">
        <a href="#home" className="min-h-11 hover:text-white transition-colors whitespace-nowrap">Home</a>
        <a href="#sobre" className="min-h-11 hover:text-white transition-colors whitespace-nowrap">Sobre o Hotel</a>
        <a href="#experiencias" className="min-h-11 hover:text-white transition-colors whitespace-nowrap">Helicóptero</a>
        <a href="#depoimentos" className="min-h-11 hover:text-white transition-colors whitespace-nowrap">Depoimentos</a>
        <button
          type="button"
          onClick={onExport4kBanner}
          disabled={isExporting}
          data-testid="export-banner"
          className="min-h-11 inline-flex items-center gap-1.5 text-white hover:underline underline-offset-4 cursor-pointer disabled:opacity-60 whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isExporting ? 'Exportando 4K...' : 'Exportar Banner 4K'}</span>
        </button>
      </nav>
    </div>
  </footer>
);
