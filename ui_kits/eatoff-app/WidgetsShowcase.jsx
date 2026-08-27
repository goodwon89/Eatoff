// Optional showcase — Android home widgets, rendered on a faux launcher.
// Not part of the phone frame tab bar; embedded on the index page as a bonus row.

function AndroidWidget4x2({ dark = true, state = 'fasting' }) {
  const c = eatColors(dark);
  const color = state === 'fasting' ? c.fasting : c.eating;
  const inkColor = state === 'fasting' ? '#FF7A70' : '#6EE29B';
  const label = state === 'fasting' ? 'FASTING · 16:8' : 'EATING · 16:8';
  return (
    <div style={{
      width: 320, height: 150, background: c.surface,
      borderRadius: 24, padding: '16px 18px', color: c.text,
      fontFamily: FONT_SANS, boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: inkColor }}>{label}</span>
        <span style={{ fontSize: 10, color: c.text3, fontWeight: 500 }}>Eatoff</span>
      </div>
      <div style={{
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44,
        letterSpacing: '-0.03em', lineHeight: 1, marginTop: 8,
        fontVariantNumeric: 'tabular-nums',
      }}>14:32</div>
      <div style={{ height: 4, background: c.d_track || c.border, borderRadius: 999, marginTop: 12 }}>
        <div style={{ width: '82%', height: '100%', background: color, borderRadius: 999 }}></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: c.text3, marginTop: 6 }}>
        <span>82%</span><span>목표까지 01:28</span>
      </div>
    </div>
  );
}

function AndroidWidget2x2({ dark = true, state = 'fasting' }) {
  const c = eatColors(dark);
  const color = state === 'fasting' ? c.fasting : c.eating;
  const inkColor = state === 'fasting' ? '#FF7A70' : '#6EE29B';
  return (
    <div style={{
      width: 150, height: 150, background: c.surface,
      borderRadius: 24, padding: 14, color: c.text,
      fontFamily: FONT_SANS, boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    }}>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: inkColor }}>FASTING</div>
      <div style={{
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28,
        letterSpacing: '-0.03em', lineHeight: 1, marginTop: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>14:32</div>
      <div style={{ fontSize: 10, color: c.text3, marginTop: 6 }}>남은 시간</div>
      <div style={{
        fontFamily: FONT_MONO, fontWeight: 600, fontSize: 14,
        color: c.text, fontVariantNumeric: 'tabular-nums',
      }}>01:28</div>
      <div style={{ height: 3, background: c.d_track || c.border, borderRadius: 999, marginTop: 10 }}>
        <div style={{ width: '82%', height: '100%', background: color, borderRadius: 999 }}></div>
      </div>
    </div>
  );
}

Object.assign(window, { AndroidWidget4x2, AndroidWidget2x2 });
