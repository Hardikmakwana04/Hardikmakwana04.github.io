/* ===== CERTIFICATE MODAL ===== */
function openCertificateModal(imgSrc, title) {
    const overlay = document.getElementById('cert-modal-overlay');
    const img = document.getElementById('cert-modal-img');
    const titleEl = document.getElementById('cert-modal-title');
    if (!overlay || !img || !titleEl) return;

    img.src = imgSrc;
    titleEl.textContent = title;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const overlay = document.getElementById('cert-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertificateModal();
});

/* ===== FORCE DOWNLOAD UTILITY ===== */
function forceDownload(fileUrl, fileName) {
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            // Fallback: open in new tab if fetch fails (e.g. CORS)
            window.open(fileUrl, '_blank');
        });
}

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
            initAnimations();
        }
    });
});

/* ===== CUSTOM CURSOR ===== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        ringX += (mouseX - ringX) * 0.08;
        ringY += (mouseY - ringY) * 0.08;

        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
        cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .skill-card, .stat-card, .social-link, .tool-item, .soft-skill-tag, .language-card, .cert-card, input, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ===== NAVBAR ===== */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navOverlay?.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

navAnchors.forEach(a => {
    a.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
        navOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ===== BACK TO TOP ===== */
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});
backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== TYPED EFFECT ===== */
function typeEffect() {
    const el = document.querySelector('.typed-text');
    if (!el) return;

    const texts = [
        'AI & Data Science Enthusiast',
        'Full-Stack Developer',
        'Flutter Developer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const current = texts[textIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

typeEffect();

/* ===== GSAP + SCROLLTRIGGER ANIMATIONS ===== */
gsap.registerPlugin(ScrollTrigger);

function createScrollAnimation(targets, triggerEl, fromVars, staggerVal) {
    const elements = gsap.utils.toArray(targets);
    if (elements.length === 0) return;

    // Set initial hidden state
    gsap.set(elements, { opacity: 0, ...fromVars });

    // Create scroll-triggered animation to visible state
    ScrollTrigger.create({
        trigger: triggerEl || elements[0],
        start: 'top 90%',
        once: true,
        onEnter: () => {
            gsap.to(elements, {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: staggerVal || 0,
                ease: 'power3.out',
                clearProps: 'transform'
            });
        }
    });
}

function initAnimations() {
    // Hero stagger animations (no ScrollTrigger needed, plays immediately)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    heroTl
        .from('.hero-badge', { opacity: 0, y: 30 })
        .from('.hero-name', { opacity: 0, y: 40 }, '-=0.5')
        .from('.hero-tagline', { opacity: 0, y: 30 }, '-=0.5')
        .from('.hero-description', { opacity: 0, y: 30 }, '-=0.5')
        .from('.hero-actions .btn', { opacity: 0, y: 20, stagger: 0.15 }, '-=0.4')
        .from('.hero-socials .social-link', { opacity: 0, scale: 0, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3')
        .from('.hero-image-container', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
        .from('.hero-float-card', { opacity: 0, scale: 0, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.5');

    // Section header animations
    gsap.utils.toArray('.section-header').forEach(header => {
        createScrollAnimation(header.children, header, { y: 40 }, 0.12);
    });

    // About text
    createScrollAnimation('.about-text p', '.about-text', { y: 30 }, 0.15);

    // Stat cards
    createScrollAnimation('.stat-card', '.about-stats', { y: 40 }, 0.12);

    // Skill cards
    createScrollAnimation('.skill-card', '.skills-grid', { y: 30 }, 0.04);

    // Tools
    createScrollAnimation('.tool-item', '.tools-grid', { x: -30 }, 0.08);

    // Soft skills
    createScrollAnimation('.soft-skill-tag', '.soft-skills-wrap', { scale: 0.5 }, 0.04);

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach(item => {
        createScrollAnimation(item, item, { x: -40 });
    });

    // Experience card
    createScrollAnimation('.experience-card', '.experience-card', { y: 50 });

    // Project card
    createScrollAnimation('.project-card', '.project-card', { y: 50 });

    // Certificate card
    createScrollAnimation('.cert-card', '.cert-card', { y: 30 });

    // Language cards
    createScrollAnimation('.language-card', '.languages-wrap', { y: 30 }, 0.1);

    // Contact section
    createScrollAnimation('.contact-info', '.contact-grid', { x: -40 });
    createScrollAnimation('.contact-form', '.contact-grid', { x: 40 });

    // Parallax for gradient orbs
    gsap.to('.orb-1', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: -150, ease: 'none'
    });
    gsap.to('.orb-2', {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: -80, ease: 'none'
    });

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('.section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (link) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.style.color = 'var(--text-primary)';
            } else {
                link.style.color = '';
            }
        }
    });
});

/* ===== EMAILJS CONTACT FORM ===== */
// Initialize EmailJS - Replace these with your actual credentials
const EMAILJS_PUBLIC_KEY = 'mgQcOPPQ60gbla8xg';
const EMAILJS_SERVICE_ID = 'service_giyrex4';
const EMAILJS_TEMPLATE_ID = 'template_m71jkxb';

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: this.querySelector('#name').value,
        from_email: this.querySelector('#email').value,
        subject: this.querySelector('#subject').value,
        message: this.querySelector('#message').value,
        to_email: 'work.hardikm@gmail.com'
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                contactForm.reset();
            })
            .catch((error) => {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or email me directly.';
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                setTimeout(() => { formStatus.style.display = 'none'; formStatus.className = 'form-status'; }, 6000);
            });
    } else {
        // Fallback: mailto
        const mailtoLink = `mailto:work.hardikm@gmail.com?subject=${encodeURIComponent(templateParams.subject)}&body=${encodeURIComponent(`Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\n\n${templateParams.message}`)}`;
        window.location.href = mailtoLink;
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Opening your email client...';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        setTimeout(() => { formStatus.style.display = 'none'; formStatus.className = 'form-status'; }, 6000);
    }
});

/* ===== INTERSECTION OBSERVER FOR COUNTER ANIMATION ===== */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = prefix + Math.ceil(current) + suffix;
        }, 30);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

/* ===== FIREBASE VISITOR TRACKING ===== */
(function () {
    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCznSsuyWuQppCnT9dln4peFfWkoqwu5gI",
        authDomain: "portfolio-visitor-tracke-c2a0c.firebaseapp.com",
        databaseURL: "https://portfolio-visitor-tracke-c2a0c-default-rtdb.firebaseio.com",
        projectId: "portfolio-visitor-tracke-c2a0c",
        storageBucket: "portfolio-visitor-tracke-c2a0c.firebasestorage.app",
        messagingSenderId: "578184485197",
        appId: "1:578184485197:web:055a44c6fe3bb03dcc3f04"
    };

    // Initialize Firebase
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();

        // Record this visit
        recordVisit(db);

        // Check if admin mode
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'hardik') {
            showAdminPanel(db);
        }
    }

    function recordVisit(db) {
        const now = new Date();
        const visitData = {
            timestamp: now.toISOString(),
            date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            browser: getBrowserName(),
            screen: window.screen.width + 'x' + window.screen.height,
            referrer: document.referrer || 'Direct'
        };

        // Push visit log
        db.ref('visits').push(visitData);

        // Increment counter
        db.ref('visitorCount').transaction(function (current) {
            return (current || 0) + 1;
        });
    }

    function getBrowserName() {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Edg')) return 'Edge';
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
        return 'Unknown';
    }

    function showAdminPanel(db) {
        const panel = document.getElementById('admin-panel');
        const closeBtn = document.getElementById('admin-close');
        if (!panel) return;

        panel.classList.add('visible');

        closeBtn?.addEventListener('click', () => {
            panel.classList.remove('visible');
        });

        // Load total visitor count (real-time)
        db.ref('visitorCount').on('value', (snapshot) => {
            const count = snapshot.val() || 0;
            const el = document.getElementById('visitor-count');
            if (el) el.textContent = count.toLocaleString();
        });

        // Load recent visits
        db.ref('visits').orderByChild('timestamp').limitToLast(50).on('value', (snapshot) => {
            const listEl = document.getElementById('visitors-list');
            const todayCountEl = document.getElementById('today-count');
            if (!listEl) return;

            const visits = [];
            snapshot.forEach((child) => {
                visits.push(child.val());
            });
            visits.reverse(); // Most recent first

            // Count today's visits
            const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            const todayVisits = visits.filter(v => v.date === today).length;
            if (todayCountEl) todayCountEl.textContent = todayVisits;

            // Render visit list
            if (visits.length === 0) {
                listEl.innerHTML = '<div class="admin-empty">No visitors yet</div>';
                return;
            }

            listEl.innerHTML = visits.map(v => `
                <div class="admin-visitor-item">
                    <div class="visitor-info">
                        <span class="visitor-browser"><i class="fas fa-globe"></i> ${v.browser || 'Unknown'}</span>
                        <span class="visitor-screen"><i class="fas fa-desktop"></i> ${v.screen || 'N/A'}</span>
                        <span class="visitor-referrer"><i class="fas fa-link"></i> ${v.referrer || 'Direct'}</span>
                    </div>
                    <div class="visitor-time">
                        <span class="visitor-date"><i class="fas fa-calendar"></i> ${v.date}</span>
                        <span class="visitor-clock"><i class="fas fa-clock"></i> ${v.time}</span>
                    </div>
                </div>
            `).join('');
        });
    }
})();
