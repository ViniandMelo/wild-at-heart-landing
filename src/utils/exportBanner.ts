export interface BannerExportOptions {
  titleLine1: string;
  titleLine2: string;
  location: string;
  date: string;
  guests: string;
  width: number;
  height: number;
}

const LOGICAL_W = 1440;
const LOGICAL_H = 810;

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function loadSvgImage(svgMarkup: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

const PRISM_MARK_SVG = `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="19" r="12.5" fill="#FFFFFF"/>
  <path d="M12.5 11.5C14.2 10.3 16.5 10.6 17.5 12.1C18.3 13.3 17.2 14.8 15.8 15.3C14.4 15.8 13.8 17.2 14.4 18.4C15.1 19.7 13.9 21.4 12.2 21.1C10.5 20.8 9.2 19.1 9.5 17.1C9.8 15.1 10.9 12.6 12.5 11.5Z" fill="#000000"/>
  <path d="M22.2 13.2C24.1 13.4 26.2 14.9 26.9 17.1C27.6 19.2 26.8 22.1 25.1 23.6C23.7 24.8 21.8 24.4 21.3 22.8C20.8 21.2 21.9 19.6 20.9 18.2C19.8 16.7 20.2 13.0 22.2 13.2Z" fill="#000000"/>
  <path d="M5.2 27.6C8.6 24.4 13.8 20.6 19.8 16.8L17.9 12.2L20.1 11.3L23.5 14.8L27.9 12.3C29.1 11.6 30.4 12.0 30.8 12.8C31.2 13.6 30.7 14.8 29.4 15.6L25.0 18.1L25.6 22.9L23.4 24.0L21.3 19.6C16.2 22.7 10.8 26.2 6.8 29.2L5.2 27.6Z" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="24" cy="7.5" r="2.2" fill="#000000" stroke="#FFFFFF" stroke-width="1.4"/>
</svg>`;

const ARROW_UP_RIGHT_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`;
const PIN_DARK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
const CALENDAR_DARK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
const USERS_DARK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const CHEVRON_DARK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>`;

const SPOT_ICONS_SVG = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v4M12 17v4M4.2 7.5l3.5 2M16.3 14.5l3.5 2M4.2 16.5l3.5-2M16.3 9.5l3.5-2"/><circle cx="12" cy="12" r="3"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3.5 3.5 0 0 1 0 6.74"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.3 10.8l7.4-4.6M8.3 13.2l7.4 4.6"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
];

async function ensureFontsLoaded() {
  await Promise.all([
    document.fonts.load('900 154px "Playfair Display"'),
    document.fonts.load('400 15px "DM Sans"'),
    document.fonts.load('500 15px "DM Sans"'),
    document.fonts.load('600 15px "DM Sans"'),
    document.fonts.load('700 40px "DM Sans"'),
  ]);
  await document.fonts.ready;
}

export async function exportBannerPng(options: BannerExportOptions): Promise<void> {
  await ensureFontsLoaded();

  const { width, height, titleLine1, titleLine2, location, date, guests } = options;
  const scale = width / LOGICAL_W;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.scale(scale, scale);

  // 1. Solid flat pure black background (#000000)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  const [
    brandMarkImage,
    arrowImg,
    pinImg,
    calendarImg,
    usersImg,
    chevronImg,
    ...spotImgs
  ] = await Promise.all([
    loadSvgImage(PRISM_MARK_SVG),
    loadSvgImage(ARROW_UP_RIGHT_SVG),
    loadSvgImage(PIN_DARK_SVG),
    loadSvgImage(CALENDAR_DARK_SVG),
    loadSvgImage(USERS_DARK_SVG),
    loadSvgImage(CHEVRON_DARK_SVG),
    ...SPOT_ICONS_SVG.map(loadSvgImage),
  ]);

  // 2. Top Navigation Bar
  ctx.drawImage(brandMarkImage, 112, 34, 34, 34);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px "DM Sans", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText('Prism', 155, 51);

  const navItems = ['Home', 'Destinos', 'Sobre', 'Experiências', 'Contato', 'Reservar Voo'];
  ctx.font = '400 14px "DM Sans", sans-serif';
  const navGap = 32;
  const navWidths = navItems.map((item) => ctx.measureText(item).width);
  const totalNavWidth = navWidths.reduce((a, b) => a + b, 0) + navGap * (navItems.length - 1);
  let navX = (LOGICAL_W - totalNavWidth) / 2 - 14;
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < navItems.length; i++) {
    ctx.fillText(navItems[i], navX, 51);
    navX += navWidths[i] + navGap;
  }

  const headerBtnW = 186;
  const headerBtnH = 44;
  const circleSize = 44;
  const circleX = 1328 - circleSize;
  const headerBtnX = circleX - 6 - headerBtnW;
  const headerBtnY = 29;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
  ctx.lineWidth = 1.15;
  drawRoundedRect(ctx, headerBtnX, headerBtnY, headerBtnW, headerBtnH, 22);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 14px "DM Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Reservar Experiência', headerBtnX + headerBtnW / 2, headerBtnY + headerBtnH / 2 + 0.5);

  ctx.beginPath();
  ctx.arc(circleX + circleSize / 2, headerBtnY + circleSize / 2, circleSize / 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.drawImage(arrowImg, circleX + 13, headerBtnY + 13, 18, 18);

  // 3. Hero Display Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 154px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '-2.5px';
  }
  ctx.fillText(titleLine1, LOGICAL_W / 2, 278);
  ctx.fillText(titleLine2, LOGICAL_W / 2, 422);
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
  }

  // 4. Middle Section
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 40px "DM Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '-0.8px';
  }
  ctx.fillText('Uncover the World’s', 112, 546);
  ctx.fillText('Natural Wonders.', 112, 594);
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
  }

  const cardX = 580;
  const cardY = 496;
  const cardW = 748;
  const cardH = 126;
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 22);
  ctx.fill();

  const innerPadX = 22;
  const colGap = 10;
  const pillY = cardY + 56;
  const pillH = 46;
  const labelY = cardY + 38;

  const col1X = cardX + innerPadX;
  const col1W = 240;
  const col2X = col1X + col1W + colGap;
  const col2W = 144;
  const col3X = col2X + col2W + colGap;
  const col3W = 128;
  const col4X = col3X + col3W + colGap;
  const col4W = cardX + cardW - innerPadX - col4X;

  ctx.fillStyle = '#111111';
  ctx.font = '600 12.5px "DM Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Localização', col1X + 4, labelY);
  ctx.fillText('Data', col2X + 4, labelY);
  ctx.fillText('Hóspedes', col3X + 4, labelY);

  ctx.fillStyle = '#F3F4F6';
  drawRoundedRect(ctx, col1X, pillY, col1W, pillH, 23);
  ctx.fill();
  drawRoundedRect(ctx, col2X, pillY, col2W, pillH, 23);
  ctx.fill();
  drawRoundedRect(ctx, col3X, pillY, col3W, pillH, 23);
  ctx.fill();

  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#111111';
  ctx.font = '500 12.5px "DM Sans", sans-serif';

  ctx.drawImage(pinImg, col1X + 12, pillY + 15.5, 15, 15);
  ctx.fillText(location, col1X + 33, pillY + pillH / 2 + 0.5, col1W - 44);

  ctx.drawImage(calendarImg, col2X + 12, pillY + 15.5, 15, 15);
  ctx.fillText(date, col2X + 33, pillY + pillH / 2 + 0.5, col2W - 42);

  ctx.drawImage(usersImg, col3X + 12, pillY + 15.5, 15, 15);
  ctx.fillText(guests, col3X + 32, pillY + pillH / 2 + 0.5, col3W - 54);
  ctx.drawImage(chevronImg, col3X + col3W - 22, pillY + 16.5, 13, 13);

  ctx.fillStyle = '#000000';
  drawRoundedRect(ctx, col4X, pillY, col4W, pillH, 23);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 12.5px "DM Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Reservar Experiência', col4X + col4W / 2, pillY + pillH / 2 + 0.5);

  // 5. Bottom Footer Row
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 13px "DM Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('300+ Destinos Icônicos Incluídos', 112, 725);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '400 12px "DM Sans", sans-serif';
  ctx.fillText('Experiências Exclusivas em Helicóptero e Hospedagem.', 112, 745);

  const badgeStartX = 420;
  const badgeY = 716;
  const badgeSize = 32;
  const badgeGap = 8;
  for (let i = 0; i < 4; i++) {
    const bx = badgeStartX + i * (badgeSize + badgeGap);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(bx + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.drawImage(spotImgs[i], bx + 8.5, badgeY + 8.5, 15, 15);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '400 13.5px "DM Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(
    'Descubra os lugares mais puros da natureza, paisagens de tirar o fôlego e o refúgio perfeito nas montanhas do',
    580,
    725
  );
  ctx.fillText(
    'Canadá. Viva a experiência de se hospedar à beira do lago e tocar o céu.',
    580,
    746
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png', 1.0)
  );
  if (!blob) throw new Error('Failed to encode PNG');

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const slug = `${titleLine1}-${titleLine2}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.href = url;
  link.download = `${slug}-${width}x${height}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportBannerSvg(options: BannerExportOptions): void {
  const { titleLine1, titleLine2, location, date, guests } = options;

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 810" width="3840" height="2160">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Playfair+Display:wght@900&amp;display=swap');
      .didone { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; fill: #FFFFFF; }
      .dm { font-family: 'DM Sans', -apple-system, sans-serif; }
    </style>
  </defs>

  <rect width="1440" height="810" fill="#000000"/>

  <g transform="translate(112, 34)">
    <svg width="34" height="34" viewBox="0 0 36 36">
      <circle cx="18" cy="19" r="12.5" fill="#FFFFFF"/>
      <path d="M12.5 11.5C14.2 10.3 16.5 10.6 17.5 12.1C18.3 13.3 17.2 14.8 15.8 15.3C14.4 15.8 13.8 17.2 14.4 18.4C15.1 19.7 13.9 21.4 12.2 21.1C10.5 20.8 9.2 19.1 9.5 17.1C9.8 15.1 10.9 12.6 12.5 11.5Z" fill="#000000"/>
      <path d="M22.2 13.2C24.1 13.4 26.2 14.9 26.9 17.1C27.6 19.2 26.8 22.1 25.1 23.6C23.7 24.8 21.8 24.4 21.3 22.8C20.8 21.2 21.9 19.6 20.9 18.2C19.8 16.7 20.2 13.0 22.2 13.2Z" fill="#000000"/>
      <path d="M5.2 27.6C8.6 24.4 13.8 20.6 19.8 16.8L17.9 12.2L20.1 11.3L23.5 14.8L27.9 12.3C29.1 11.6 30.4 12.0 30.8 12.8C31.2 13.6 30.7 14.8 29.4 15.6L25.0 18.1L25.6 22.9L23.4 24.0L21.3 19.6C16.2 22.7 10.8 26.2 6.8 29.2L5.2 27.6Z" fill="#FFFFFF" stroke="#000000" stroke-width="1.2" stroke-linejoin="round"/>
      <circle cx="24" cy="7.5" r="2.2" fill="#000000" stroke="#FFFFFF" stroke-width="1.4"/>
    </svg>
    <text x="43" y="23" class="dm" font-size="22" font-weight="700" fill="#FFFFFF" letter-spacing="-0.4">Prism</text>
  </g>

  <g class="dm" font-size="14" font-weight="400" fill="#FFFFFF" text-anchor="middle">
    <text x="460" y="56">Home</text>
    <text x="536" y="56">Destinos</text>
    <text x="610" y="56">Sobre</text>
    <text x="692" y="56">Experiências</text>
    <text x="782" y="56">Contato</text>
    <text x="874" y="56">Reservar Voo</text>
  </g>

  <g>
    <rect x="1092" y="29" width="186" height="44" rx="22" fill="none" stroke="#FFFFFF" stroke-opacity="0.88" stroke-width="1.15"/>
    <text x="1185" y="55" class="dm" font-size="14" font-weight="500" fill="#FFFFFF" text-anchor="middle">Reservar Experiência</text>
    <circle cx="1306" cy="51" r="22" fill="none" stroke="#FFFFFF" stroke-opacity="0.88" stroke-width="1.15"/>
    <path d="M1301 56L1311 46M1301 46h10v10" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <text x="720" y="278" class="didone" font-size="154" text-anchor="middle" letter-spacing="-2.5">${esc(titleLine1)}</text>
  <text x="720" y="422" class="didone" font-size="154" text-anchor="middle" letter-spacing="-2.5">${esc(titleLine2)}</text>

  <text x="112" y="546" class="dm" font-size="40" font-weight="700" fill="#FFFFFF" letter-spacing="-0.8">Uncover the World’s</text>
  <text x="112" y="594" class="dm" font-size="40" font-weight="700" fill="#FFFFFF" letter-spacing="-0.8">Natural Wonders.</text>

  <rect x="580" y="496" width="748" height="126" rx="22" fill="#FFFFFF"/>
  <g class="dm" fill="#111111">
    <text x="606" y="534" font-size="12.5" font-weight="600">Localização</text>
    <text x="862" y="534" font-size="12.5" font-weight="600">Data</text>
    <text x="1020" y="534" font-size="12.5" font-weight="600">Hóspedes</text>

    <rect x="602" y="552" width="246" height="46" rx="23" fill="#F3F4F6"/>
    <text x="635" y="579" font-size="12.5" font-weight="500">${esc(location)}</text>

    <rect x="858" y="552" width="148" height="46" rx="23" fill="#F3F4F6"/>
    <text x="891" y="579" font-size="12.5" font-weight="500">${esc(date)}</text>

    <rect x="1016" y="552" width="116" height="46" rx="23" fill="#F3F4F6"/>
    <text x="1048" y="579" font-size="12.5" font-weight="500">${esc(guests)}</text>

    <rect x="1142" y="552" width="164" height="46" rx="23" fill="#000000"/>
    <text x="1224" y="579" font-size="12.5" font-weight="500" fill="#FFFFFF" text-anchor="middle">Reservar Experiência</text>
  </g>

  <text x="112" y="725" class="dm" font-size="13" font-weight="600" fill="#FFFFFF">300+ Destinos Icônicos Incluídos</text>
  <text x="112" y="745" class="dm" font-size="12" font-weight="400" fill="#FFFFFF" fill-opacity="0.85">Experiências Exclusivas em Helicóptero e Hospedagem.</text>

  <text x="580" y="725" class="dm" font-size="13.5" font-weight="400" fill="#FFFFFF">Descubra os lugares mais puros da natureza, paisagens de tirar o fôlego e o refúgio perfeito nas montanhas do</text>
  <text x="580" y="746" class="dm" font-size="13.5" font-weight="400" fill="#FFFFFF">Canadá. Viva a experiência de se hospedar à beira do lago e tocar o céu.</text>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const slug = `${titleLine1}-${titleLine2}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.href = url;
  link.download = `${slug}-vector.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
