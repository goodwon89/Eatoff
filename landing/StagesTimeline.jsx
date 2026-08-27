// Fasting Stages Interactive Timeline — 0h → 24h

const STAGE_DATA = [
  { hours: 0,  title: '식사 종료',        en: 'Fed state',      desc: '마지막 식사 이후 인슐린과 혈당이 상승합니다.', icon: 'utensils' },
  { hours: 4,  title: '혈당 안정',        en: 'Blood sugar dip', desc: '식후 인슐린이 정상 수준으로 안정되고 소화가 마무리됩니다.', icon: 'activity' },
  { hours: 8,  title: '글리코겐 감소',    en: 'Glycogen depletion', desc: '간의 글리코겐이 소진되며 지방 대사가 시작됩니다.', icon: 'battery-low' },
  { hours: 12, title: '지방 연소',        en: 'Fat burning',     desc: '지방을 주 에너지원으로 사용하기 시작합니다.', icon: 'flame' },
  { hours: 18, title: '케토시스',        en: 'Ketosis',         desc: '케톤이 뇌와 근육의 주 연료로 사용됩니다.', icon: 'zap' },
  { hours: 24, title: '오토파지',        en: 'Autophagy',       desc: '손상된 세포 성분이 재활용되며 세포 수준의 청소가 일어납니다.', icon: 'recycle' },
];

function StagesTimeline({ dark, mono }) {
  const c = tokens(dark);
  const [rawIdx, setActiveIdx] = React.useState(3); // default to 지방 연소
  const activeIdx = Math.max(0, Math.min(STAGE_DATA.length - 1, rawIdx));
  const active = STAGE_DATA[activeIdx];

  // Auto-cycle disabled — but we'll drive activeIdx from scroll into this section
  const sectionRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress from when section top enters viewport bottom to when bottom exits top
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(STAGE_DATA.length - 1, Math.max(0, Math.floor(p * STAGE_DATA.length)));
      setActiveIdx(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const progressP = active.hours / 24;

  return (
    <Section id="stages" dark={dark} style={{ padding: '160px 0', borderTop: `1px solid ${c.border}` }}>
      <div ref={sectionRef}>
      <Container>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <Eyebrow dark={dark}>FASTING STAGES · 단식 단계</Eyebrow>
          <SplitHeading
            en={<>Your body,<br/><span style={{ color: c.text3 }}>hour by hour.</span></>}
            kr="시간이 흐를수록 몸은 다른 단계로 들어갑니다"
            dark={dark} size="lg"
          />
        </div>

        {/* Timeline row */}
        <div style={{ marginTop: 80, position: 'relative' }}>
          {/* Track */}
          <div style={{
            position: 'absolute', left: '4%', right: '4%', top: 24, height: 2,
            background: c.border,
          }}></div>
          {/* Progress */}
          <div style={{
            position: 'absolute', left: '4%', top: 24, height: 2,
            width: `${progressP * 92}%`,
            background: `linear-gradient(90deg, ${c.fasting}, ${c.eating})`,
            transition: 'width 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}></div>
          {/* Nodes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 4%' }}>
            {STAGE_DATA.map((s, i) => {
              const isActive = i === activeIdx;
              const isPast = i < activeIdx;
              const dotColor = isActive || isPast ? (i >= 3 ? c.fasting : c.eating) : c.border;
              return (
                <button key={i} onClick={() => setActiveIdx(i)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  background: 'transparent', border: 0, cursor: 'pointer',
                  fontFamily: FONT_SANS_LP,
                }}>
                  <div style={{
                    width: isActive ? 50 : 34,
                    height: isActive ? 50 : 34,
                    borderRadius: 999,
                    background: isActive ? dotColor : c.canvas,
                    border: `3px solid ${dotColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#FFF' : dotColor,
                    transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                    boxShadow: isActive ? `0 12px 32px ${dotColor}55` : 'none',
                  }}>
                    <i data-lucide={s.icon} style={{ width: isActive ? 20 : 14, height: isActive ? 20 : 14, strokeWidth: 2 }}></i>
                  </div>
                  <div style={{
                    fontFamily: mono, fontSize: 12, fontWeight: 700,
                    color: isActive ? c.text : c.text3,
                    letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
                    transition: 'color 220ms',
                  }}>{s.hours}h</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    color: isActive ? c.text : c.text3,
                    letterSpacing: '-0.005em',
                    transition: 'color 220ms',
                    whiteSpace: 'nowrap',
                  }}>{s.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail */}
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: illustration = concentric rings showing time */}
          <div style={{
            position: 'relative', aspectRatio: '1', maxWidth: 480,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 400 400" style={{ width: '100%' }}>
              {/* rings: each stage */}
              {STAGE_DATA.map((s, i) => {
                const rr = 40 + i * 30;
                const isActive = i === activeIdx;
                const isPast = i <= activeIdx;
                const col = i >= 3 ? c.fasting : c.eating;
                return (
                  <circle key={i}
                    cx="200" cy="200" r={rr}
                    stroke={isPast ? col : c.border}
                    strokeWidth={isActive ? 6 : isPast ? 3 : 1.5}
                    fill="none"
                    opacity={isPast ? 1 : 0.6}
                    style={{ transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                  />
                );
              })}
              {/* center */}
              <circle cx="200" cy="200" r="26" fill={c.canvas} stroke={activeIdx >= 3 ? c.fasting : c.eating} strokeWidth="3"/>
              <text x="200" y="207" textAnchor="middle" fontFamily={mono} fontSize="20" fontWeight="700" fill={c.text} letterSpacing="-0.03em">{active.hours}h</text>
            </svg>
          </div>

          {/* Right: text */}
          <div style={{ minHeight: 320 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: activeIdx >= 3 ? c.fastingSoft : c.eatingSoft }}>
              <i data-lucide={active.icon} style={{ width: 14, height: 14, color: activeIdx >= 3 ? c.fasting : c.eating }}></i>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: activeIdx >= 3 ? c.fastingInk : c.eatingInk, fontFamily: FONT_SANS_LP }}>
                STAGE {activeIdx + 1} / {STAGE_DATA.length}
              </span>
            </div>
            <h3 style={{
              fontFamily: FONT_SANS_LP, fontSize: 56, fontWeight: 700,
              letterSpacing: '-0.03em', lineHeight: 1, color: c.text, margin: '20px 0 0',
            }}>{active.title}</h3>
            <div style={{ fontFamily: mono, fontSize: 14, letterSpacing: '0.08em', color: c.text3, marginTop: 8, textTransform: 'uppercase' }}>
              {active.en}
            </div>
            <p style={{ fontSize: 18, color: c.text2, lineHeight: 1.55, margin: '24px 0 0', maxWidth: 440 }}>
              {active.desc}
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 20 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: c.text3 }}>ELAPSED</div>
                <div style={{ fontFamily: mono, fontSize: 36, fontWeight: 700, color: c.text, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{String(active.hours).padStart(2,'0')}<span style={{ fontSize: 20, color: c.text3, fontWeight: 500 }}>h 00m</span></div>
              </div>
              <div style={{ width: 1, background: c.border }}></div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: c.text3 }}>NEXT</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: c.text, marginTop: 8 }}>
                  {activeIdx < STAGE_DATA.length - 1 ? STAGE_DATA[activeIdx + 1].title : '유지'}
                </div>
                <div style={{ fontSize: 12, color: c.text3 }}>
                  {activeIdx < STAGE_DATA.length - 1 ? `${STAGE_DATA[activeIdx + 1].hours - active.hours}h 후` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational disclaimer */}
        <div style={{
          marginTop: 60, padding: '16px 22px',
          background: c.surfaceAlt, borderRadius: 12,
          fontSize: 12, color: c.text3, lineHeight: 1.5,
          maxWidth: 720, margin: '60px auto 0', textAlign: 'center',
        }}>
          단식 단계는 일반적인 대사 흐름을 요약한 참고 정보로, 개인차가 있습니다. 특정 질환이 있거나 임신 중이라면 시작 전 의료 전문가와 상의하세요.
        </div>
      </Container>
      </div>
    </Section>
  );
}

Object.assign(window, { StagesTimeline, STAGE_DATA });
