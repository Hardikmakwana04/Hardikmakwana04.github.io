import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, GlassCard, CertificateModal } from '../ui';
import { certificates } from '../../data/portfolio';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Certificates() {
  const [modalData, setModalData] = useState<{ image: string; title: string } | null>(null);

  return (
    <section className="section" id="certificates" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader label="Certificates" title="Certifications & Achievements" />

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}
        >
          {certificates.map((cert, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard
                onClick={() => setModalData({ image: cert.image, title: cert.title })}
                style={{
                  padding: 20, cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 48, height: 48, minWidth: 48, borderRadius: 12,
                  background: 'rgba(130,81,238,0.1)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-1)', fontSize: '1.2rem',
                }}>
                  <i className={`fas ${cert.icon}`} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {cert.title}
                    <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem', opacity: 0.5 }} />
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 2 }}>{cert.issuer}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.7 }}>{cert.description}</p>
                </div>

                <img src={cert.image} alt={cert.title} style={{
                  width: 60, height: 42, objectFit: 'cover', borderRadius: 6,
                  border: '1px solid var(--border-glass)', opacity: 0.8,
                }} />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalData && <CertificateModal image={modalData.image} title={modalData.title} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </section>
  );
}
