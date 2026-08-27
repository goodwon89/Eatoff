// Eatoff shared UI primitives
// Load AFTER android_frame.jsx.

const EAT = {
  canvas: '#F5F5F0',
  surface: '#FFFFFF',
  surfaceAlt: '#FAFAF6',
  border: '#EAEAE3',
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
  // dark
  d_canvas: '#0A0A0A',
  d_surface: '#111111',
  d_surfaceAlt: '#171717',
  d_border: '#1F1F1F',
  d_text: '#FFFFFF',
  d_text2: '#C8C8C8',
  d_text3: '#888888',
  d_fasting: '#FF4A3D',
  d_eating: '#3BD671',
  d_track: '#1F1F1F',
};

// Colors resolver based on dark mode
function eatColors(dark) {
  return dark ? {
    canvas: EAT.d_canvas, surface: EAT.d_surface, surfaceAlt: EAT.d_surfaceAlt,
    border: EAT.d_border, text: EAT.d_text, text2: EAT.d_text2, text3: EAT.d_text3,
    text4: EAT.text4, fasting: EAT.d_fasting, fastingInk: '#FF7A70', fastingSoft: '#2A100E',
    eating: EAT.d_eating, eatingInk: '#6EE29B', eatingSoft: '#0E2A1A', track: EAT.d_track,
  } : {
    canvas: EAT.canvas, surface: EAT.surface, surfaceAlt: EAT.surfaceAlt,
    border: EAT.border, text: EAT.text, text2: EAT.text2, text3: EAT.text3,
    text4: EAT.text4, fasting: EAT.fasting, fastingInk: EAT.fastingInk, fastingSoft: EAT.fastingSoft,
    eating: EAT.eating, eatingInk: EAT.eatingInk, eatingSoft: EAT.eatingSoft, track: EAT.track,
  };
}

const FONT_SANS = "'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// ── Timer Ring ──────────────────────────────────────────────
function TimerRing({ size = 260, stroke = 12, progress = 0.5, state = 'fasting', dark = false, children }) {
  const c = eatColors(dark);
  const color = state === 'fasting' ? c.fasting : c.eating;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - progress);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} stroke={c.track} strokeWidth={stroke} fill="none"/>
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1), stroke 360ms' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    </div>
  );
}

// ── Pill Chip ───────────────────────────────────────────────
function Chip({ children, active = false, onClick, dark = false }) {
  const c = eatColors(dark);
  return (
    <button onClick={onClick} style={{
      padding: '9px 16px', borderRadius: 999,
      border: `1px solid ${active ? c.text : c.border}`,
      background: active ? c.text : c.surface,
      color: active ? c.surface : c.text,
      fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500,
      cursor: 'pointer', letterSpacing: '-0.005em',
    }}>{children}</button>
  );
}

// ── Big CTA ─────────────────────────────────────────────────
function StateButton({ state = 'fasting', onClick, dark = false, children }) {
  const c = eatColors(dark);
  const bg = state === 'fasting' ? c.fasting : c.eating;
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      width: '100%', height: 60, border: 0, borderRadius: 999,
      background: bg, color: '#FFF',
      fontFamily: FONT_SANS, fontWeight: 600, fontSize: 16,
      letterSpacing: '-0.01em', cursor: 'pointer',
      boxShadow: `0 8px 24px ${bg}30`,
    }}>{children}</button>
  );
}

// ── Card ────────────────────────────────────────────────────
function Card({ children, style = {}, dark = false, padding = 16 }) {
  const c = eatColors(dark);
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`,
      borderRadius: 16, padding, ...style,
    }}>{children}</div>
  );
}

// ── Screen Frame — the phone content area ───────────────────
function Screen({ children, dark = false, tab, onTab }) {
  const c = eatColors(dark);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: c.canvas, fontFamily: FONT_SANS, color: c.text,
    }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {children}
      </div>
      <BottomTabBar current={tab} onTab={onTab} dark={dark} />
    </div>
  );
}

// ── Bottom Tab Bar ──────────────────────────────────────────
function BottomTabBar({ current = 'home', onTab, dark = false }) {
  const c = eatColors(dark);
  const items = [
    { id: 'home',    icon: 'timer',              label: '홈' },
    { id: 'plans',   icon: 'calendar-days',      label: '플랜' },
    { id: 'history', icon: 'bar-chart-3',        label: '기록' },
    { id: 'settings',icon: 'settings',           label: '설정' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around',
      background: c.surface, borderTop: `1px solid ${c.border}`,
      padding: '10px 8px 6px',
    }}>
      {items.map(it => {
        const active = current === it.id;
        return (
          <button key={it.id} onClick={() => onTab?.(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, background: 'transparent', border: 0, cursor: 'pointer',
            padding: '4px 10px', color: active ? c.text : c.text3,
          }}>
            <i data-lucide={it.icon} style={{ width: 22, height: 22 }}></i>
            <span style={{ fontSize: 11, fontWeight: active ? 600 : 500, fontFamily: FONT_SANS }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Section Header ──────────────────────────────────────────
function SectionHeader({ title, action, dark = false }) {
  const c = eatColors(dark);
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '20px 24px 12px',
    }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: c.text, letterSpacing: '-0.01em' }}>{title}</span>
      {action && <span style={{ fontSize: 13, color: c.text3, fontWeight: 500 }}>{action}</span>}
    </div>
  );
}

Object.assign(window, {
  EAT, eatColors, FONT_SANS, FONT_MONO,
  TimerRing, Chip, StateButton, Card, Screen, BottomTabBar, SectionHeader,
});
