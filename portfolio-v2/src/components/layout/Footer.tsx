import { personalInfo } from '../../data/portfolio';

const footerNavItems = ['about', 'skills', 'education', 'experience', 'projects', 'contact'];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)', padding: '48px 24px 32px',
      borderTop: '1px solid var(--border-glass)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="gradient-text"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, display: 'inline-block', marginBottom: 24 }}
        >
          {personalInfo.name}
        </a>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {footerNavItems.map(item => (
            <a key={item} href={`#${item}`}
              style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.3s', textTransform: 'capitalize' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          {Object.entries(personalInfo.socials).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer"
              style={{
                width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--accent-1)';
                e.currentTarget.style.borderColor = 'var(--accent-1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-glass)';
                e.currentTarget.style.transform = '';
              }}
            >
              <i className={`fab fa-${key === 'linkedin' ? 'linkedin-in' : key}`} />
            </a>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--border-glass)', marginBottom: 24 }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Crafted with ❤️
        </p>
      </div>
    </footer>
  );
}
