
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
/* JavaScript mein ye add karo */
// Custom cursor movement
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .btn, .btn-small');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});


/* ================= COSMIC PARTICLES ================= */

const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: 0, y: 0 };
let mode = 'attract';
let theme = 'cosmic';
let cosmicOn = false;

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

  requestAnimationFrame(animate);
}
// ✅ GLOBAL mouse tracking (desktop)
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
  if (cosmicOn) { createParticles(); animate(); }
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