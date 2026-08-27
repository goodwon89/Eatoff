// Anti-feature — "no calories, no macros, no logging"

function AntiFeature({ dark, mono }) {
  const c = tokens(dark);
  const items = [
    { label: '칼로리 입력', en: 'Calorie logging' },
    { label: '탄단지 매크로', en: 'Macro tracking' },
    { label: '식단 사진', en: 'Food photos' },
    { label: '바코드 스캔', en: 'Barcode scans' },
    { label: '체중 그래프', en: 'Weight graphs' },
    { label: '푸시 광고', en: 'Push spam' },
  ];
  return (
    <Section dark={dark} style={{ padding: '160px 0', borderTop: `1px solid ${c.border}` }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow dark={dark}>ANTI-FEATURE · 하지 않는 것들</Eyebrow>
            <h2 style={{
              fontFamily: FONT_SANS_LP,
              fontSize: 76, fontWeight: 700,
              letterSpacing: '-0.045em', lineHeight: 0.95,
              color: c.text, margin: '20px 0 0',
            }}>
              No calories.<br/>
              <span style={{ color: c.text3 }}>No macros.</span><br/>
              <span style={{ color: c.text3 }}>No logging.</span>
            </h2>
            <p style={{
              fontSize: 20, color: c.text2, lineHeight: 1.5,
              margin: '28px 0 0', maxWidth: 460,
            }}>
              대부분의 다이어트 앱이 하는 걸 Eatoff는 하지 않아요. 매일 무엇을 먹었는지, 몇 칼로리인지 기록하는 대신 <b style={{ color: c.text }}>단 하나만</b> 봅니다 — <span style={{ fontFamily: mono, fontWeight: 600, color: c.text }}>시간</span>.
            </p>
            <p style={{
              fontSize: 15, color: c.text3, lineHeight: 1.6,
              margin: '18px 0 0', maxWidth: 460,
            }}>
              지속 가능한 리듬은 단순함에서 나옵니다. 복잡한 기록을 지운 자리에 여유가 남습니다.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 22px',
                background: c.surface, border: `1px solid ${c.border}`,
                borderRadius: 14, position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 999,
                  background: c.fastingSoft, color: c.fasting,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i data-lucide="x" style={{ width: 18, height: 18, strokeWidth: 2.5 }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 18, fontWeight: 600, color: c.text3,
                    textDecoration: 'line-through', textDecorationColor: c.fasting, textDecorationThickness: 2,
                  }}>{it.label}</div>
                  <div style={{
                    fontFamily: mono, fontSize: 11, letterSpacing: '0.1em',
                    color: c.text4, marginTop: 2, textTransform: 'uppercase',
                  }}>{it.en}</div>
                </div>
              </div>
            ))}

            {/* Bottom: the one thing */}
            <div style={{
              marginTop: 14, padding: '22px 24px',
              background: c.text, color: c.canvas,
              borderRadius: 16,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: c.eating, color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i data-lucide="check" style={{ width: 20, height: 20, strokeWidth: 3 }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: mono, fontSize: 11, letterSpacing: '0.14em',
                  color: c.text3, textTransform: 'uppercase',
                }}>WHAT WE TRACK</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>시간, 그것 하나.</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { AntiFeature });
