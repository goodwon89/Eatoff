// One-tap state transition demo

function OneTap({ dark, mono }) {
  const c = tokens(dark);
  const [state, setState] = React.useState('fasting');
  const isFasting = state === 'fasting';

  return (
    <Section id="features" dark={dark} style={{ padding: '160px 0', background: c.surfaceAlt }}>
      <Container>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Eyebrow dark={dark}>ONE TAP · 원터치 상태 전환</Eyebrow>
          <SplitHeading
            en={<>One tap. <span style={{ color: c.text3 }}>Two states.</span></>}
            kr="탭 하나로 단식과 식사를 오갑니다"
            dark={dark} size="lg"
          />
        </div>

        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 48, alignItems: 'center' }}>
          {/* Left phone — Fasting */}
          <MiniPhoneMockup state="fasting" active={isFasting} dark={dark} mono={mono}/>

          {/* Center: giant toggle */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 24,
            }}>
              <button onClick={() => setState(isFasting ? 'eating' : 'fasting')} style={{
                width: 96, height: 96, borderRadius: 999,
                background: isFasting ? c.fasting : c.eating,
                color: '#FFF', border: 0, cursor: 'pointer',
                boxShadow: `0 20px 60px ${isFasting ? c.fasting : c.eating}55`,
                transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <i data-lucide={isFasting ? 'utensils' : 'timer'} style={{ width: 40, height: 40, strokeWidth: 1.75 }}></i>
              </button>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c.text, letterSpacing: '-0.02em' }}>
                  {isFasting ? '식사 시작' : '단식 시작'}
                </div>
                <div style={{ fontSize: 13, color: c.text3, marginTop: 4 }}>
                  탭해서 상태 전환
                </div>
              </div>
              <div style={{
                display: 'flex', gap: 6, padding: 4, borderRadius: 999,
                background: c.surface, border: `1px solid ${c.border}`,
              }}>
                {['fasting', 'eating'].map(s => (
                  <button key={s} onClick={() => setState(s)} style={{
                    padding: '8px 18px', borderRadius: 999, border: 0, cursor: 'pointer',
                    background: state === s ? (s === 'fasting' ? c.fasting : c.eating) : 'transparent',
                    color: state === s ? '#FFF' : c.text3,
                    fontFamily: FONT_SANS_LP, fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    transition: 'all 220ms',
                  }}>
                    {s === 'fasting' ? '단식' : '식사'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right phone — Eating */}
          <MiniPhoneMockup state="eating" active={!isFasting} dark={dark} mono={mono}/>
        </div>
      </Container>
    </Section>
  );
}

function MiniPhoneMockup({ state, active, dark, mono }) {
  const c = tokens(dark);
  const color = state === 'fasting' ? c.fasting : c.eating;
  const inkColor = state === 'fasting' ? c.fastingInk : c.eatingInk;
  const softBg = state === 'fasting' ? c.fastingSoft : c.eatingSoft;
  const timeDisplay = state === 'fasting' ? '14:32' : '02:14';
  const labelKr = state === 'fasting' ? '단식 중' : '식사 중';
  const labelEn = state === 'fasting' ? 'FASTING' : 'EATING';
  const sub = state === 'fasting' ? '목표까지 01:28' : '남은 시간 05:46';

  return (
    <div style={{
      width: 280, aspectRatio: '9/19',
      background: c.canvas,
      border: `10px solid ${dark ? '#000' : '#1a1a1a'}`,
      borderRadius: 32, overflow: 'hidden',
      opacity: active ? 1 : 0.6,
      transform: active ? 'scale(1)' : 'scale(0.94)',
      transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      justifySelf: state === 'fasting' ? 'end' : 'start',
      display: 'flex', flexDirection: 'column',
      fontFamily: FONT_SANS_LP,
      boxShadow: active ? `0 30px 80px ${color}22` : '0 20px 50px rgba(0,0,0,0.15)',
    }}>
      {/* status bar */}
      <div style={{ height: 24, display: 'flex', justifyContent: 'space-between', padding: '6px 16px 0', fontSize: 10, fontWeight: 600, color: c.text }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
        <span></span>
      </div>
      <div style={{ flex: 1, padding: '20px 20px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 999,
            background: softBg, color: inkColor,
            fontSize: 9, fontWeight: 600, letterSpacing: '0.14em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: color }}></span>
            {labelEn} · 16:8
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: 'absolute' }}>
            <circle cx="100" cy="100" r="88" stroke={c.track} strokeWidth="8" fill="none"/>
            <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="8" fill="none"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (state === 'fasting' ? 0.09 : 0.72)}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </svg>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', color: c.text3 }}>
              {state === 'fasting' ? '경과 시간' : '남은 시간'}
            </div>
            <div style={{
              fontFamily: mono, fontSize: 42, fontWeight: 700,
              color: c.text, letterSpacing: '-0.04em', lineHeight: 1,
              marginTop: 6, fontVariantNumeric: 'tabular-nums',
            }}>{timeDisplay}</div>
            <div style={{ fontSize: 10, color: c.text3, marginTop: 4 }}>{sub}</div>
          </div>
        </div>
        <div style={{
          padding: '12px 0', borderRadius: 999,
          background: state === 'fasting' ? c.eating : c.fasting,
          color: '#FFF', textAlign: 'center', fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <i data-lucide={state === 'fasting' ? 'utensils' : 'timer'} style={{ width: 14, height: 14 }}></i>
          {state === 'fasting' ? '식사 시작' : '단식 시작'}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OneTap, MiniPhoneMockup });
