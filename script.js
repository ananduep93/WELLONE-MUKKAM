document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader Fade Out
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            delay: 1.5,
            onComplete: () => {
                loader.style.display = 'none';
                // Trigger hero animations after load
                initHeroAnimations();
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if(mobileToggle.classList.contains('active')) {
            gsap.to(spans[0], { rotate: 45, y: 7, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotate: -45, y: -7, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
        }
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
        });
    });

    // 3. Navbar Scroll Effect
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('glass-nav');
            gsap.to(header, { padding: '10px 5%', duration: 0.3 });
        } else {
            header.classList.remove('glass-nav');
            gsap.to(header, { padding: '20px 5%', duration: 0.3 });
        }
    });

    // 4. GSAP ScrollReveal Animations
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50,
                visibility: 'hidden'
            }, 
            {
                opacity: 1,
                y: 0,
                visibility: 'visible',
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 5. Hero Animations (Logo and Title)
    function initHeroAnimations() {
        const tl = gsap.timeline();
        tl.from(".hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        })
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=1")
        .from(".hero-btns .btn-primary, .hero-btns .btn-outline", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.8");
    }

    // 6. Product Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active btn
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    gsap.to(product, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        display: 'block',
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(product, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        display: 'none',
                        ease: "power2.out"
                    });
                }
            });
        });
    });

    // 7. Festival Countdown Timer
    function updateCountdown() {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15); // 15 days from now

        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('mins').innerText = minutes.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 8. Parallax effect for Hero
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
            heroContent.style.opacity = 1 - (scroll / 700);
        }
    });

    // 9. Simple Cart Counter (Simulation)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartSpan = document.querySelector('.cart-btn span');
    let count = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            count++;
            cartSpan.innerText = count;
            
            // Animation for cart button
            gsap.fromTo(".cart-btn", 
                { scale: 1 }, 
                { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
            );
        });
    });
});
