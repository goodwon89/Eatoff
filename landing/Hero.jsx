// Hero — Living Timer.
// Big circular ring behind content. Timer digit counts up in real time.
// Scroll drives fasting <-> eating color transition.

function useTicker(startMs) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return Math.floor((now - startMs) / 1000);
}

function useScrollProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const heroH = window.innerHeight;
      setP(Math.max(0, Math.min(1, window.scrollY / heroH)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

function Hero({ dark, mono, timerScale, headline }) {
  const c = tokens(dark);
  // Simulated fasting session — started 14h 32m ago
  const baseElapsed = 14 * 3600 + 32 * 60;
  const tick = useTicker(Date.now() - baseElapsed * 1000);
  const scrollP = useScrollProgress();
  const targetSec = 16 * 3600;
  const progress = Math.min(1, tick / targetSec);

  // Scroll-driven state transition (past 30% into hero, cross-fade to eating)
  const transitionT = Math.max(0, Math.min(1, (scrollP - 0.4) * 3));
  const [state, setState] = React.useState('fasting');
  React.useEffect(() => {
    setState(transitionT > 0.5 ? 'eating' : 'fasting');
  }, [transitionT]);
  const ringColor = state === 'fasting' ? c.fasting : c.eating;

  const h = Math.floor(tick / 3600);
  const m = Math.floor((tick % 3600) / 60);
  const s = tick % 60;

  const size = 720;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - progress);

  const timerFontSize = {
    sm: 140, md: 200, lg: 260,
  }[timerScale] || 200;

  return (
    <div id="top" style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: c.canvas,
    }}>
      {/* Giant timer ring — decorative, behind text */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '52%',
        transform: 'translate(-50%, -50%)',
        width: size, height: size,
        opacity: dark ? 0.7 : 0.85,
        pointerEvents: 'none',
      }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r}
            stroke={c.track} strokeWidth={stroke} fill="none"/>
          <circle cx={size/2} cy={size/2} r={r}
            stroke={ringColor} strokeWidth={stroke} fill="none"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
            style={{ transition: 'stroke 600ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 600ms linear' }}
          />
        </svg>
      </div>

      {/* Hero content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        minHeight: '100vh',
        padding: '140px 32px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 40,
        alignItems: 'center',
        fontFamily: FONT_SANS_LP,
      }}>
        {/* Left: headline + copy */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: state === 'fasting' ? c.fastingSoft : c.eatingSoft,
            color: state === 'fasting' ? c.fastingInk : c.eatingInk,
            transition: 'all 600ms',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999, background: ringColor,
              animation: 'eat-pulse 2.2s infinite',
              transition: 'background 600ms',
            }}></span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em' }}>
              LIVE · {state === 'fasting' ? 'FASTING' : 'EATING'} · 16:8
            </span>
          </div>
          <h1 style={{
            fontSize: 84, fontWeight: 700, lineHeight: 0.95,
            letterSpacing: '-0.045em', color: c.text,
            margin: '20px 0 0', textWrap: 'balance',
          }}>{headline.en}</h1>
          <p style={{
            fontSize: 20, fontWeight: 500, color: c.text2,
            lineHeight: 1.4, letterSpacing: '-0.01em',
            margin: '20px 0 0', maxWidth: 420,
          }}>{headline.kr}</p>
          <p style={{
            fontSize: 15, color: c.text3, lineHeight: 1.6,
            margin: '18px 0 0', maxWidth: 420,
          }}>칼로리 입력도, 매크로 계산도 없어요.<br/>단식과 식사, 그리고 시간. 그게 전부예요.</p>

          <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <PlayStoreBadge big dark={dark}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.text3, fontSize: 13 }}>
              <i data-lucide="star" style={{ width: 14, height: 14, fill: c.text2, color: c.text2 }}></i>
              <span style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: c.text }}>4.8</span>
              <span>· 2,400+ 리뷰</span>
            </div>
          </div>
        </div>

        {/* Center: massive timer readout */}
        <div style={{ textAlign: 'center', minWidth: 380 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            color: c.text3, marginBottom: 10,
          }}>{state === 'fasting' ? 'ELAPSED · 경과 시간' : 'REMAINING · 남은 시간'}</div>
          <div style={{
            fontFamily: mono,
            fontSize: timerFontSize, fontWeight: 700,
            letterSpacing: '-0.055em',
            lineHeight: 1,
            color: c.text, fontVariantNumeric: 'tabular-nums',
            display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 4,
          }}>
            <span>{String(h).padStart(2,'0')}</span>
            <span style={{ opacity: 0.35 }}>:</span>
            <span>{String(m).padStart(2,'0')}</span>
            <span style={{ opacity: 0.35, fontSize: '0.5em' }}>:{String(s).padStart(2,'0')}</span>
          </div>
          <div style={{
            marginTop: 14, display: 'flex', justifyContent: 'center', gap: 20,
            fontFamily: mono, fontVariantNumeric: 'tabular-nums',
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>PROGRESS</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.text }}>{Math.round(progress*100)}%</div>
            </div>
            <div style={{ width: 1, background: c.border }}></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>TARGET</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.text }}>16<span style={{ fontSize: 14, color: c.text3, fontWeight: 500, marginLeft: 2 }}>h</span></div>
            </div>
          </div>
        </div>

        {/* Right: floating cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
          <FloatCard dark={dark} icon="flame" tone={state}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3 }}>CURRENT STAGE</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, marginTop: 4 }}>지방 연소</div>
            <div style={{ fontSize: 12, color: c.text3, marginTop: 2 }}>Fat burning · 12h+</div>
          </FloatCard>
          <FloatCard dark={dark} icon="calendar-days" tone="neutral">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3 }}>STREAK</div>
            <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: c.text, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>14<span style={{ fontSize: 12, color: c.text3, fontWeight: 500, marginLeft: 2 }}>일</span></div>
            <div style={{ fontSize: 12, color: c.text3, marginTop: 2 }}>Longest · 21일</div>
          </FloatCard>
          <FloatCard dark={dark} icon="target" tone="neutral">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3 }}>THIS WEEK</div>
            <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: c.text, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>92%</div>
            <div style={{ fontSize: 12, color: c.eatingInk, marginTop: 2, fontWeight: 500 }}>↑ 목표 달성률</div>
          </FloatCard>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: c.text3, fontFamily: FONT_SANS_LP, fontSize: 11,
        fontWeight: 600, letterSpacing: '0.14em',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <span>SCROLL</span>
        <div style={{
          width: 1, height: 32, background: c.text3, opacity: 0.4,
          animation: 'eat-scroll-cue 2s infinite',
        }}></div>
      </div>

      <style>{`
        @keyframes eat-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.15); }
        }
        @keyframes eat-scroll-cue {
          0%      { transform: scaleY(0); transform-origin: top; }
          50%     { transform: scaleY(1); transform-origin: top; }
          51%     { transform: scaleY(1); transform-origin: bottom; }
          100%    { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
}

function FloatCard({ children, dark, icon, tone = 'neutral' }) {
  const c = tokens(dark);
  const iconBg = tone === 'fasting' ? c.fastingSoft : tone === 'eating' ? c.eatingSoft : c.surfaceAlt;
  const iconColor = tone === 'fasting' ? c.fasting : tone === 'eating' ? c.eating : c.text2;
  return (
    <div style={{
      background: c.surface,
      border: `1px solid ${c.border}`,
      borderRadius: 16,
      padding: '14px 18px',
      display: 'flex', alignItems: 'center', gap: 12,
      minWidth: 220,
      boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(17,17,17,0.06)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: iconColor, flexShrink: 0,
      }}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }}></i>
      </div>
      <div>{children}</div>
    </div>
  );
}

Object.assign(window, { Hero, useTicker, useScrollProgress, FloatCard });
