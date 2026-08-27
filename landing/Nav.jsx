function Nav({ dark, onToggleDark }) {
  const c = tokens(dark);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? (dark ? 'rgba(10,10,10,0.85)' : 'rgba(245,245,240,0.85)') : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${c.border}` : '1px solid transparent',
      transition: 'all 260ms cubic-bezier(0.22, 1, 0.36, 1)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '18px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: FONT_SANS_LP,
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: c.text }}>
          <LogoMark size={28} dark={dark}/>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Eatoff</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { href: '#features', label: '기능' },
            { href: '#stages', label: '단식 단계' },
            { href: '#widgets', label: '위젯' },
            { href: '#download', label: '다운로드' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{
              fontSize: 14, fontWeight: 500, color: c.text2, textDecoration: 'none',
              transition: 'color 160ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = c.text}
            onMouseLeave={e => e.currentTarget.style.color = c.text2}
            >{l.label}</a>
          ))}
          <button onClick={onToggleDark} aria-label="Toggle dark mode" style={{
            width: 38, height: 38, borderRadius: 999,
            border: `1px solid ${c.border}`, background: c.surface, color: c.text,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i data-lucide={dark ? 'sun' : 'moon'} style={{ width: 16, height: 16 }}></i>
          </button>
          <PlayStoreBadge dark={dark}/>
        </nav>
      </div>
    </div>
  );
}

Object.assign(window, { Nav });
