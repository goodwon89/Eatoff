// SettingsScreen

function Toggle({ on, onChange, dark }) {
  const c = eatColors(dark);
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 999,
      background: on ? c.text : c.border, position: 'relative',
      border: 0, cursor: 'pointer', transition: 'background 200ms',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 21 : 3,
        width: 20, height: 20, borderRadius: 999,
        background: on ? c.surface : c.surface,
        border: on ? 0 : `1px solid ${c.border}`,
        transition: 'left 200ms',
      }}></div>
    </button>
  );
}

function SettingsRow({ icon, label, desc, right, dark, first }) {
  const c = eatColors(dark);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderTop: first ? 'none' : `1px solid ${c.border}`,
    }}>
      {icon && (
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: c.surfaceAlt,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.text2,
        }}>
          <i data-lucide={icon} style={{ width: 16, height: 16 }}></i>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: c.text3, marginTop: 2 }}>{desc}</div>}
      </div>
      {right}
    </div>
  );
}

function SettingsScreen({ dark, onToggleTheme }) {
  const c = eatColors(dark);
  const [notifStart, setNotifStart] = React.useState(true);
  const [notifGoal, setNotifGoal] = React.useState(true);
  const [notifStage, setNotifStage] = React.useState(false);
  return (
    <div>
      <div style={{ padding: '20px 24px 8px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: c.text }}>설정</div>
      </div>

      {/* Theme */}
      <div style={{ padding: '10px 16px 6px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, padding: '8px 8px 10px' }}>테마</div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 6 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {[
              { id: 'light', icon: 'sun', label: '라이트' },
              { id: 'dark', icon: 'moon', label: '다크' },
              { id: 'system', icon: 'smartphone', label: '시스템' },
            ].map(m => {
              const active = (m.id === 'dark' && dark) || (m.id === 'light' && !dark);
              return (
                <button key={m.id} onClick={() => onToggleTheme(m.id)} style={{
                  padding: '10px 8px', borderRadius: 10, border: 0, cursor: 'pointer',
                  background: active ? c.surfaceAlt : 'transparent',
                  color: active ? c.text : c.text3,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  fontFamily: FONT_SANS,
                }}>
                  <i data-lucide={m.icon} style={{ width: 18, height: 18 }}></i>
                  <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '10px 16px 6px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, padding: '8px 8px 10px' }}>알림</div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
          <SettingsRow first icon="bell" label="단식 시작 알림" desc="예정된 시간에 푸시" dark={dark} right={<Toggle on={notifStart} onChange={setNotifStart} dark={dark}/>}/>
          <SettingsRow icon="target" label="목표 달성 알림" desc="단식 목표 시간 도달 시" dark={dark} right={<Toggle on={notifGoal} onChange={setNotifGoal} dark={dark}/>}/>
          <SettingsRow icon="flame" label="단계 전환 알림" desc="지방 연소, 케토시스 등 진입 시" dark={dark} right={<Toggle on={notifStage} onChange={setNotifStage} dark={dark}/>}/>
        </div>
      </div>

      {/* Data */}
      <div style={{ padding: '10px 16px 30px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: c.text3, padding: '8px 8px 10px' }}>데이터</div>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
          <SettingsRow first icon="download" label="로컬 백업" desc="기록 데이터를 파일로 저장" dark={dark} right={<i data-lucide="chevron-right" style={{ width: 18, height: 18, color: c.text3 }}></i>}/>
          <SettingsRow icon="upload" label="복원" desc="백업 파일에서 불러오기" dark={dark} right={<i data-lucide="chevron-right" style={{ width: 18, height: 18, color: c.text3 }}></i>}/>
          <SettingsRow icon="trash-2" label={<span style={{ color: c.fasting }}>데이터 초기화</span>} desc="모든 기록을 삭제합니다" dark={dark} right={<i data-lucide="chevron-right" style={{ width: 18, height: 18, color: c.text3 }}></i>}/>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: c.text3, fontFamily: FONT_MONO }}>Eatoff v1.0.0</div>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen, Toggle, SettingsRow });
