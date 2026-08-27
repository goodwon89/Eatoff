// Widget showcase — Android home screen mockup

function WidgetShowcase({ dark, mono }) {
  const c = tokens(dark);
  return (
    <Section id="widgets" dark={dark} style={{ padding: '160px 0', background: c.surfaceAlt }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow dark={dark}>HOME WIDGETS · 홈 화면 위젯</Eyebrow>
            <SplitHeading
              en={<>Always on<br/><span style={{ color: c.text3 }}>your home screen.</span></>}
              kr="앱을 열지 않아도 상태를 확인하세요"
              dark={dark} size="lg"
            />
            <p style={{ fontSize: 17, color: c.text2, lineHeight: 1.55, margin: '28px 0 0', maxWidth: 460 }}>
              앱을 열지 않아도 홈 화면에서 <b style={{ color: c.text }}>현재 상태</b>, <b style={{ color: c.text }}>남은 시간</b>, <b style={{ color: c.text }}>진행률</b>을 한눈에.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { size: '4×2', desc: '표준 위젯 · 대형 타이머 + 진행률 + 상태' },
                { size: '2×2', desc: '미니 위젯 · 핵심 상태와 남은 시간만 압축' },
              ].map(w => (
                <div key={w.size} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px', background: c.surface,
                  border: `1px solid ${c.border}`, borderRadius: 12,
                }}>
                  <div style={{
                    fontFamily: mono, fontSize: 16, fontWeight: 700,
                    color: c.text, padding: '4px 10px', borderRadius: 6,
                    background: c.surfaceAlt, letterSpacing: '-0.02em',
                  }}>{w.size}</div>
                  <div style={{ fontSize: 14, color: c.text2 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Android home screen mockup */}
          <div style={{
            position: 'relative', aspectRatio: '9/18',
            maxWidth: 440, margin: '0 auto',
            borderRadius: 44, overflow: 'hidden',
            background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f1729 100%)',
            border: `12px solid #000`,
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            padding: '20px 16px',
            fontFamily: FONT_SANS_LP,
          }}>
            {/* Status bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              color: '#FFF', fontSize: 13, fontWeight: 600, padding: '4px 8px',
            }}>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
              <div style={{ display: 'flex', gap: 6, opacity: 0.9 }}>
                <i data-lucide="wifi" style={{ width: 14, height: 14 }}></i>
                <i data-lucide="battery-medium" style={{ width: 18, height: 18 }}></i>
              </div>
            </div>

            {/* Big widget (4x2) */}
            <div style={{
              marginTop: 32,
              background: '#111', borderRadius: 24, padding: '18px 20px',
              color: '#FFF', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: '#FF7A70' }}>FASTING · 16:8</span>
                <span style={{ fontSize: 10, opacity: 0.6 }}>Eatoff</span>
              </div>
              <div style={{
                fontFamily: mono, fontWeight: 700, fontSize: 48,
                letterSpacing: '-0.04em', marginTop: 8, lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>14:32</div>
              <div style={{ height: 5, background: '#1F1F1F', borderRadius: 999, marginTop: 14 }}>
                <div style={{ width: '82%', height: '100%', background: '#FF4A3D', borderRadius: 999 }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.6, marginTop: 8 }}>
                <span>82%</span>
                <span>목표까지 01:28</span>
              </div>
            </div>

            {/* Mini widget row */}
            <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
              <div style={{
                width: 150, background: '#111', borderRadius: 20, padding: 14,
                color: '#FFF', boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', color: '#FF7A70' }}>FASTING</div>
                <div style={{
                  fontFamily: mono, fontWeight: 700, fontSize: 26,
                  letterSpacing: '-0.04em', marginTop: 4, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}>14:32</div>
                <div style={{ fontSize: 9, opacity: 0.6, marginTop: 6 }}>남은 시간</div>
                <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>01:28</div>
                <div style={{ height: 3, background: '#1F1F1F', borderRadius: 999, marginTop: 8 }}>
                  <div style={{ width: '82%', height: '100%', background: '#FF4A3D', borderRadius: 999 }}></div>
                </div>
              </div>

              {/* App icons column */}
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, alignContent: 'start' }}>
                {[
                  { icon: 'message-circle', name: '메시지' },
                  { icon: 'camera', name: '카메라' },
                  { icon: 'music', name: '음악' },
                  { icon: 'map', name: '지도' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: `hsl(${i * 90}, 40%, 40%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#FFF',
                    }}>
                      <i data-lucide={a.icon} style={{ width: 20, height: 20 }}></i>
                    </div>
                    <span style={{ fontSize: 9, color: '#FFF', opacity: 0.85 }}>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom dock */}
            <div style={{
              position: 'absolute', bottom: 24, left: 20, right: 20,
              display: 'flex', justifyContent: 'space-around',
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
              borderRadius: 22, padding: '10px 8px',
            }}>
              {['phone', 'message-square', 'globe', 'camera'].map((ic, i) => (
                <div key={i} style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `hsl(${(i + 2) * 60}, 40%, 45%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF',
                }}>
                  <i data-lucide={ic} style={{ width: 20, height: 20 }}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { WidgetShowcase });
