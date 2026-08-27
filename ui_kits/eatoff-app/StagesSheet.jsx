// StagesSheet — bottom sheet with fasting metabolic stages

const STAGES = [
  { hours: 4,  title: '혈당 안정',    desc: '식후 인슐린이 정상 수준으로 안정됩니다.' },
  { hours: 8,  title: '글리코겐 감소', desc: '간 글리코겐이 소진되며 지방 대사가 시작됩니다.' },
  { hours: 12, title: '지방 연소',    desc: '지방을 주 에너지원으로 사용하기 시작합니다.', current: true },
  { hours: 18, title: '케토시스',    desc: '케톤이 뇌와 근육의 주 연료로 사용됩니다.' },
  { hours: 24, title: '오토파지',    desc: '손상된 세포 성분이 재활용되기 시작합니다.' },
];

function StagesSheet({ open, onClose, dark }) {
  const c = eatColors(dark);
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column',
    }}>
      <div onClick={onClose} style={{
        flex: 1, background: 'rgba(10, 10, 10, 0.45)',
        animation: 'eat-fade 220ms',
      }}></div>
      <div style={{
        background: c.surface, borderRadius: '20px 20px 0 0',
        padding: '14px 20px 24px',
        maxHeight: '82%', overflowY: 'auto',
        boxShadow: '0 -12px 40px rgba(0,0,0,0.20)',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 999, background: c.border, margin: '0 auto 14px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.text, letterSpacing: '-0.02em' }}>단식 단계</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: c.text3, fontVariantNumeric: 'tabular-nums' }}>14:32:08 경과</div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column' }}>
          {STAGES.map((s, i) => (
            <div key={s.hours} style={{
              display: 'flex', gap: 14, padding: '14px 0',
              borderTop: i > 0 ? `1px solid ${c.border}` : 'none',
            }}>
              <div style={{
                width: 52, flexShrink: 0, textAlign: 'right',
                fontFamily: FONT_MONO, fontWeight: 700, fontSize: 20,
                color: s.current ? c.fasting : c.text3,
                letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
              }}>{s.hours}h</div>
              <div style={{
                width: 12, position: 'relative', marginTop: 6,
              }}>
                <div style={{ width: 2, background: c.border, position: 'absolute', top: 0, bottom: -14, left: 5 }}></div>
                <div style={{
                  width: 12, height: 12, borderRadius: 999,
                  background: s.current ? c.fasting : c.canvas,
                  border: `2px solid ${s.current ? c.fasting : c.border}`,
                  position: 'relative', zIndex: 1,
                }}></div>
              </div>
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{s.title}</span>
                  {s.current && (
                    <span style={{ padding: '2px 8px', borderRadius: 999, background: c.fastingSoft, color: c.fastingInk, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>현재</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: c.text3, marginTop: 4, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes eat-fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

Object.assign(window, { StagesSheet, STAGES });
