import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader, GlassCard } from '../ui';
import { personalInfo, stats } from '../../data/portfolio';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          setCount(Math.ceil(current));
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-container">
        <SectionHeader label="About Me" title="Know Me Better" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
              {personalInfo.bio}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {personalInfo.bioExtended}
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {stats.map((stat, i) => (
              <GlassCard key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700,
                  background: 'var(--accent-gradient)', backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
