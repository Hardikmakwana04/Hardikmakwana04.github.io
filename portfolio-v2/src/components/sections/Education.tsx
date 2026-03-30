import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, CertificateModal } from '../ui';
import { education } from '../../data/portfolio';

export default function Education() {
  const [openSemester, setOpenSemester] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ image: string; title: string } | null>(null);

  return (
    <section className="section" id="education">
      <div className="section-container">
        <SectionHeader label="Education" title="Academic Journey" />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 20, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(to bottom, var(--accent-1), var(--accent-2))',
            opacity: 0.3, borderRadius: 2,
          }} />

          {education.map((edu, i) => (
            <motion.div key={edu.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ display: 'flex', gap: 24, marginBottom: 40, position: 'relative' }}
            >
              {/* Timeline node */}
              <div style={{
                width: 42, height: 42, minWidth: 42, borderRadius: '50%',
                background: 'var(--accent-gradient)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#fff',
                position: 'relative', zIndex: 1, boxShadow: '0 0 20px rgba(130,81,238,0.3)',
              }}>
                <i className={`fas ${edu.icon}`} />
              </div>

              {/* Card */}
              <div className="glass-card" style={{ padding: 24, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    padding: '4px 14px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600,
                    background: edu.status === 'pursuing' ? 'rgba(130,81,238,0.15)' : 'rgba(0,212,170,0.15)',
                    color: edu.status === 'pursuing' ? 'var(--accent-1)' : 'var(--accent-2)',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <i className={`fas ${edu.status === 'pursuing' ? 'fa-clock' : 'fa-check-circle'}`} />
                    {edu.status === 'pursuing' ? 'Pursuing' : 'Completed'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="fas fa-calendar-alt" /> {edu.period}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, marginBottom: 8 }}>
                  {edu.degree}
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <i className="fas fa-university" style={{ marginTop: 4 }} />
                  {edu.institution} — {edu.location}
                </div>

                <ul style={{ marginBottom: 16 }}>
                  {edu.highlights.map((h, j) => (
                    <li key={j} style={{
                      fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6,
                      padding: '4px 0 4px 16px', position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute', left: 0, top: 12, width: 6, height: 6,
                        borderRadius: '50%', background: 'var(--accent-1)', opacity: 0.5,
                      }} />
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: edu.semester1 ? 16 : 0 }}>
                  {edu.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem',
                      background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                      color: 'var(--accent-1)', fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Semester Results */}
                {edu.semester1 && (
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => setOpenSemester(openSemester === edu.id ? null : edu.id)}
                      style={{
                        width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem',
                        fontWeight: 500, transition: 'all 0.3s',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fas fa-chart-bar" style={{ color: 'var(--accent-1)' }} />
                        Semester 1 Results — Nov 2025
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', background: 'rgba(130,81,238,0.15)', color: 'var(--accent-1)' }}>
                          SGPA: {edu.semester1.sgpa}
                        </span>
                        <span style={{ padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', background: 'rgba(0,212,170,0.15)', color: 'var(--accent-2)' }}>
                          Grade: {edu.semester1.grade}
                        </span>
                        <i className={`fas fa-chevron-down`} style={{ transition: 'transform 0.3s', transform: openSemester === edu.id ? 'rotate(180deg)' : '' }} />
                      </span>
                    </button>

                    <AnimatePresence>
                      {openSemester === edu.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '16px 0' }}>
                            <div style={{ overflowX: 'auto' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                <thead>
                                  <tr>
                                    {['Subject', 'Type', 'Credits', 'Marks', '%', 'Grade'].map(h => (
                                      <th key={h} style={{
                                        padding: '10px 12px', textAlign: 'left',
                                        borderBottom: '1px solid var(--border-glass)',
                                        color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem',
                                      }}>
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {edu.semester1.subjects.map((sub, j) => (
                                    <tr key={j} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{sub.name}</td>
                                      <td style={{ padding: '10px 12px' }}>
                                        <span style={{
                                          padding: '2px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 600,
                                          background: sub.type === 'Theory' ? 'rgba(130,81,238,0.1)' : sub.type === 'Practical' ? 'rgba(0,212,170,0.1)' : 'rgba(255,107,107,0.1)',
                                          color: sub.type === 'Theory' ? 'var(--accent-1)' : sub.type === 'Practical' ? 'var(--accent-2)' : 'var(--accent-3)',
                                        }}>
                                          {sub.type}
                                        </span>
                                      </td>
                                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{sub.credits}</td>
                                      <td style={{ padding: '10px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>{sub.marks}</td>
                                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{sub.percent}</td>
                                      <td style={{ padding: '10px 12px' }}>
                                        <span style={{
                                          padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600,
                                          background: sub.grade.includes('+') ? 'rgba(0,212,170,0.15)' : sub.grade === 'A' ? 'rgba(130,81,238,0.15)' : 'rgba(255,200,50,0.15)',
                                          color: sub.grade.includes('+') ? 'var(--accent-2)' : sub.grade === 'A' ? 'var(--accent-1)' : '#f0c050',
                                        }}>
                                          {sub.grade}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0', flexWrap: 'wrap', gap: 12, marginTop: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                              {[
                                { label: 'Total Credits', value: edu.semester1.totalCredits },
                                { label: 'Credits Obtained', value: edu.semester1.creditsObtained },
                                { label: 'SGPA', value: edu.semester1.sgpa, highlight: true },
                                { label: 'Result', value: 'PASS', pass: true },
                              ].map((item, j) => (
                                <div key={j} style={{ textAlign: 'center' }}>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
                                  <div style={{
                                    fontSize: '1rem', fontWeight: 700,
                                    color: item.highlight ? 'var(--accent-1)' : item.pass ? 'var(--accent-2)' : 'var(--text-primary)',
                                  }}>
                                    {item.value}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div style={{ textAlign: 'center', marginTop: 12 }}>
                              <button onClick={() => setModalData({ image: edu.semester1!.marksheetImage, title: 'Semester 1 — Official Marksheet' })}
                                style={{
                                  padding: '10px 22px', background: 'var(--bg-glass)',
                                  border: '1px solid var(--border-glass)', borderRadius: 50,
                                  color: 'var(--accent-1)', cursor: 'pointer', fontSize: '0.9rem',
                                  fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8,
                                  transition: 'all 0.3s',
                                }}
                              >
                                <i className="fas fa-file-alt" /> View Official Marksheet
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalData && <CertificateModal image={modalData.image} title={modalData.title} onClose={() => setModalData(null)} />}
      </AnimatePresence>
    </section>
  );
}
