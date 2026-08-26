/* ===== CERTIFICATE MODAL ===== */
function openCertificateModal(src, title) {
    const overlay = document.getElementById('cert-modal-overlay');
    const img = document.getElementById('cert-modal-img');
    const titleEl = document.getElementById('cert-modal-title');
    const wrapper = document.querySelector('.cert-modal-img-wrapper');
    if (!overlay || !titleEl || !wrapper) return;

    titleEl.textContent = title;

    // Remove any existing iframe
    const oldIframe = wrapper.querySelector('iframe');
    if (oldIframe) oldIframe.remove();
    if (img) img.style.display = 'none';

    const isPdf = src.toLowerCase().endsWith('.pdf');
    if (isPdf) {
        // Show PDF in iframe
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.style.cssText = 'width:100%;height:70vh;border:none;border-radius:var(--radius-md);';
        wrapper.appendChild(iframe);
    } else {
        // Show image
        if (img) {
            img.src = src;
            img.style.display = 'block';
        }
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    const overlay = document.getElementById('cert-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Clean up iframe on close
    const wrapper = document.querySelector('.cert-modal-img-wrapper');
    if (wrapper) {
        const iframe = wrapper.querySelector('iframe');
        if (iframe) iframe.remove();
    }
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

/* ===== 3D PHOTO TILT EFFECT ===== */
function initPhoto3DTilt() {
    const container = document.getElementById('hero-image-container');
    if (!container) return;

    const MAX_TILT = 18;       // max rotation in degrees
    const SCALE_HOVER = 1.04;  // slight scale-up on hover
    const LERP = 0.12;         // smoothing factor (lower = smoother/slower)

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;
    let isHovering = false;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
        currentX = lerp(currentX, targetX, LERP);
        currentY = lerp(currentY, targetY, LERP);

        container.style.transform =
            `perspective(900px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${isHovering ? SCALE_HOVER : 1})`;

        // Keep animating until values settle
        if (Math.abs(currentX - targetX) > 0.01 ||
            Math.abs(currentY - targetY) > 0.01) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }

    function startAnimate() {
        if (!rafId) rafId = requestAnimationFrame(animate);
    }

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        // Normalized -1 to +1 within the element
        const nx = (e.clientX - rect.left) / rect.width  * 2 - 1;
        const ny = (e.clientY - rect.top)  / rect.height * 2 - 1;

        // rotateX (lean forward/back) is driven by vertical mouse, inverted
        targetX = -ny * MAX_TILT;
        // rotateY (lean left/right) is driven by horizontal mouse
        targetY =  nx * MAX_TILT;

        startAnimate();
    });

    container.addEventListener('mouseenter', () => {
        isHovering = true;
        startAnimate();
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        startAnimate();
    });
}

// Initialise immediately (DOM is ready since script is at bottom of body)
initPhoto3DTilt();

/* ===== PARTICLE CANVAS BACKGROUND ===== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    let mouseX = -1000, mouseY = -1000;
    const particles = [];
    const particleCount = 80;
    const connectionDist = 120;
    const mouseRadius = 180;

    function resize() {
        const hero = canvas.parentElement;
        w = canvas.width = hero.offsetWidth;
        h = canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Track mouse on the hero section
    const heroSection = document.getElementById('hero');
    heroSection?.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    heroSection?.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Mouse repulsion
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                const force = (mouseRadius - dist) / mouseRadius * 0.02;
                this.vx += dx * force;
                this.vy += dy * force;
            }

            // Dampen velocity
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Wrap around edges
            if (this.x < 0) this.x = w;
            if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h;
            if (this.y > h) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDist) {
                    const alpha = (1 - dist / connectionDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse connections
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                const alpha = (1 - dist / mouseRadius) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== DECRYPTED TEXT EFFECT ===== */
function initDecryptText() {
    const el = document.getElementById('hero-decrypt');
    if (!el) return;

    const finalText = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    let iteration = 0;
    const speed = 40;
    const revealSpeed = 2; // chars revealed per tick

    el.textContent = finalText.replace(/./g, () => chars[Math.floor(Math.random() * chars.length)]);

    function decrypt() {
        el.textContent = finalText
            .split('')
            .map((char, i) => {
                if (i < iteration) return finalText[i];
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration < finalText.length) {
            iteration += 1 / revealSpeed;
            setTimeout(decrypt, speed);
        } else {
            el.textContent = finalText;
        }
    }

    // Delay start so it plays after preloader
    setTimeout(decrypt, 1200);
}

/* ===== CLICK SPARK EFFECT ===== */
function initClickSpark() {
    document.addEventListener('click', (e) => {
        const sparkCount = 8;
        const colors = ['#6c63ff', '#00d4aa', '#ff6b6b', '#fff'];

        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark-particle';
            const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() * 0.5 - 0.25);
            const distance = 30 + Math.random() * 40;
            const sx = Math.cos(angle) * distance;
            const sy = Math.sin(angle) * distance;

            spark.style.cssText = `
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                --sx: ${sx}px;
                --sy: ${sy}px;
                position: fixed;
                pointer-events: none;
                z-index: 99998;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                border-radius: 50%;
                animation: spark-burst 0.6s ease-out forwards;
            `;

            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 650);
        }
    });
}

/* ===== 3D TILT ON SKILL CARDS ===== */
function initTiltCards() {
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ===== MAGNETIC HOVER BUTTONS ===== */
function initMagneticButtons() {
    const btns = document.querySelectorAll('.magnetic-btn');

    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ===== STAGGERED CHAR REVEAL ON SCROLL ===== */
function initCharReveal() {
    const titles = document.querySelectorAll('.section-title');

    titles.forEach(title => {
        if (title.classList.contains('shiny-text')) {
            // Leave shiny-text titles as is - they already have their animation
            return;
        }
    });

    // Use IntersectionObserver for blur-reveal on section headers
    const revealElements = document.querySelectorAll('.section-header');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.section-label, .section-title, .section-subtitle, .section-divider').forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.filter = 'blur(6px)';
                    el.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s`;
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            el.style.filter = 'blur(0)';
                        });
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));
}

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        delay: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
            initAnimations();
            initParticles();
            initDecryptText();
            initClickSpark();
            initTiltCards();
            initMagneticButtons();
            initCharReveal();
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

/* ===== THEME TOGGLE ===== */
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlRoot = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            htmlRoot.setAttribute('data-theme', 'light');
        } else {
            htmlRoot.removeAttribute('data-theme');
        }
        localStorage.setItem('hm-theme', theme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const current = htmlRoot.getAttribute('data-theme');
            applyTheme(current === 'light' ? 'dark' : 'light');
        });
    }
});

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
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: staggerVal || 0,
                ease: 'power3.out',
                clearProps: 'transform,filter'
            });
        }
    });
}

function initAnimations() {
    // Hero stagger animations (no ScrollTrigger needed, plays immediately)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    heroTl
        .from('.hero-badge', { opacity: 0, y: 30, filter: 'blur(10px)' })
        .from('.hero-name', { opacity: 0, y: 40, filter: 'blur(10px)' }, '-=0.5')
        .from('.hero-tagline', { opacity: 0, y: 30, filter: 'blur(8px)' }, '-=0.5')
        .from('.hero-description', { opacity: 0, y: 30, filter: 'blur(8px)' }, '-=0.5')
        .from('.hero-actions .btn', { opacity: 0, y: 20, stagger: 0.15, filter: 'blur(6px)' }, '-=0.4')
        .from('.hero-socials .social-link', { opacity: 0, scale: 0, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3')
        .from('.hero-image-container', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
        .from('.hero-float-card', { opacity: 0, scale: 0, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.5');

    // About text with blur
    createScrollAnimation('.about-text p', '.about-text', { y: 30, filter: 'blur(8px)' }, 0.15);

    // Stat cards
    createScrollAnimation('.stat-card', '.about-stats', { y: 40, filter: 'blur(6px)' }, 0.12);

    // Skill cards - staggered with blur
    createScrollAnimation('.skill-card', '.skills-grid', { y: 30, scale: 0.8, filter: 'blur(8px)' }, 0.04);

    // Tools
    createScrollAnimation('.tool-item', '.tools-grid', { x: -30, filter: 'blur(6px)' }, 0.08);

    // Soft skills
    createScrollAnimation('.soft-skill-tag', '.soft-skills-wrap', { scale: 0.5, filter: 'blur(6px)' }, 0.04);

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach(item => {
        createScrollAnimation(item, item, { x: -40, filter: 'blur(8px)' });
    });

    // Experience card
    createScrollAnimation('.experience-card', '.experience-card', { y: 50, filter: 'blur(8px)' });

    // Project card
    createScrollAnimation('.project-card', '.project-card', { y: 50, filter: 'blur(8px)' });

    // Certificate card
    createScrollAnimation('.cert-card', '.cert-card', { y: 30, filter: 'blur(6px)' });

    // Language cards
    createScrollAnimation('.language-card', '.languages-wrap', { y: 30, filter: 'blur(6px)' }, 0.1);

    // Contact section
    createScrollAnimation('.contact-info', '.contact-grid', { x: -40, filter: 'blur(8px)' });
    createScrollAnimation('.contact-form', '.contact-grid', { x: 40, filter: 'blur(8px)' });

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

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS & DOCK ===== */
function scrollToCenter(target) {
    if (target) {
        const rect = target.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Unconditionally align the exact center of the section with the exact center of the viewport
        const top = sectionTop - (viewportHeight - sectionHeight) / 2;
        
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
}

// Old anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        scrollToCenter(target);
    });
});

// New 3D dock icons
document.querySelectorAll('.hm-dock__btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        const target = document.getElementById(sectionId);
        scrollToCenter(target);
        
        // Visually activate the clicked dock icon immediately
        document.querySelectorAll('.hm-dock__btn').forEach(b => {
            b.classList.remove('hm-dock__btn--on');
            // Remove rings and pulses from others
            b.querySelectorAll('.hm-dock__ring, .hm-dock__pulse').forEach(el => el.remove());
        });
        this.classList.add('hm-dock__btn--on');
        if (!this.querySelector('.hm-dock__ring')) {
            this.insertAdjacentHTML('beforeend', '<span class="hm-dock__ring"></span><span class="hm-dock__pulse"></span>');
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
const EMAILJS_PUBLIC_KEY = 'mgQcOPPQ60gbla8xg';
const EMAILJS_SERVICE_ID = 'service_giyrex4';
const EMAILJS_TEMPLATE_ID = 'template_m71jkxb';

// Track whether EmailJS has been initialized
let emailjsInitialized = false;

function ensureEmailJSInit() {
    if (!emailjsInitialized && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailjsInitialized = true;
    }
}

// Try to initialize immediately (SDK is loaded before this script)
ensureEmailJSInit();

// Also try on DOMContentLoaded in case of timing issues
document.addEventListener('DOMContentLoaded', ensureEmailJSInit);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
let formStatusTimer = null;

function showFormStatus(type, message) {
    // Clear any pending hide timer
    if (formStatusTimer) {
        clearTimeout(formStatusTimer);
        formStatusTimer = null;
    }
    // Reset inline display style so CSS class can take effect
    formStatus.style.display = '';
    formStatus.className = 'form-status ' + type;
    formStatus.innerHTML = message;

    // Auto-hide after 6 seconds
    formStatusTimer = setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
        formStatusTimer = null;
    }, 6000);
}

contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Ensure EmailJS is initialized before sending
    ensureEmailJSInit();

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

    if (typeof emailjs !== 'undefined' && emailjsInitialized) {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                showFormStatus('success', '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            })
            .catch((error) => {
                const errorText = error?.text || error?.message || JSON.stringify(error);
                showFormStatus('error', '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or email me directly.');
                console.error('EmailJS error status:', error?.status);
                console.error('EmailJS error text:', errorText);
                console.error('EmailJS full error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback: mailto
        const mailtoLink = `mailto:work.hardikm@gmail.com?subject=${encodeURIComponent(templateParams.subject)}&body=${encodeURIComponent(`Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\n\n${templateParams.message}`)}`;
        window.location.href = mailtoLink;
        showFormStatus('success', '<i class="fas fa-check-circle"></i> Opening your email client...');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
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

/* ================================================================
   FLOATING ICON DOCK — JavaScript Controller
   ================================================================ */
(function initDock() {
    const wrapper = document.getElementById('hm-dock-wrapper');
    if (!wrapper) return;

    const buttons = wrapper.querySelectorAll('.hm-dock__btn');
    const glow = wrapper.querySelector('.hm-dock__glow');
    const sectionIds = ['hero', 'about', 'skills', 'education', 'experience', 'projects', 'certificates', 'languages', 'contact'];

    // Show/hide dock + track active section on scroll
    function onScroll() {
        const scrollY = window.scrollY;
        const scrollMid = scrollY + window.innerHeight / 2;

        // Show dock after scrolling past 200px
        if (scrollY > 200) {
            wrapper.classList.add('visible');
        } else {
            wrapper.classList.remove('visible');
        }

        // Find active section
        let activeId = sectionIds[0];
        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const sec = document.getElementById(sectionIds[i]);
            if (sec && sec.offsetTop <= scrollMid) {
                activeId = sectionIds[i];
                break;
            }
        }

        // Update button states
        buttons.forEach(btn => {
            const sectionId = btn.getAttribute('data-section');
            const isActive = sectionId === activeId;

            if (isActive && !btn.classList.contains('hm-dock__btn--on')) {
                btn.classList.add('hm-dock__btn--on');
                // Add ring + pulse elements
                if (!btn.querySelector('.hm-dock__ring')) {
                    const ring = document.createElement('span');
                    ring.className = 'hm-dock__ring';
                    btn.appendChild(ring);
                }
                if (!btn.querySelector('.hm-dock__pulse')) {
                    const pulse = document.createElement('span');
                    pulse.className = 'hm-dock__pulse';
                    btn.appendChild(pulse);
                }
                // Update glow color
                const color = getComputedStyle(btn).getPropertyValue('--c').trim();
                if (glow && color) {
                    glow.style.background = `radial-gradient(ellipse at center, ${color} 0%, transparent 72%)`;
                }
            } else if (!isActive && btn.classList.contains('hm-dock__btn--on')) {
                btn.classList.remove('hm-dock__btn--on');
                const ring = btn.querySelector('.hm-dock__ring');
                const pulse = btn.querySelector('.hm-dock__pulse');
                if (ring) ring.remove();
                if (pulse) pulse.remove();
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check

    // Click handler — smart scroll positioning
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.pageYOffset;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const navbarOffset = 80;

            let scrollTarget;
            if (sectionHeight <= viewportHeight - navbarOffset) {
                // Section fits in viewport → center it
                scrollTarget = sectionTop - (viewportHeight - sectionHeight) / 2;
            } else {
                // Section taller than viewport → scroll to top with offset
                scrollTarget = sectionTop - navbarOffset;
            }

            window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
        });
    });
})();
