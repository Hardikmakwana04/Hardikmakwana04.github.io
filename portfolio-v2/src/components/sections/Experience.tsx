import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SectionHeader, GlassCard, CertificateModal } from '../ui';
import { experience } from '../../data/portfolio';

export default function Experience() {
  const [modalData, setModalData] = useState<{ image: string; title: string } | null>(null);

  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader label="Experience" title="Professional Journey" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800, margin: '0 auto' }}>
          {experience.map((exp, i) => (
            <GlassCard key={i} style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, marginBottom: 4 }}>
                    {exp.role}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className={`fas ${exp.icon}`} style={{ color: 'var(--accent-1)' }} />
                    {exp.company}
                  </div>
                </div>
                <span style={{
                  padding: '6px 16px', borderRadius: 50, fontSize: '0.8rem',
                  background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <i className="fas fa-calendar-alt" /> {exp.period}
                </span>
              </div>

              <ul>
                {exp.highlights.map((h, j) => (
                  <li key={j} style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                    padding: '4px 0 4px 16px', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 12, width: 6, height: 6,
                      borderRadius: '50%', background: 'var(--accent-2)', opacity: 0.5,
                    }} />
                    {h}
                  </li>
                ))}
              </ul>

              {exp.certificateImage && (
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => setModalData({ image: exp.certificateImage!, title: exp.certificateTitle! })}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px',
                      background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                      borderRadius: 50, color: 'var(--accent-1)', cursor: 'pointer', fontSize: '0.9rem',
                      fontWeight: 500, transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
                  >
                    <i className="fas fa-certificate" /> View Certificate
                  </button>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalData && <CertificateModal image={modalData.image} title={modalData.title} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </section>
  );
}
