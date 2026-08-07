
// Create twinkling stars
const starsContainer = document.getElementById('stars');
const numStars = 200;

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = (Math.random() * 2 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(star);
}

// About Me paragraph word-hover effect (moved from inline script)
document.addEventListener('DOMContentLoaded', () => {
    const p = document.getElementById('paragraph');
    if (p) {
        const words = p.textContent.split(' ');
        p.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    }

    const p2 = document.getElementById('paragraph2');
    if (p2) {
        const words2 = p2.textContent.split(' ');
        p2.innerHTML = words2.map(word => `<span class="word">${word}</span>`).join(' ');
    }
});


// Create shooting stars
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's';
    starsContainer.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 3000);
}

// Generate shooting stars randomly
setInterval(() => {
    if (Math.random() > 0.7) {
        createShootingStar();
    }
}, 2000);

// Navigation and all other scripts
document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            const isExpanded = nav.classList.contains('nav-active');
            burger.setAttribute('aria-expanded', isExpanded);

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                burger.setAttribute('aria-expanded', 'false');
                navLinks.forEach(item => item.style.animation = '');
            });
        });
    };

    // Typing animation
    const options = {
        strings: ['Python Developer', 'Web Developer', 'BrainStormer', ''],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        loop: true
    };
    const typed = new Typed('.typing-effect', options);

    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    const setActiveNavLinkOnScroll = () => {
        const sections = document.querySelectorAll('section');
        const navLi = document.querySelectorAll('.nav-links li a');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSectionId = entry.target.id;
                    navLi.forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href').includes(currentSectionId)) {
                            a.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-item, .section-title, .contact-intro');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    };

    navSlide();
    smoothScroll();
    setActiveNavLinkOnScroll();
    scrollReveal();
});


/* ================= COSMIC PARTICLES ================= */

const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: 0, y: 0 };
let mode = 'attract';
let theme = 'cosmic';
let cosmicOn = false;
let animationId = null; // track animation frame to prevent memory leaks

const themes = {
  cosmic: ['#8b5cf6', '#3b82f6', '#ec4899'],
  fire: ['#ff6b6b', '#ffd93d'],
  ocean: ['#06b6d4', '#0ea5e9'],
  matrix: ['#00ff41']
};

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticles() {
  particles = [];
  const count = innerWidth < 768 ? 80 : 150;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r: Math.random() * 3 + 1,
      c: themes[theme][Math.floor(Math.random() * themes[theme].length)]
    });
  }
}

function animate() {
  if (!cosmicOn) return;

  ctx.fillStyle = 'rgba(10,5,32,0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.hypot(dx, dy) || 1;

    if (dist < 150) {
      let f = (150 - dist) / 150;
      if (mode === 'attract') { p.vx += dx/dist*f; p.vy += dy/dist*f; }
      if (mode === 'repel') { p.vx -= dx/dist*f; p.vy -= dy/dist*f; }
      if (mode === 'orbit') { p.vx += -dy/dist*f; p.vy += dx/dist*f; }
      if (mode === 'chaos') { p.vx += (Math.random()-0.5); p.vy += (Math.random()-0.5); }
    }

    p.x += p.vx; p.y += p.vy;
    p.vx *= 0.98; p.vy *= 0.98;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });

  animationId = requestAnimationFrame(animate);
}
// Global mouse tracking (desktop)
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// ✅ MOBILE support (touch)
document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
});


/* ================= UI LOGIC ================= */

const toggle = document.getElementById('cosmic-toggle');
const icon = document.getElementById('toggle-icon');
const controls = document.getElementById('cosmic-controls');
const collapseBtn = document.getElementById('collapse-controls');

toggle.onclick = () => {
  cosmicOn = !cosmicOn;
  canvas.style.display = cosmicOn ? 'block' : 'none';
  document.querySelector('.night-sky').style.opacity = cosmicOn ? '0' : '1';
  controls.classList.toggle('hidden', !cosmicOn);
  icon.textContent = cosmicOn ? '✨' : '🌙';
  if (cosmicOn) {
    createParticles();
    animate();
  } else {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
};

collapseBtn.onclick = () => {
  controls.classList.toggle('hidden');
};

document.querySelectorAll('[data-mode]').forEach(b =>
  b.onclick = () => mode = b.dataset.mode
);

document.querySelectorAll('[data-theme]').forEach(b =>
  b.onclick = () => {
    theme = b.dataset.theme;
    createParticles();
  }
);


const openBtn = document.getElementById('openCertModal');
    const closeBtn = document.getElementById('closeCertModal');
    const modalOverlay = document.getElementById('certModal');

    function openModal() {
      modalOverlay.classList.add('active');
    }

    function closeModal() {
      modalOverlay.classList.remove('active');
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside modal
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });


/* =====================================================
   DESKTOP PORTFOLIO CHOICE POPUP
   ===================================================== */

(function initPortfolioChoice() {
    // Only show on desktop screens
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Only show once per session
    const alreadyChosen = sessionStorage.getItem('portfolioChosen');
    if (alreadyChosen) return;

    const overlay = document.getElementById('portfolio-choice-overlay');
    const osBtn   = document.getElementById('btn-os-portfolio');
    const webBtn  = document.getElementById('btn-web-portfolio');
    const skipBtn = document.getElementById('pc-skip-btn');

    if (!overlay) return;

    // Show after a short delay so page loads first
    setTimeout(() => {
        overlay.classList.add('pc-active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }, 600);

    function closePopup(choice) {
        sessionStorage.setItem('portfolioChosen', choice);
        overlay.classList.remove('pc-active');
        document.body.style.overflow = '';
        // Remove from DOM after animation completes
        setTimeout(() => overlay.remove(), 450);
    }

    // OS Portfolio — open in new tab, close popup
    osBtn.addEventListener('click', () => {
        closePopup('os');
        setTimeout(() => {
            window.open('https://shivos.vercel.app/', '_blank', 'noopener,noreferrer');
        }, 100);
    });

    // Keyboard support for OS card
    osBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            osBtn.click();
        }
    });

    // Web Portfolio — just close popup
    webBtn.addEventListener('click', () => closePopup('web'));

    // Keyboard support for web card
    webBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            webBtn.click();
        }
    });

    // Skip button
    if (skipBtn) {
        skipBtn.addEventListener('click', () => closePopup('skipped'));
    }

    // Escape key closes popup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup('skipped');
    });

    // Click outside modal to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup('skipped');
    });

})();


/* =====================================================
   PROJECT CATEGORY FILTERING
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});


/* =====================================================
   CASE STUDY MODAL DATA & HANDLERS
   ===================================================== */

const caseStudies = {
    shivos: {
        badge: "⭐ Flagship Full-Stack Engineering",
        title: "ShivOS — Interactive Engineering Workspace",
        tagline: "Not a portfolio. An engineering workspace.",
        problem: "Traditional personal portfolio websites rely heavily on superficial animations without showcasing real software engineering discipline, architecture, or state management rigor.",
        architecture: "Built using a 4-engine layered architecture (Desktop Engine, Window Engine, Workspace Engine, System Engine) with Zustand state stores as the single source of truth.",
        features: [
            "Desktop & Window Engine with z-index stacking and cascading positioning",
            "Command Palette (Ctrl+K) with fuzzy search indexing",
            "Dual experiences: Recruiter Mode & Developer Mode with live ADRs",
            "Multi-theme design token system (Dark, Light, Blueprint)"
        ],
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Zustand", "Framer Motion"],
        github: "https://github.com/Shivamg0520/shivos",
        demo: "https://shivos.vercel.app/"
    },
    tataml: {
        badge: "🏭 Tata Motors Internship Project",
        title: "AI Predictive Maintenance & Quality Monitoring — BIW Welding",
        tagline: "Smart Universal ML model predicting weld quality & root cause analysis in real time.",
        problem: "The plant's Body-In-White (BIW) welding guns were monitored using static parameter thresholds, leading to frequent false alarms and reactive maintenance. Operators had no real-time Root Cause Analysis. Each gun operates at different current scales (9000A vs 6500A), making a single raw ML model impossible across all machines.",
        architecture: "Multi-page Streamlit analytics dashboard fetching real-time PLC controller data from SQL Server over local LAN. Engineered a 'Smart Universal AI Model' using Percentage Deviation feature — computing deviations from baseline so one Random Forest model accurately predicts weld quality across all guns. Dynamic auto-labeling on 10,000+ records via 5% deviation rule & Extreme Survival Limits.",
        features: [
            "Universal ML Model via Percentage Deviation — 1 model predicts across all guns regardless of current scale",
            "Live Weld Strength Gauge using predict_proba() to display real-time quality percentage",
            "Automated Root Cause Alerts (e.g., 'Weak Weld due to 15% drop in Power Factor')",
            "Edge-optimized inference — runs locally on standard i5/16GB RAM industrial PC with zero cloud latency",
            "Dynamic auto-labeling of 10,000+ historical PLC records using Extreme Survival Limits",
            "Machine Health & Stability Index for trend-based proactive maintenance scheduling"
        ],
        tech: ["Python", "Pandas", "Scikit-Learn", "Random Forest Classifier", "Streamlit", "SQL Server", "Feature Engineering"],
        confidential: true
    },
    hindustan: {
        badge: "📰 High-Traffic Full-Stack Platform",
        title: "The Hindustan Press — News & Media Portal",
        tagline: "High-performance bilingual news & media platform with custom editor and RBAC.",
        problem: "Building a scalable, high-traffic news portal with role-based access control, rich-text editing, automated media uploads, and dynamic AdSense placement without compromising page load speeds or SEO.",
        architecture: "Built using Next.js 15 App Router, TypeScript, PostgreSQL database with Prisma ORM, and Auth.js for role-based authentication.",
        features: [
            "Role-Based Access Control (Super Admin & Employee roles)",
            "Dynamic Google AdSense placement engine and guest comment moderation",
            "Custom Tiptap rich text editor with automated Cloudinary image uploads",
            "Advanced SEO engine with dynamic sitemaps and JSON-LD structured schema"
        ],
        tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma ORM", "Auth.js", "Cloudinary", "Tiptap"],
        github: "https://github.com/Shivamg0520"
    },
    lic: {
        badge: "🌐 Client SEO & Frontend Project",
        title: "Sahendra Gupta — SEO-Optimized LIC Agent Website",
        tagline: "Bilingual client website that ranks #1 on Google Search for targeted local keywords.",
        problem: "A local LIC agent in Chandauli needed a professional online presence to build trust, showcase insurance plans, and reach new clients with zero pre-existing digital footprint.",
        architecture: "Vanilla HTML5, CSS3, and JavaScript single-page application with bilingual (English/Hindi) content, JSON-LD structured data, semantic markup, and Google Site Verification for indexing.",
        features: [
            "Ranks #1 on Google Search for 'Sahendra Gupta LIC Agent Chandauli' and related queries",
            "WhatsApp floating CTA button for instant client contact conversion",
            "Responsive design with animated hero section, services grid, testimonials carousel, and plan cards",
            "Bilingual content (English & Hindi) for wider local audience reach",
            "Structured client testimonials section to build social proof"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "SEO", "JSON-LD Schema", "Google Search Console"],
        demo: "https://sahendragupta.free.nf/?i=2"
    }
};

function openCaseStudy(key) {
    const cs = caseStudies[key];
    if (!cs) return;

    const modal = document.getElementById('case-study-modal');
    const modalBody = document.getElementById('cs-modal-body');
    if (!modal || !modalBody) return;

    let techHtml = cs.tech.map(t => `<span class="project-tags"><span>${t}</span></span>`).join(' ');
    let featuresHtml = cs.features.map(f => `<li>${f}</li>`).join('');

    let buttonsHtml = '';
    if (cs.demo) {
        buttonsHtml += `<a href="${cs.demo}" target="_blank" rel="noopener" class="btn primary-btn"><i class="fas fa-external-link-alt"></i> Launch Live Demo</a> `;
    }
    if (cs.github) {
        buttonsHtml += `<a href="${cs.github}" target="_blank" rel="noopener" class="btn secondary-btn"><i class="fab fa-github"></i> View Repository</a> `;
    }
    if (cs.confidential) {
        buttonsHtml += `<span class="confidential-badge" style="font-size: 0.9em;"><i class="fas fa-lock"></i> Proprietary Project — Tata Motors Limited</span>`;
    }

    modalBody.innerHTML = `
        <div class="cs-head">
            <span class="cs-badge">${cs.badge}</span>
            <h3 class="cs-title">${cs.title}</h3>
            <p class="cs-tagline">"${cs.tagline}"</p>
        </div>

        <div class="cs-section">
            <h4 class="cs-section-title"><i class="fas fa-exclamation-triangle"></i> Problem Statement</h4>
            <p>${cs.problem}</p>
        </div>

        <div class="cs-section">
            <h4 class="cs-section-title"><i class="fas fa-cogs"></i> System Architecture</h4>
            <p>${cs.architecture}</p>
        </div>

        <div class="cs-section">
            <h4 class="cs-section-title"><i class="fas fa-check-circle"></i> Key Features &amp; Capabilities</h4>
            <ul class="cs-list">
                ${featuresHtml}
            </ul>
        </div>

        <div class="cs-section">
            <h4 class="cs-section-title"><i class="fas fa-code"></i> Technologies Used</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
                ${techHtml}
            </div>
        </div>

        <div class="cs-actions-row">
            ${buttonsHtml}
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Close case study modal on Escape key or outside click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCaseStudy();
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('case-study-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCaseStudy();
        });
    }

    // Initialize Hero Particle Face Morphing
    initParticleFace();
});


/* =====================================================
   MAGNETIC PARTICLE FACE MORPHING
   ===================================================== */

function initParticleFace() {
    const canvas = document.getElementById('face-particle-canvas');
    const fallbackImg = document.getElementById('face-fallback-img');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let isInitialized = false;

    // Track mouse position on canvas
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) * (width / rect.width);
        mouse.y = (e.clientY - rect.top) * (height / rect.height);
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    // Click to explode particles outwards across full screen and magnetically re-assemble!
    canvas.addEventListener('click', () => {
        particles.forEach(p => {
            p.vx += (Math.random() - 0.5) * 50;
            p.vy += (Math.random() - 0.5) * 50;
        });
    });

    // Load photo to extract face pixels
    const img = new Image();
    img.src = 'images/shivam.jpg';

    img.onload = () => {
        try {
            const sampleSize = 200;
            const offCanvas = document.createElement('canvas');
            offCanvas.width = sampleSize;
            offCanvas.height = sampleSize;
            const offCtx = offCanvas.getContext('2d');

            offCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
            const imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize).data;

            const step = 2; // ~6,000 ultra-fine dots
            const centerX = sampleSize / 2;
            const centerY = sampleSize / 2;
            const radiusLimit = sampleSize * 0.48; // circular cropping limit

            const rect = canvas.getBoundingClientRect();

            for (let y = 0; y < sampleSize; y += step) {
                for (let x = 0; x < sampleSize; x += step) {
                    const distFromCenter = Math.hypot(x - centerX, y - centerY);
                    if (distFromCenter > radiusLimit) continue;

                    const index = (y * sampleSize + x) * 4;
                    const r = imgData[index];
                    const g = imgData[index + 1];
                    const b = imgData[index + 2];
                    const a = imgData[index + 3];

                    if (a > 30) {
                        const lum = (0.299 * r + 0.587 * g + 0.114 * b);
                        const norm = lum / 255;

                        // Skip dark background pixels
                        if (norm < 0.08) continue;

                        const brightness = Math.floor(90 + norm * 165);
                        const targetX = (x / sampleSize) * width;
                        const targetY = (y / sampleSize) * height;

                        // Initial scattered positions across the ENTIRE SCREEN (viewport)
                        const startX = (Math.random() * window.innerWidth) - rect.left;
                        const startY = (Math.random() * window.innerHeight) - rect.top;

                        particles.push({
                            x: startX,
                            y: startY,
                            targetX: targetX,
                            targetY: targetY,
                            vx: (Math.random() - 0.5) * 8,
                            vy: (Math.random() - 0.5) * 8,
                            color: `rgba(${brightness}, ${brightness}, ${brightness + 10}, ${Math.max(0.25, norm * 0.95)})`,
                            radius: 0.6 + norm * 0.85
                        });
                    }
                }
            }

            isInitialized = true;
            animateFace();
        } catch (err) {
            console.warn('Particle face canvas fallback active:', err);
        }
    };

    img.onerror = () => {
        console.warn('Hero photo load failed for particle canvas');
    };

    function animateFace() {
        if (!isInitialized) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Magnetic spring attraction force towards target face position
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;

            p.vx += dx * 0.04;
            p.vy += dy * 0.04;

            p.vx *= 0.81; // damping / friction
            p.vy *= 0.81;

            // Interactive mouse magnetic repulsion
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdist = Math.hypot(mdx, mdy);

            if (mdist < 80) {
                const mforce = ((80 - mdist) / 80) * 8;
                p.vx += (mdx / (mdist || 1)) * mforce;
                p.vy += (mdy / (mdist || 1)) * mforce;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Render high-detail B&W micro particle dot
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(animateFace);
    }
}

