import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const forceDownload = useCallback((url: string, filename: string) => {
    fetch(url)
      .then(r => r.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      })
      .catch(() => window.open(url, '_blank'));
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="gradient-text"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}
          >
            {personalInfo.initials}.
          </a>

          {/* Desktop nav */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navItems.map(item => (
              <a key={item.href} href={item.href}
                onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                style={{
                  fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)',
                  transition: 'color 0.3s', cursor: 'pointer', position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item.label}
              </a>
            ))}
            <button onClick={() => forceDownload(personalInfo.resumeUrl, 'Hardik Makwana Resume.pdf')}
              style={{
                padding: '10px 24px', background: 'var(--accent-gradient)', backgroundSize: '200% auto',
                borderRadius: 50, color: '#fff', fontWeight: 600, fontSize: '0.85rem', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 15px rgba(130, 81, 238, 0.3)', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundPosition = 'left center'; e.currentTarget.style.transform = ''; }}
            >
              <i className="fas fa-download" /> Resume
            </button>
          </div>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer',
              padding: 4, background: 'none', border: 'none',
            }}
          >
            <span style={{
              width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 2,
              transition: 'all 0.3s',
              transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 2,
              transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 2,
              transition: 'all 0.3s',
              transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998 }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 280, zIndex: 9999,
                background: 'rgba(17, 17, 24, 0.95)', backdropFilter: 'blur(20px)',
                padding: '80px 24px 24px', display: 'flex', flexDirection: 'column', gap: 24,
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {navItems.map(item => (
                <a key={item.href} href={item.href}
                  onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                  style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
