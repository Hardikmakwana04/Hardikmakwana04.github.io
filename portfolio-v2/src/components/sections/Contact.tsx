import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionHeader } from '../ui';
import { personalInfo, emailjsConfig } from '../../data/portfolio';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey,
      );
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const contactDetails = [
    { icon: 'fa-envelope', label: 'Email', value: personalInfo.email },
    { icon: 'fa-phone', label: 'Phone', value: personalInfo.phone },
    { icon: 'fa-map-marker-alt', label: 'Location', value: personalInfo.location },
  ];

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Let's talk!"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 1000, margin: '0 auto' }}>
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>
              Let's Build Something{' '}
              <span className="gradient-text">Amazing</span>
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
              {contactDetails.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, minWidth: 44, borderRadius: 12,
                    background: 'rgba(130,81,238,0.1)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-1)', fontSize: '1rem',
                  }}>
                    <i className={`fas ${item.icon}`} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              {Object.entries(personalInfo.socials).map(([key, url]) => (
                <motion.a key={key} href={url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{
                    width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'all 0.3s',
                  }}
                >
                  <i className={`fab fa-${key === 'linkedin' ? 'linkedin-in' : key}`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form ref={formRef} onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label htmlFor="from_name">Your Name</label>
                <input type="text" id="from_name" name="from_name" placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="from_email">Your Email</label>
                <input type="email" id="from_email" name="from_email" placeholder="john@example.com" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Project Discussion" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell me about your project..." required />
            </div>
            <input type="hidden" name="to_email" value={personalInfo.email} />

            <motion.button type="submit" disabled={status === 'sending'}
              whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 32px', borderRadius: 50, fontSize: '0.9rem', fontWeight: 600,
                background: 'var(--accent-gradient)', backgroundSize: '200% auto', color: '#fff',
                border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                boxShadow: '0 4px 20px rgba(130,81,238,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? (
                <><i className="fas fa-spinner fa-spin" /> Sending...</>
              ) : (
                <><i className="fas fa-paper-plane" /> Send Message</>
              )}
            </motion.button>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: 'var(--accent-2)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fas fa-check-circle" /> Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', color: 'var(--accent-3)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fas fa-exclamation-circle" /> Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .section-container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
