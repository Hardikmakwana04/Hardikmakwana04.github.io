import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ textAlign: 'center', marginBottom: 64 }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-1)',
        textTransform: 'uppercase', letterSpacing: 3, marginBottom: 16,
      }}>
        <span style={{ width: 30, height: 1, background: 'var(--accent-1)', opacity: 0.4 }} />
        {label}
        <span style={{ width: 30, height: 1, background: 'var(--accent-1)', opacity: 0.4 }} />
      </div>

      <h2 className="gradient-text" style={{
        fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 700, marginBottom: subtitle ? 12 : 0,
      }}>
        {title}
      </h2>

      {subtitle && (
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          {subtitle}
        </p>
      )}

      <div style={{
        width: 60, height: 3, background: 'var(--accent-gradient)', backgroundSize: '200% auto',
        borderRadius: 3, margin: '20px auto 0', animation: 'shimmer 3s linear infinite',
      }} />
    </motion.div>
  );
}

export function GlassCard({ children, style, hover = true, onClick }: {
  children: ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 30px rgba(130, 81, 238, 0.08)' } : undefined}
      onClick={onClick}
      className="glass-card"
      style={{
        padding: 24,
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function CertificateModal({ image, title, onClose }: {
  image: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)', padding: 24, maxWidth: 800, width: '100%',
          maxHeight: '90vh', overflow: 'auto', position: 'relative',
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, width: 36, height: 36,
          borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none',
          color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className="fas fa-times" />
        </button>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>{title}</h3>
        <img src={image} alt={title} style={{ width: '100%', borderRadius: 'var(--radius-sm)' }} />
      </motion.div>
    </motion.div>
  );
}
