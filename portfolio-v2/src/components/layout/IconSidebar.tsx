import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'hero',         icon: 'fa-house',          label: 'Home',         href: '#hero',         color: '#a78bfa' },
  { id: 'about',        icon: 'fa-user',           label: 'About',        href: '#about',        color: '#60a5fa' },
  { id: 'skills',       icon: 'fa-code',           label: 'Skills',       href: '#skills',       color: '#34d399' },
  { id: 'education',    icon: 'fa-graduation-cap', label: 'Education',    href: '#education',    color: '#fbbf24' },
  { id: 'experience',   icon: 'fa-briefcase',      label: 'Experience',   href: '#experience',   color: '#f472b6' },
  { id: 'projects',     icon: 'fa-rocket',         label: 'Projects',     href: '#projects',     color: '#fb923c' },
  { id: 'certificates', icon: 'fa-certificate',    label: 'Certificates', href: '#certificates', color: '#38bdf8' },
  { id: 'languages',    icon: 'fa-globe',          label: 'Languages',    href: '#languages',    color: '#a3e635' },
  { id: 'contact',      icon: 'fa-envelope',       label: 'Contact',      href: '#contact',      color: '#e879f9' },
];

function DockItem({ 
  item, 
  isActive, 
  scrollTo 
}: { 
  item: NavItem; 
  isActive: boolean; 
  scrollTo: (href: string) => void;
}) {
  const [isHovered, setHovered] = useState(false);

  return (
    <div 
      className="hm-dock__slot"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated wrapper so the jump doesn't break hover detection */}
      <motion.div 
        animate={{
          scale: isHovered ? 1.35 : 1,
          x: isHovered ? -50 : 0,
          z: isHovered ? 80 : 0,
          rotateY: isHovered ? 15 : 0
        }}
        transition={{ type: "spring", mass: 0.2, stiffness: 450, damping: 15 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          transformStyle: 'preserve-3d',
          position: 'relative'
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="hm-dock__tip"
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              style={{ '--tip-c': item.color } as React.CSSProperties}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Button with 3D Transforms */}
        <button
          className={`hm-dock__btn ${isActive ? 'hm-dock__btn--on' : ''}`}
          style={{ 
            '--c': item.color,
            transformStyle: "preserve-3d"
          } as any}
          onClick={() => scrollTo(item.href)}
          aria-label={item.label}
        >
          <i className={`fas ${item.icon}`} style={{ transform: 'translateZ(15px)' }} />
          {isActive && <span className="hm-dock__ring" style={{ transform: 'translateZ(-5px)' }} />}
          {isActive && <span className="hm-dock__pulse" style={{ transform: 'translateZ(-15px)' }} />}
        </button>
      </motion.div>
    </div>
  );
}

export default function IconSidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
      const scrollMid = window.scrollY + window.innerHeight / 2;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const sec = document.getElementById(navItems[i].id);
        if (sec && sec.offsetTop <= scrollMid) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const navbarOffset = 80;

      let scrollTarget: number;

      if (sectionHeight <= viewportHeight - navbarOffset) {
        // Section fits in viewport → center it vertically
        scrollTarget = sectionTop - (viewportHeight - sectionHeight) / 2;
      } else {
        // Section is taller than viewport → scroll to top with comfortable offset
        scrollTarget = sectionTop - navbarOffset;
      }

      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
    }
  }, []);

  const activeColor = navItems[navItems.findIndex(n => n.id === activeSection)]?.color ?? '#8251ee';

  return createPortal(
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="hm-dock-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.nav
              aria-label="Section Navigation"
              className="hm-dock"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              style={{ perspective: 1200 }}
            >
              <div className="hm-dock__glow" style={{ '--glow-c': activeColor } as React.CSSProperties} />

              <div className="hm-dock__glass">
                {navItems.map((item) => (
                  <DockItem
                    key={item.id}
                    item={item}
                    isActive={activeSection === item.id}
                    scrollTo={scrollTo}
                  />
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hm-dock-wrapper {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 40px;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .hm-dock {
          position: relative;
          pointer-events: auto;
          transform-style: preserve-3d;
        }

        .hm-dock__glow {
          position: absolute;
          inset: -24px;
          border-radius: 60px;
          background: radial-gradient(ellipse at center, var(--glow-c, #8251ee) 0%, transparent 72%);
          opacity: 0.08;
          filter: blur(22px);
          pointer-events: none;
          transition: background 0.6s;
        }

        .hm-dock__glass {
          position: relative;
          z-index: 1;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px) saturate(120%);
          -webkit-backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transform-style: preserve-3d;
        }

        .hm-dock__slot {
          position: relative;
          display: flex;
          align-items: center;
          transform-style: preserve-3d;
        }

        .hm-dock__btn {
          --c: #8251ee;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.35);
          font-size: 1.4rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition:
            color 0.25s,
            background 0.25s,
            border-color 0.25s,
            box-shadow 0.25s;
          box-shadow: none;
        }

        .hm-dock__btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: color-mix(in srgb, var(--c) 40%, transparent);
          box-shadow:
            0 0 20px color-mix(in srgb, var(--c) 20%, transparent),
            0 15px 25px rgba(0,0,0,0.3);
        }

        .hm-dock__btn--on {
          color: #fff;
          background: color-mix(in srgb, var(--c) 15%, transparent);
          border-color: color-mix(in srgb, var(--c) 50%, transparent);
          box-shadow:
            0 0 24px color-mix(in srgb, var(--c) 25%, transparent);
        }

        .hm-dock__btn--on i {
          filter: drop-shadow(0 0 8px var(--c));
        }

        .hm-dock__ring {
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 2px solid var(--c, #8251ee);
          opacity: 0.65;
          pointer-events: none;
        }

        .hm-dock__pulse {
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 2px solid var(--c, #8251ee);
          pointer-events: none;
          animation: hm-pulse 2s ease-out infinite;
        }

        @keyframes hm-pulse {
          0%   { transform: scale(1) translateZ(-10px);   opacity: 0.6; }
          100% { transform: scale(1.7) translateZ(-10px); opacity: 0;   }
        }

        .hm-dock__tip {
          position: absolute;
          right: calc(100% + 16px);
          white-space: nowrap;
          padding: 8px 18px;
          background: linear-gradient(145deg,
            rgba(18,18,28,0.96),
            rgba(28,18,40,0.96)
          );
          backdrop-filter: blur(14px);
          border: 1px solid color-mix(in srgb, var(--tip-c, #8251ee) 45%, transparent);
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.4px;
          pointer-events: none;
          box-shadow:
            0 8px 28px rgba(0,0,0,0.55),
            0 0 16px color-mix(in srgb, var(--tip-c, #8251ee) 20%, transparent);
        }

        @media (max-width: 1024px) {
          .hm-dock-wrapper { display: none !important; }
        }

        @media (max-height: 680px) {
          .hm-dock__glass { gap: 4px; padding: 10px 10px; border-radius: 26px; }
          .hm-dock__btn { width: 44px; height: 44px; font-size: 1.1rem; border-radius: 13px; }
          .hm-dock__ring, .hm-dock__pulse { border-radius: 17px; inset: -3px; }
          .hm-dock__tip { font-size: 0.82rem; padding: 6px 14px; right: calc(100% + 10px); }
          .hm-dock-wrapper { right: 28px; }
        }

        @media (min-height: 900px) {
          .hm-dock__btn { width: 64px; height: 64px; font-size: 1.7rem; border-radius: 18px; }
          .hm-dock__glass { gap: 10px; padding: 20px 14px; }
          .hm-dock__ring, .hm-dock__pulse { border-radius: 22px; inset: -5px; }
        }
      `}</style>
    </>,
    document.body
  );
}
