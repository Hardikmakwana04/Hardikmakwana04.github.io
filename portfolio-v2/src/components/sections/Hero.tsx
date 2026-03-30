import { Suspense, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import HeroScene from '../3d/HeroScene';

function TypedText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === current.length) speed = 2000;
    if (isDeleting && charIdx === 0) speed = 500;

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setTextIdx((textIdx + 1) % texts.length);
      } else {
        setCharIdx(prev => prev + (isDeleting ? -1 : 1));
        setDisplayed(current.substring(0, charIdx + (isDeleting ? -1 : 1)));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, textIdx, texts]);

  return (
    <span>
      {displayed}
      <span className="typed-cursor">|</span>
    </span>
  );
}

export default function Hero() {
  const forceDownload = useCallback((url: string, filename: string) => {
    fetch(url).then(r => r.blob()).then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }).catch(() => window.open(url, '_blank'));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 24px 80px',
    }}>
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130, 81, 238, 0.25), transparent 70%)',
          filter: 'blur(100px)', top: -200, right: -100, opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.15), transparent 70%)',
          filter: 'blur(100px)', bottom: -100, left: -100, opacity: 0.5,
        }} />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(130,81,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(130,81,238,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
      </div>

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Content */}
      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        style={{
          maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        }}
      >
        <div>
          <motion.div variants={itemVariants} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px',
            background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
            borderRadius: 50, fontSize: '0.8rem', color: 'var(--text-secondary)',
            marginBottom: 28, backdropFilter: 'blur(10px)',
          }}>
            <span style={{ width: 8, height: 8, background: 'var(--accent-2)', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />
            Available for Opportunities
          </motion.div>

          <motion.h1 variants={itemVariants} style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800, lineHeight: 1.1, marginBottom: 8, letterSpacing: -1,
          }}>
            Hi, I'm<br />
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          <motion.div variants={itemVariants} style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: 'var(--text-secondary)', marginBottom: 24, minHeight: '2rem',
          }}>
            <TypedText texts={personalInfo.taglines} />
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8,
            marginBottom: 36, maxWidth: 500,
          }}>
            {personalInfo.bio}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
            <a href="#contact" onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
                borderRadius: 50, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                background: 'var(--accent-gradient)', backgroundSize: '200% auto', color: '#fff',
                boxShadow: '0 4px 20px rgba(130, 81, 238, 0.35)', border: 'none',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundPosition = 'left center'; e.currentTarget.style.transform = ''; }}
            >
              <i className="fas fa-paper-plane" /> Get In Touch
            </a>
            <button onClick={() => forceDownload(personalInfo.resumeUrl, 'Hardik Makwana Resume.pdf')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px',
                borderRadius: 50, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                background: 'transparent', color: 'var(--text-primary)',
                border: '1.5px solid var(--border-glass)', backdropFilter: 'blur(10px)',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; e.currentTarget.style.transform = ''; }}
            >
              <i className="fas fa-file-arrow-down" /> Download Resume
            </button>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16 }}>
            {Object.entries(personalInfo.socials).map(([key, url]) => (
              <motion.a key={key} href={url} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'all 0.3s',
                }}
              >
                <i className={`fab fa-${key === 'linkedin' ? 'linkedin-in' : key}`} />
              </motion.a>
            ))}
            <motion.a href={`mailto:${personalInfo.email}`}
              whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{
                width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'all 0.3s',
              }}
            >
              <i className="fas fa-envelope" />
            </motion.a>
          </motion.div>
        </div>

        {/* Photo */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{ position: 'relative', width: 380, height: 380 }}
          >
            {/* Rotating rings */}
            <div style={{
              position: 'absolute', inset: -15, borderRadius: '50%',
              border: '2px solid transparent', borderTopColor: 'var(--accent-1)', borderRightColor: 'var(--accent-2)',
              animation: 'rotate-ring 8s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: -30, borderRadius: '50%',
              border: '1px solid transparent', borderBottomColor: 'rgba(130,81,238,0.3)', borderLeftColor: 'rgba(0,212,170,0.2)',
              animation: 'rotate-ring 12s linear infinite reverse',
            }} />

            <img src={personalInfo.photo} alt={personalInfo.name} style={{
              width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
              objectPosition: 'top center', border: '3px solid var(--border-glass)',
              position: 'relative', zIndex: 1,
            }} />

            {/* Glow */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(130,81,238,0.15), transparent 70%)',
              filter: 'blur(30px)', zIndex: 0,
            }} />

            {/* Float cards */}
            {[
              { emoji: '🎓', text: 'M.Sc. AI', top: 20, right: -20, delay: 0 },
              { emoji: '💻', text: '10+ Skills', bottom: 60, left: -30, delay: 1 },
              { emoji: '🚀', text: 'Open For Work', bottom: -10, right: 20, delay: 0.5 },
            ].map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  position: 'absolute', padding: '12px 20px', zIndex: 2,
                  background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-card)',
                  animation: `float-y ${4 + i * 0.5}s ease-in-out infinite ${card.delay}s`,
                  ...(card.top !== undefined ? { top: card.top } : {}),
                  ...(card.bottom !== undefined ? { bottom: card.bottom } : {}),
                  ...(card.left !== undefined ? { left: card.left } : {}),
                  ...(card.right !== undefined ? { right: card.right } : {}),
                }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: 8 }}>{card.emoji}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>{card.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          #hero > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          #hero > div:last-child > div:last-child { order: -1; }
          #hero > div:last-child > div:last-child > div { width: 280px !important; height: 280px !important; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
