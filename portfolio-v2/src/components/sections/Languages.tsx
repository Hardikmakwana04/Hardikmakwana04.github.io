import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '../ui';
import { languages } from '../../data/portfolio';

const flagEmojis: Record<string, string> = {
  English: '🇬🇧',
  Hindi: '🇮🇳',
  Gujarati: '🏛️',
};

export default function Languages() {
  return (
    <section className="section" id="languages">
      <div className="section-container">
        <SectionHeader label="Languages" title="Languages I Speak" />

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}
        >
          {languages.map((lang, i) => (
            <motion.div key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard style={{ padding: '28px 36px', textAlign: 'center', minWidth: 180 }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>
                  {flagEmojis[lang.name] || '🌐'}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>
                  {lang.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {lang.level}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
