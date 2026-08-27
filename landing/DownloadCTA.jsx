// Download CTA — big full-bleed section with Play Store badge

function DownloadCTA({ dark, mono, timerScale }) {
  const c = tokens(dark);
  // Force this section to be dark for dramatic contrast
  const local = tokens(true);
  return (
    <section id="download" style={{
      position: 'relative',
      padding: '160px 0 200px',
      background: '#0A0A0A',
      color: '#FFF',
      overflow: 'hidden',
      borderTop: `1px solid ${c.border}`,
    }}>
      {/* Ambient rings backdrop */}
      <svg width="900" height="900" viewBox="0 0 900 900" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        opacity: 0.15, pointerEvents: 'none',
      }}>
        {[80, 160, 260, 380, 520].map((r, i) => (
          <circle key={i} cx="450" cy="450" r={r} stroke={i % 2 === 0 ? '#FF4A3D' : '#3BD671'} strokeWidth="1.5" fill="none"/>
        ))}
      </svg>

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(255,74,61,0.15)', color: '#FF7A70',
            fontFamily: FONT_SANS_LP,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#FF4A3D' }}></span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em' }}>NOW AVAILABLE · 안드로이드 출시</span>
          </div>
          <h2 style={{
            fontFamily: FONT_SANS_LP,
            fontSize: 96, fontWeight: 700,
            letterSpacing: '-0.05em', lineHeight: 0.95,
            margin: '28px 0 0',
          }}>
            Start your<br/>
            <span style={{
              background: 'linear-gradient(90deg, #FF4A3D, #3BD671)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>next hour.</span>
          </h2>
          <p style={{
            fontSize: 20, color: '#C8C8C8', lineHeight: 1.5,
            margin: '28px auto 0', maxWidth: 500,
          }}>
            지금 시작한 이 순간이 다음 한 시간의 시작입니다.<br/>
            무료로 다운로드하고 첫 단식을 시작하세요.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <PlayStoreBadge big dark/>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 20px', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
            }}>
              {/* Placeholder QR code — grid of squares */}
              <div style={{
                width: 56, height: 56, background: '#FFF', padding: 4,
                display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 1,
                borderRadius: 6,
              }}>
                {Array.from({ length: 64 }).map((_, i) => {
                  // Pseudo-random pattern
                  const hash = ((i * 2654435761) >>> 0) % 100;
                  const on = hash < 55 || i < 3 || i > 60 || i % 8 < 1 || i % 8 > 6;
                  const isCorner = (i < 3 * 8 && i % 8 < 3) || (i < 3 * 8 && i % 8 > 4) || (i > 40 && i % 8 < 3);
                  return <div key={i} style={{ background: (isCorner || on) ? '#000' : 'transparent', width: '100%', height: '100%' }}></div>;
                })}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: '#888' }}>SCAN QR</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#FFF', marginTop: 2 }}>모바일에서 바로 설치</div>
              </div>
            </div>
          </div>

          {/* Meta list */}
          <div style={{
            marginTop: 60, display: 'flex', justifyContent: 'center', gap: 40,
            flexWrap: 'wrap',
            fontFamily: FONT_SANS_LP, fontSize: 13, color: '#888',
          }}>
            {[
              { icon: 'check-circle', label: '무료 · 인앱결제 없음' },
              { icon: 'shield', label: '로컬 데이터 저장' },
              { icon: 'smartphone', label: 'Android 8.0 이상' },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i data-lucide={m.icon} style={{ width: 14, height: 14, color: '#3BD671' }}></i>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer({ dark }) {
  const c = tokens(dark);
  return (
    <footer style={{
      background: c.canvas, color: c.text,
      padding: '60px 0 40px', borderTop: `1px solid ${c.border}`,
      fontFamily: FONT_SANS_LP,
    }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoMark size={28} dark={dark}/>
              <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Eatoff</span>
            </div>
            <div style={{ fontSize: 13, color: c.text3, marginTop: 12, maxWidth: 300, lineHeight: 1.5 }}>
              복잡함은 빼고, 시간만.<br/>미니멀한 간헐적 단식 타이머.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 60 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: c.text3, textTransform: 'uppercase' }}>제품</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['기능', '단식 단계', '위젯', '다운로드'].map(l => (
                  <a key={l} href="#" style={{ fontSize: 14, color: c.text2, textDecoration: 'none' }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: c.text3, textTransform: 'uppercase' }}>회사</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['소개', '개인정보', '이용약관', '문의'].map(l => (
                  <a key={l} href="#" style={{ fontSize: 14, color: c.text2, textDecoration: 'none' }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: c.text3 }}>© 2026 Eatoff. All rights reserved.</div>
          <div style={{ fontSize: 12, color: c.text3, fontFamily: "'JetBrains Mono', monospace" }}>v1.0.0</div>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { DownloadCTA, Footer });
