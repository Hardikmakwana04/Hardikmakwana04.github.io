import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, GlassCard } from '../ui';
import { projects } from '../../data/portfolio';

export default function Projects() {
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

  return (
    <section className="section" id="projects">
      <div className="section-container">
        <SectionHeader
          label="Projects"
          title="What I've Built"
          subtitle="Bringing ideas to life through code and collaboration."
        />

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {projects.map((project, i) => (
            <GlassCard key={i} style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{project.subtitle}</div>
                </div>
                <span style={{
                  padding: '6px 16px', borderRadius: 50, fontSize: '0.8rem',
                  background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <i className="fas fa-calendar-alt" /> {project.date}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="fas fa-users" /> Team Size: {project.teamSize}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="fas fa-clock" /> Duration: {project.duration}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {project.techStack.map(tech => (
                  <span key={tech} style={{
                    padding: '4px 14px', borderRadius: 50, fontSize: '0.75rem',
                    background: 'rgba(130,81,238,0.1)', color: 'var(--accent-1)', fontWeight: 600,
                    border: '1px solid rgba(130,81,238,0.15)',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <ul style={{ marginBottom: 20 }}>
                {project.features.map((f, j) => (
                  <li key={j} style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                    padding: '4px 0 4px 16px', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 12, width: 6, height: 6,
                      borderRadius: '50%', background: 'var(--accent-2)', opacity: 0.5,
                    }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px',
                    borderRadius: 50, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                    background: 'var(--accent-gradient)', backgroundSize: '200% auto', color: '#fff',
                    boxShadow: '0 4px 20px rgba(130,81,238,0.35)', border: 'none',
                  }}
                >
                  <i className="fab fa-github" /> View on GitHub
                </motion.a>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => forceDownload(project.documentationUrl, 'Project Documentation.pdf')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px',
                    borderRadius: 50, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                    background: 'transparent', color: 'var(--text-primary)',
                    border: '1.5px solid var(--border-glass)', backdropFilter: 'blur(10px)',
                  }}
                >
                  <i className="fas fa-file-pdf" /> Download Documentation
                </motion.button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
