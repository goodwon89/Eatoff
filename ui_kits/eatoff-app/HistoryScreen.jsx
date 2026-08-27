// HistoryScreen — stat cards + session list + weekly bar chart

const MOCK_HISTORY = [
  { date: '3월 24일 · 월', start: '08:00', end: '00:04', dur: '16시간 04분', success: true },
  { date: '3월 23일 · 일', start: '07:30', end: '23:48', dur: '16시간 18분', success: true },
  { date: '3월 22일 · 토', start: '09:12', end: '22:30', dur: '13시간 18분', success: false },
  { date: '3월 21일 · 금', start: '08:15', end: '00:30', dur: '16시간 15분', success: true },
  { date: '3월 20일 · 목', start: '07:45', end: '23:52', dur: '16시간 07분', success: true },
  { date: '3월 19일 · 수', start: '08:30', end: '00:12', dur: '15시간 42분', success: false },
  { date: '3월 18일 · 화', start: '08:00', end: '00:04', dur: '16시간 04분', success: true },
];

function HistoryScreen({ dark }) {
  const c = eatColors(dark);
  // weekly chart heights (out of 16h target)
  const weekly = [16.07, 16.30, 13.30, 16.25, 16.12, 15.70, 16.07];
  const weekLabels = ['월','화','수','목','금','토','일'];
  return (
    <div>
      <div style={{ padding: '20px 24px 4px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: c.text }}>기록</div>
        <div style={{ fontSize: 13, color: c.text3, marginTop: 4 }}>이번 주 · 3월 18일 – 3월 24일</div>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 16px 6px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: c.text3 }}>평균 단식</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 700, color: c.text, letterSpacing: '-0.03em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>15h 42m</div>
          <div style={{ fontSize: 11, color: c.eatingInk, fontWeight: 600, marginTop: 2 }}>↑ 이번 주 12%</div>
        </div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: c.text3 }}>연속 달성</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 700, color: c.text, letterSpacing: '-0.03em', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>14<span style={{ fontSize: 14, color: c.text3, fontWeight: 500, marginLeft: 2 }}>일</span></div>
          <div style={{ fontSize: 11, color: c.text3, fontWeight: 500, marginTop: 2 }}>최장 · 21일</div>
        </div>
      </div>

      {/* Weekly chart */}
      <div style={{ padding: '10px 16px' }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, whiteSpace: 'nowrap' }}>주간 단식 시간</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.text3, whiteSpace: 'nowrap' }}>목표 16h</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, marginTop: 14, height: 120 }}>
            {weekly.map((v, i) => {
              const barH = Math.round(v / 18 * 96); // px, out of ~96 max
              const success = v >= 16;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 6, height: '100%' }}>
                  <div style={{
                    width: '100%', height: barH, borderRadius: 4,
                    background: success ? c.eating : c.fasting, opacity: success ? 1 : 0.55,
                  }}></div>
                  <div style={{ fontSize: 10, color: c.text3, fontWeight: 500 }}>{weekLabels[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '10px 16px 30px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, padding: '4px 8px 8px' }}>세션 히스토리</div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
          {MOCK_HISTORY.map((h, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', padding: '13px 14px',
              borderBottom: i < MOCK_HISTORY.length - 1 ? `1px solid ${c.border}` : 'none',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: h.success ? c.eating : c.fasting, marginRight: 12 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{h.date}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.text3, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{h.start} → {h.end} · {h.dur}</div>
              </div>
              <span style={{
                padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                background: h.success ? c.eatingSoft : c.fastingSoft,
                color: h.success ? c.eatingInk : c.fastingInk,
              }}>{h.success ? '성공' : '미달성'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HistoryScreen, MOCK_HISTORY });
