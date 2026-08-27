// PlansScreen — preset plans + custom slider

const PLANS = [
  { id: '14:10', ratio: [14, 10], label: '이지 (초보자)', desc: '14시간 단식 · 10시간 식사' },
  { id: '16:8',  ratio: [16, 8],  label: '표준', desc: '16시간 단식 · 8시간 식사' },
  { id: '18:6',  ratio: [18, 6],  label: '지방 연소', desc: '18시간 단식 · 6시간 식사' },
  { id: '20:4',  ratio: [20, 4],  label: '워리어', desc: '20시간 단식 · 4시간 식사' },
  { id: '23:1',  ratio: [23, 1],  label: 'OMAD · 1일 1식', desc: '23시간 단식 · 1시간 식사' },
];

function PlanRow({ plan, active, onSelect, dark }) {
  const c = eatColors(dark);
  return (
    <button onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      width: '100%', textAlign: 'left', cursor: 'pointer',
      background: c.surface,
      border: `1px solid ${active ? c.text : c.border}`,
      borderRadius: 14, padding: '14px 16px',
    }}>
      <div style={{
        width: 56, textAlign: 'center',
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 20,
        color: active ? c.fasting : c.text,
        letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
      }}>{plan.id}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{plan.label}</div>
        <div style={{ fontSize: 12, color: c.text3, marginTop: 2 }}>{plan.desc}</div>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        border: `2px solid ${active ? c.text : c.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {active && <div style={{ width: 10, height: 10, borderRadius: 999, background: c.text }}></div>}
      </div>
    </button>
  );
}

function PlansScreen({ dark, currentPlan, onPickPlan }) {
  const c = eatColors(dark);
  const [customFast, setCustomFast] = React.useState(16);
  return (
    <div>
      <div style={{ padding: '20px 24px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: c.text }}>플랜</div>
        <div style={{ fontSize: 13, color: c.text3, marginTop: 4 }}>단식 주기를 선택하거나 직접 만드세요</div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PLANS.map(p => (
          <PlanRow key={p.id} plan={p}
            active={currentPlan === p.id}
            onSelect={() => onPickPlan(p.id)}
            dark={dark}
          />
        ))}
      </div>

      {/* Custom */}
      <div style={{ padding: '16px 16px 24px' }}>
        <div style={{
          background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>커스텀 플랜</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: c.text3 }}>{customFast}:{24 - customFast}</div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums',
            fontSize: 13, fontWeight: 500, color: c.text2, marginTop: 14,
            whiteSpace: 'nowrap',
          }}>
            <span><b style={{ color: c.fasting, fontWeight: 700 }}>{customFast}h</b> 단식</span>
            <span><b style={{ color: c.eating, fontWeight: 700 }}>{24 - customFast}h</b> 식사</span>
          </div>
          <input
            type="range" min="10" max="23" value={customFast}
            onChange={e => setCustomFast(parseInt(e.target.value))}
            style={{ width: '100%', marginTop: 14, accentColor: c.fasting }}
          />
          <button onClick={() => onPickPlan(`${customFast}:${24 - customFast}`)} style={{
            marginTop: 10, width: '100%', height: 44, borderRadius: 999, border: 0,
            background: c.text, color: c.canvas, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            fontFamily: FONT_SANS,
          }}>이 플랜으로 시작</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PlansScreen, PLANS });
