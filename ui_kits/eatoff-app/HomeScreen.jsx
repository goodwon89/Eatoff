// HomeScreen — the timer + state switch + fasting stages sheet

function fmtHMS(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.floor(totalSec % 60);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function fmtHM(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function HomeScreen({ dark, onOpenStages, session }) {
  const c = eatColors(dark);
  const { state, elapsed, targetSec } = session;
  const progress = Math.min(1, elapsed / targetSec);
  const remaining = Math.max(0, targetSec - elapsed);
  const isFasting = state === 'fasting';
  const stateColor = isFasting ? c.fasting : c.eating;
  const stateLabel = isFasting ? 'FASTING' : 'EATING';
  const stateLabelKR = isFasting ? '단식 중' : '식사 중';
  const inkColor = isFasting ? c.fastingInk : c.eatingInk;

  return (
    <div style={{ padding: '8px 0 0' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="24" height="24" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" stroke={c.border} strokeWidth="6" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 1 32 56" stroke={c.eating} strokeWidth="6" strokeLinecap="round" fill="none"/>
            <path d="M 32 8 A 24 24 0 0 0 32 56" stroke={c.fasting} strokeWidth="6" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: c.text }}>Eatoff</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ width: 40, height: 40, borderRadius: 999, background: 'transparent', border: 0, cursor: 'pointer', color: c.text2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <i data-lucide="bell" style={{ width: 20, height: 20 }}></i>
          </button>
        </div>
      </div>

      {/* Plan pill */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999,
          background: isFasting ? c.fastingSoft : c.eatingSoft,
          color: inkColor,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: stateColor }}></span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em' }}>{stateLabel} · 16:8</span>
        </span>
      </div>

      {/* Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <TimerRing size={280} stroke={12} progress={progress} state={state} dark={dark}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: c.text3, whiteSpace: 'nowrap' }}>{isFasting ? '경과 시간' : '남은 시간'}</div>
          <div style={{
            fontFamily: FONT_MONO, fontWeight: 700, fontSize: 56,
            color: c.text, letterSpacing: '-0.035em', lineHeight: 1,
            fontVariantNumeric: 'tabular-nums', marginTop: 10,
          }}>{fmtHM(isFasting ? elapsed : remaining)}</div>
          <div style={{
            fontFamily: FONT_MONO, fontWeight: 500, fontSize: 13,
            color: c.text3, marginTop: 6, fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}>{Math.round(progress*100)}% · 목표 {Math.round(targetSec/3600)}h</div>
        </TimerRing>
      </div>

      {/* Session times */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, whiteSpace: 'nowrap' }}>시작</div>
          <div style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: 16, color: c.text, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>08:00</div>
        </div>
        <div style={{ width: 1, background: c.border }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, whiteSpace: 'nowrap' }}>목표 종료</div>
          <div style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: 16, color: c.text, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>00:00</div>
        </div>
      </div>

      {/* Stage row */}
      <div style={{ padding: '0 20px', marginTop: 24 }}>
        <button onClick={onOpenStages} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
          padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: isFasting ? c.fastingSoft : c.eatingSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i data-lucide="flame" style={{ width: 18, height: 18, color: stateColor }}></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>지방 연소 단계</div>
            <div style={{ fontSize: 11, color: c.text3, marginTop: 2 }}>12h 경과 · 다음 단계까지 3h 28m</div>
          </div>
          <i data-lucide="chevron-right" style={{ width: 20, height: 20, color: c.text3 }}></i>
        </button>
      </div>

      {/* Big CTA */}
      <div style={{ padding: '20px 20px 24px' }}>
        <StateButton state={isFasting ? 'eating' : 'fasting'} dark={dark}
          onClick={() => window.__eatoff?.toggleState()}>
          <i data-lucide={isFasting ? 'utensils' : 'timer'} style={{ width: 18, height: 18 }}></i>
          {isFasting ? '식사 시작' : '단식 시작'}
        </StateButton>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: c.text3 }}>
          시작 시간이 다르다면 <span style={{ textDecoration: 'underline', color: c.text2 }}>여기서 수정</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, fmtHMS, fmtHM });
