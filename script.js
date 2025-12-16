
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
