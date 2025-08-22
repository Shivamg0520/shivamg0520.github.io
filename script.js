document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation (from previous version, still good!) ---
    const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

   

    // टाइपिंग एनिमेशन
    const options = {
        strings: ['Python Developer', 'Web Developer', 'BrainStormer',''], // यहाँ अपनी स्किल्स/टाइटल डालें
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        loop: true
    };
    const typed = new Typed('.typing-effect', options);


    // NOTE: This is the ONLY navLinks.forEach loop needed in this function
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => item.style.animation = '');
        });
    });
};

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
            threshold: 0.3 // Adjust this value: higher means section needs to be more in view
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

    // --- Particle.js Background ---
    

    // --- Scroll Reveal Animations ---
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-item, .section-title, .contact-intro');

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // Percentage of element visible to trigger
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    };

    // --- Initialize all functions ---
    navSlide();
    smoothScroll();
    setActiveNavLinkOnScroll();
    scrollReveal();
});

// CSS for scroll reveal
/*
    In style.css, add these:

    .reveal-item, .section-title, .contact-intro {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .reveal-item.is-visible, .section-title.is-visible, .contact-intro.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    // You can add different delays if you want items in a grid to animate one by one
    // .projects-grid .project-item:nth-child(1).is-visible { transition-delay: 0.1s; }
    // .projects-grid .project-item:nth-child(2).is-visible { transition-delay: 0.2s; }
    // ...and so on.
*/