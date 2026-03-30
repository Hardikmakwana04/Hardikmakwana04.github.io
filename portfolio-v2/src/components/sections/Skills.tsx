import { motion } from 'framer-motion';
import { SectionHeader } from '../ui';
import { skills } from '../../data/portfolio';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Skills() {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader
          label="Skills"
          title="My Technical Arsenal"
          subtitle="Technologies and tools I work with to build amazing digital experiences."
        />

        {/* Programming Languages & Frameworks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
            fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          <i className="fas fa-code" style={{ color: 'var(--accent-1)' }} />
          Programming Languages & Frameworks
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 12, marginBottom: 32,
          }}
        >
          {skills.programming.map((skill) => (
            <motion.div key={skill.name} variants={staggerItem}
              whileHover={{ y: -6, scale: 1.05, boxShadow: '0 8px 25px rgba(130, 81, 238, 0.15)' }}
              className="glass-card"
              style={{
                padding: '20px 12px', textAlign: 'center', cursor: 'default',
                transition: 'all 0.3s ease',
              }}
            >
              <i className={skill.icon} style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{skill.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
            fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          <i className="fas fa-tools" style={{ color: 'var(--accent-1)' }} />
          Tools & Technologies
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 32 }}
        >
          {skills.tools.map((tool) => (
            <motion.div key={tool.name} variants={staggerItem}
              whileHover={{ x: 4, borderColor: 'rgba(130, 81, 238, 0.3)' }}
              className="glass-card"
              style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all 0.3s ease',
              }}
            >
              <i className={tool.icon} style={{ fontSize: '1.4rem' }} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
            fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          <i className="fas fa-brain" style={{ color: 'var(--accent-1)' }} />
          Soft Skills
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
        >
          {skills.soft.map((skill) => (
            <motion.span key={skill} variants={staggerItem}
              whileHover={{ scale: 1.08, borderColor: 'var(--accent-1)' }}
              style={{
                padding: '8px 18px', borderRadius: 50, fontSize: '0.85rem', fontWeight: 500,
                background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)', cursor: 'default', transition: 'all 0.3s',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
