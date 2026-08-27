// Stats strip — big numeric infographics

function Stats({ dark, mono }) {
  const c = tokens(dark);
  const stats = [
    { value: '4.8', unit: '★',   labelEn: 'AVG RATING',   labelKr: 'Play Store 평점' },
    { value: '2.4M', unit: '',   labelEn: 'SESSIONS',     labelKr: '누적 단식 세션' },
    { value: '92',  unit: '%',   labelEn: 'GOAL RATE',    labelKr: '평균 목표 달성률' },
    { value: '14',  unit: '일',  labelEn: 'AVG STREAK',   labelKr: '평균 연속 달성' },
  ];
  return (
    <Section dark={dark} style={{ padding: '120px 0', borderTop: `1px solid ${c.border}` }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Eyebrow dark={dark}>BY THE NUMBERS · 사용자 데이터</Eyebrow>
          <SplitHeading
            en={<>The rhythm<br/><span style={{ color: c.text3 }}>is working.</span></>}
            kr="Eatoff 사용자들이 만든 리듬"
            dark={dark} size="md"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '32px 24px', background: c.surface,
              border: `1px solid ${c.border}`, borderRadius: 20,
              textAlign: 'left',
            }}>
              <div style={{
                fontFamily: mono, fontSize: 64, fontWeight: 700,
                color: c.text, letterSpacing: '-0.05em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                display: 'flex', alignItems: 'baseline', gap: 4,
              }}>
                {s.value}
                <span style={{ fontSize: 22, color: c.text3, fontWeight: 500, letterSpacing: 0 }}>{s.unit}</span>
              </div>
              <div style={{
                fontFamily: mono, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.16em', color: c.text3,
                marginTop: 20, textTransform: 'uppercase',
              }}>{s.labelEn}</div>
              <div style={{
                fontSize: 14, color: c.text2, marginTop: 4, fontWeight: 500,
              }}>{s.labelKr}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: c.text4 }}>
          * 데모 목적의 예시 데이터입니다.
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { Stats });
