// Shared tokens + primitives for the landing page.
// Loaded first — all other components read from window.EAT_LP.

const EAT_LP = {
  // Light
  canvas: '#F5F5F0',
  surface: '#FFFFFF',
  surfaceAlt: '#FAFAF6',
  border: '#EAEAE3',
  borderStrong: '#D8D8D0',
  text: '#111111',
  text2: '#4A4A4A',
  text3: '#888888',
  text4: '#B8B8B0',
  fasting: '#E5342A',
  fastingInk: '#B1231B',
  fastingSoft: '#FDECEA',
  eating: '#1F9D55',
  eatingInk: '#157341',
  eatingSoft: '#E6F5EC',
  track: '#EDEDE6',

  // Dark
  d_canvas: '#0A0A0A',
  d_surface: '#111111',
  d_surfaceAlt: '#171717',
  d_border: '#1F1F1F',
  d_borderStrong: '#2A2A2A',
  d_text: '#FFFFFF',
  d_text2: '#C8C8C8',
  d_text3: '#888888',
  d_text4: '#555555',
  d_fasting: '#FF4A3D',
  d_fastingInk: '#FF7A70',
  d_fastingSoft: '#2A100E',
  d_eating: '#3BD671',
  d_eatingInk: '#6EE29B',
  d_eatingSoft: '#0E2A1A',
  d_track: '#1F1F1F',
};

function tokens(dark, eatGreenOverride) {
  const eating = eatGreenOverride || (dark ? EAT_LP.d_eating : EAT_LP.eating);
  // derive soft/ink from override for consistency
  const isCustom = !!eatGreenOverride;
  return dark ? {
    canvas: EAT_LP.d_canvas, surface: EAT_LP.d_surface, surfaceAlt: EAT_LP.d_surfaceAlt,
    border: EAT_LP.d_border, borderStrong: EAT_LP.d_borderStrong,
    text: EAT_LP.d_text, text2: EAT_LP.d_text2, text3: EAT_LP.d_text3, text4: EAT_LP.d_text4,
    fasting: EAT_LP.d_fasting, fastingInk: EAT_LP.d_fastingInk, fastingSoft: EAT_LP.d_fastingSoft,
    eating, eatingInk: isCustom ? mixHex(eating, '#FFFFFF', 0.35) : EAT_LP.d_eatingInk,
    eatingSoft: isCustom ? mixHex(eating, EAT_LP.d_canvas, 0.85) : EAT_LP.d_eatingSoft,
    track: EAT_LP.d_track, dark: true,
  } : {
    canvas: EAT_LP.canvas, surface: EAT_LP.surface, surfaceAlt: EAT_LP.surfaceAlt,
    border: EAT_LP.border, borderStrong: EAT_LP.borderStrong,
    text: EAT_LP.text, text2: EAT_LP.text2, text3: EAT_LP.text3, text4: EAT_LP.text4,
    fasting: EAT_LP.fasting, fastingInk: EAT_LP.fastingInk, fastingSoft: EAT_LP.fastingSoft,
    eating, eatingInk: isCustom ? mixHex(eating, '#000000', 0.35) : EAT_LP.eatingInk,
    eatingSoft: isCustom ? mixHex(eating, EAT_LP.canvas, 0.87) : EAT_LP.eatingSoft,
    track: EAT_LP.track, dark: false,
  };
}

function mixHex(hexA, hexB, t) {
  const a = hex2rgb(hexA), b = hex2rgb(hexB);
  const mix = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `#${mix.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}
function hex2rgb(h) {
  const c = h.replace('#','');
  return [0,2,4].map(i => parseInt(c.slice(i, i+2), 16));
}

const FONT_SANS_LP = "'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const MONO_MAP = {
  jetbrains: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  plex:      "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  space:     "'Space Mono', ui-monospace, 'SF Mono', Menlo, monospace",
};

// ── Section wrapper ─────────────────────────────────────────
function Section({ children, style = {}, dark = false, id }) {
  const c = tokens(dark);
  return (
    <section id={id} style={{
      background: c.canvas, color: c.text, position: 'relative',
      ...style,
    }}>
      {children}
    </section>
  );
}

// ── Container ───────────────────────────────────────────────
function Container({ children, style = {}, max = 1200 }) {
  return (
    <div style={{
      maxWidth: max, margin: '0 auto', padding: '0 32px',
      ...style,
    }}>{children}</div>
  );
}

// ── Eyebrow label ───────────────────────────────────────────
function Eyebrow({ children, color, dark = false }) {
  const c = tokens(dark);
  return (
    <div style={{
      fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: color || c.text3,
    }}>{children}</div>
  );
}

// ── Big split heading — English + Korean ────────────────────
function SplitHeading({ en, kr, dark = false, size = 'lg' }) {
  const c = tokens(dark);
  const sizes = {
    md: { en: 48, kr: 24 },
    lg: { en: 72, kr: 28 },
    xl: { en: 96, kr: 32 },
  };
  const s = sizes[size] || sizes.lg;
  return (
    <div>
      <h2 style={{
        fontFamily: FONT_SANS_LP,
        fontSize: s.en, fontWeight: 700,
        letterSpacing: '-0.035em', lineHeight: 1,
        color: c.text, margin: 0,
      }}>{en}</h2>
      <div style={{
        fontFamily: FONT_SANS_LP,
        fontSize: s.kr, fontWeight: 500,
        letterSpacing: '-0.01em',
        color: c.text3, marginTop: 12,
      }}>{kr}</div>
    </div>
  );
}

// ── Primary CTA — play-store style ──────────────────────────
function PlayStoreBadge({ dark = false, big = false }) {
  return (
    <a href="#" style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: big ? '14px 22px' : '10px 16px', borderRadius: 12,
      background: '#000', color: '#FFF', textDecoration: 'none',
      fontFamily: FONT_SANS_LP,
    }}>
      <svg width={big ? 26 : 22} height={big ? 26 : 22} viewBox="0 0 24 24" fill="#FFF">
        <path d="M3.6 2.4c-.3.3-.5.7-.5 1.3v16.6c0 .6.2 1 .5 1.3l.1.1L13.2 12v-.2L3.7 2.3l-.1.1z"/>
        <path d="M16.4 15.2l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2z" fill="#FFC107"/>
        <path d="M16.5 15.1L13.2 12 3.6 21.6c.4.4 1 .4 1.7.1l11.2-6.6" fill="#E5342A"/>
        <path d="M16.5 8.9L5.3 2.3c-.7-.4-1.3-.3-1.7.1L13.2 12l3.3-3.1z" fill="#1F9D55"/>
      </svg>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: big ? 10 : 9, fontWeight: 400, opacity: 0.9 }}>GET IT ON</div>
        <div style={{ fontSize: big ? 18 : 15, fontWeight: 600 }}>Google Play</div>
      </div>
    </a>
  );
}

// ── Ghost Button ────────────────────────────────────────────
function GhostBtn({ children, onClick, dark = false }) {
  const c = tokens(dark);
  return (
    <button onClick={onClick} style={{
      padding: '12px 20px', borderRadius: 999,
      border: `1px solid ${c.border}`, background: c.surface, color: c.text,
      fontFamily: FONT_SANS_LP, fontWeight: 600, fontSize: 14,
      cursor: 'pointer', transition: 'opacity 200ms',
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
    onMouseLeave={e => e.currentTarget.style.opacity = 1}
    >{children}</button>
  );
}

// ── Logo Mark (SVG) ─────────────────────────────────────────
function LogoMark({ size = 32, dark = false }) {
  const c = tokens(dark);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
      <circle cx="32" cy="32" r="24" stroke={c.border} strokeWidth="6" fill="none"/>
      <path d="M 32 8 A 24 24 0 0 1 32 56" stroke={c.eating} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M 32 8 A 24 24 0 0 0 32 56" stroke={c.fasting} strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

Object.assign(window, {
  EAT_LP, tokens, mixHex, FONT_SANS_LP, MONO_MAP,
  Section, Container, Eyebrow, SplitHeading, PlayStoreBadge, GhostBtn, LogoMark,
});
