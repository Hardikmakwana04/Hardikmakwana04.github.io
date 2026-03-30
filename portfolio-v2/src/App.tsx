import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import IconSidebar from './components/layout/IconSidebar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Languages from './components/sections/Languages';
import Contact from './components/sections/Contact';

function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, background: 'var(--bg-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 32, zIndex: 99999,
      }}
    >
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '3px solid transparent', borderTopColor: 'var(--accent-1)', borderRightColor: 'var(--accent-2)',
          animation: 'rotate-ring 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 8, borderRadius: '50%',
          border: '3px solid transparent', borderBottomColor: 'var(--accent-3)', borderLeftColor: 'var(--accent-1)',
          animation: 'rotate-ring 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite reverse',
        }} />
        <div style={{
          position: 'absolute', width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(130,81,238,0.25), transparent 70%)',
          filter: 'blur(15px)',
        }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-muted)',
        letterSpacing: 6, textTransform: 'uppercase', display: 'flex', gap: 2,
      }}>
        {'LOADING'.split('').map((char, i) => (
          <span key={i} style={{
            display: 'inline-block',
            animation: `preloader-letter 1.4s ease-in-out infinite ${i * 0.08}s`,
          }}>
            {char}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes preloader-letter {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-6px); color: var(--accent-1); }
        }
      `}</style>
    </motion.div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed', bottom: 32, left: 32, width: 48, height: 48,
            borderRadius: '50%', background: 'var(--accent-gradient)', backgroundSize: '200% auto',
            border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', zIndex: 9990,
            boxShadow: '0 4px 20px rgba(130,81,238,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="fas fa-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Scrollable content wrapper — overflow-x:hidden here does NOT clip fixed children */}
      {!loading && (
        <div style={{ overflowX: 'hidden' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Education />
            <Experience />
            <Projects />
            <Certificates />
            <Languages />
            <Contact />
            <Footer />
          </motion.div>
        </div>
      )}

      {/* Fixed overlays — outside any overflow container, render at viewport level */}
      {!loading && <IconSidebar />}
      {!loading && <BackToTop />}
    </>
  );
}
