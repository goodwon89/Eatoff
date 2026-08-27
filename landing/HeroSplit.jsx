// HeroSplit — Version B.
// Vertical split: left half fasting (red tint), right half eating (green tint).
// Two phone mockups facing each other. Big vertical rule down the middle.

function HeroSplit({ dark, mono, headline }) {
  const c = tokens(dark);
  const baseElapsed = 14 * 3600 + 32 * 60;
  const tick = useTicker(Date.now() - baseElapsed * 1000);
  const hFast = Math.floor(tick / 3600);
  const mFast = Math.floor((tick % 3600) / 60);
  const sFast = tick % 60;

  const eatBase = 2 * 3600 + 14 * 60;
  const tickEat = useTicker(Date.now() - eatBase * 1000);
  const hEat = Math.floor(tickEat / 3600);
  const mEat = Math.floor((tickEat % 3600) / 60);

  const fastingBg = dark ? mixHex(c.fasting, '#000', 0.88) : mixHex(c.fasting, '#FFFFFF', 0.92);
  const eatingBg  = dark ? mixHex(c.eating,  '#000', 0.88) : mixHex(c.eating,  '#FFFFFF', 0.92);

  return (
    <div id="top" style={{
      position: 'relative', minHeight: '100vh',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden',
    }}>
      {/* ── Left half: FASTING ─────────────────────────────── */}
      <div style={{
        position: 'relative',
        background: fastingBg,
        padding: '140px 60px 80px 8vw',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: FONT_SANS_LP,
      }}>
        {/* Watermark digit */}
        <div style={{
          position: 'absolute', top: '50%', right: -80, transform: 'translateY(-50%)',
          fontFamily: mono, fontSize: 480, fontWeight: 700,
          color: c.fasting, opacity: dark ? 0.06 : 0.05,
          letterSpacing: '-0.08em', lineHeight: 1, pointerEvents: 'none',
          fontVariantNumeric: 'tabular-nums',
        }}>16</div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 520 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: c.fastingSoft, color: c.fastingInk,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 999, background: c.fasting,
              animation: 'eat-pulse 2.2s infinite',
            }}></span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em' }}>FASTING · 단식 중</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS_LP, fontSize: 84, fontWeight: 700,
            letterSpacing: '-0.045em', lineHeight: 0.95,
            color: c.text, margin: '20px 0 0', textWrap: 'balance',
          }}>{headline.en}</div>
          <p style={{
            fontSize: 20, fontWeight: 500, color: c.text2,
            lineHeight: 1.4, letterSpacing: '-0.01em',
            margin: '20px 0 0', maxWidth: 420,
          }}>{headline.kr}</p>

          {/* Live fasting stat row */}
          <div style={{
            marginTop: 40, display: 'flex', alignItems: 'baseline', gap: 24,
            padding: '18px 22px', background: c.surface, border: `1px solid ${c.border}`,
            borderRadius: 16, maxWidth: 480,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>ELAPSED</div>
              <div style={{
                fontFamily: mono, fontSize: 40, fontWeight: 700,
                color: c.text, letterSpacing: '-0.045em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums', marginTop: 6,
                display: 'flex', alignItems: 'baseline',
              }}>
                {String(hFast).padStart(2,'0')}<span style={{ opacity: 0.3 }}>:</span>{String(mFast).padStart(2,'0')}
                <span style={{ fontSize: 20, opacity: 0.4, marginLeft: 4 }}>:{String(sFast).padStart(2,'0')}</span>
              </div>
            </div>
            <div style={{ width: 1, height: 44, background: c.border }}></div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>PROGRESS</div>
              <div style={{
                fontFamily: mono, fontSize: 40, fontWeight: 700,
                color: c.fasting, letterSpacing: '-0.045em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums', marginTop: 6,
              }}>91%</div>
            </div>
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <PlayStoreBadge big dark={dark}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.text3, fontSize: 13 }}>
              <i data-lucide="star" style={{ width: 14, height: 14, fill: c.text2, color: c.text2 }}></i>
              <span style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: c.text }}>4.8</span>
              <span>· 2,400+ 리뷰</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right half: EATING ────────────────────────────── */}
      <div style={{
        position: 'relative',
        background: eatingBg,
        padding: '140px 8vw 80px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: FONT_SANS_LP,
      }}>
        {/* Watermark digit */}
        <div style={{
          position: 'absolute', top: '50%', left: -60, transform: 'translateY(-50%)',
          fontFamily: mono, fontSize: 480, fontWeight: 700,
          color: c.eating, opacity: dark ? 0.06 : 0.05,
          letterSpacing: '-0.08em', lineHeight: 1, pointerEvents: 'none',
          fontVariantNumeric: 'tabular-nums',
        }}>8</div>

        <div style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', maxWidth: 480 }}>
          {/* Phone mockup */}
          <SplitPhone dark={dark} mono={mono} state="eating"
            time={`${String(hEat).padStart(2,'0')}:${String(mEat).padStart(2,'0')}`}
          />

          <div style={{
            marginTop: 32, padding: '18px 22px',
            background: c.surface, border: `1px solid ${c.border}`,
            borderRadius: 16, display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: c.eatingSoft, color: c.eating,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i data-lucide="utensils" style={{ width: 20, height: 20 }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>EATING WINDOW · 식사 시간</div>
              <div style={{
                fontSize: 16, fontWeight: 600, color: c.text, marginTop: 2,
                display: 'flex', gap: 8, alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>16:00 → 24:00</span>
                <span style={{ fontSize: 12, color: c.text3, fontWeight: 500 }}>· 남은 시간 05:46</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Center divider with brand mark ────────────────── */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
        background: c.border, zIndex: 3,
      }}></div>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 4,
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: 999,
          background: c.surface, border: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: dark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(17,17,17,0.1)',
        }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" stroke={c.border} strokeWidth="6" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 1 32 56" stroke={c.eating} strokeWidth="6" strokeLinecap="round" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 0 32 56" stroke={c.fasting} strokeWidth="6" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <div style={{
          marginTop: 12, textAlign: 'center',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
          color: c.text3, fontFamily: FONT_SANS_LP,
        }}>16 : 8</div>
      </div>

      {/* Labels on either side of the divider (top) */}
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 8, zIndex: 3,
        fontFamily: FONT_SANS_LP,
      }}>
        <div style={{ display: 'flex', gap: 40, fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', color: c.text3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: c.fasting }}></span>
            <span>16H FASTING</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>8H EATING</span>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: c.eating }}></span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: c.text3, fontFamily: FONT_SANS_LP, fontSize: 11,
        fontWeight: 600, letterSpacing: '0.14em', zIndex: 5, pointerEvents: 'none',
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

// Compact phone mockup for the right side of split hero
function SplitPhone({ dark, mono, state = 'eating', time = '02:14' }) {
  const c = tokens(dark);
  const color = state === 'fasting' ? c.fasting : c.eating;
  const softBg = state === 'fasting' ? c.fastingSoft : c.eatingSoft;
  const inkColor = state === 'fasting' ? c.fastingInk : c.eatingInk;

  return (
    <div style={{
      width: 300, height: 620,
      background: c.canvas,
      border: `10px solid ${dark ? '#000' : '#1a1a1a'}`,
      borderRadius: 40, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: FONT_SANS_LP,
      boxShadow: dark ? '0 40px 100px rgba(0,0,0,0.6)' : '0 40px 100px rgba(31,157,85,0.2)',
      marginLeft: 'auto',
    }}>
      <div style={{ height: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px 0', fontSize: 11, fontWeight: 600, color: c.text }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, opacity: 0.7 }}>
          <i data-lucide="wifi" style={{ width: 12, height: 12 }}></i>
          <i data-lucide="battery-medium" style={{ width: 16, height: 16 }}></i>
        </div>
      </div>
      <div style={{ flex: 1, padding: '16px 20px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" stroke={c.border} strokeWidth="6" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 1 32 56" stroke={c.eating} strokeWidth="6" strokeLinecap="round" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 0 32 56" stroke={c.fasting} strokeWidth="6" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.text, letterSpacing: '-0.01em' }}>Eatoff</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 999,
            background: softBg, color: inkColor,
            fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: color }}></span>
            EATING · 16:8
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginTop: 8 }}>
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: 'absolute' }}>
            <circle cx="110" cy="110" r="96" stroke={c.track} strokeWidth="10" fill="none"/>
            <circle cx="110" cy="110" r="96" stroke={color} strokeWidth="10" fill="none"
              strokeDasharray={2 * Math.PI * 96}
              strokeDashoffset={2 * Math.PI * 96 * 0.72}
              strokeLinecap="round"
              transform="rotate(-90 110 110)"
              style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </svg>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: c.text3, whiteSpace: 'nowrap' }}>남은 시간</div>
            <div style={{
              fontFamily: mono, fontSize: 46, fontWeight: 700,
              color: c.text, letterSpacing: '-0.045em', lineHeight: 1,
              marginTop: 8, fontVariantNumeric: 'tabular-nums',
            }}>{time}</div>
            <div style={{ fontSize: 11, color: c.text3, marginTop: 4 }}>28% · 8h 창</div>
          </div>
        </div>
        <button style={{
          padding: '14px 0', borderRadius: 999, border: 0,
          background: c.fasting, color: '#FFF',
          fontFamily: FONT_SANS_LP, fontSize: 14, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer',
        }}>
          <i data-lucide="timer" style={{ width: 16, height: 16 }}></i>
          단식 시작
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HeroSplit, SplitPhone });
