// Modern Atomic Hub Script with Enhanced Animations

document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initBootAnimation();
    initScrollEffects();
    initHeroAnimations();
    initParticleEffects();
    loadDataAndInitialize();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursorOrb');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor follow
        function animateCursor() {
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll(
            'a, button, .feature-card, .benefit-card, .pricing-card, .testimonial-card, .faq-item, .nav-link'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Enhanced Boot Animation
function initBootAnimation() {
    const bootScreen = document.getElementById('bootScreen');
    const bootStatus = document.querySelector('.boot-status');
    const mainContainer = document.querySelector('.liquid-container');
    
    // Status messages with tech feel
    const statusMessages = [
        'Initializing Quantum Core...',
        'Loading Liquid Engine...',
        'Establishing Neural Link...',
        'Calibrating Systems...',
        'Welcome to Atomic Hub'
    ];
    
    let messageIndex = 0;
    const statusInterval = setInterval(() => {
        if (messageIndex < statusMessages.length) {
            bootStatus.textContent = statusMessages[messageIndex];
            bootStatus.style.opacity = '0';
            setTimeout(() => {
                bootStatus.style.opacity = '1';
            }, 100);
            messageIndex++;
        }
    }, 600);
    
    // Hide boot screen with style
    setTimeout(() => {
        clearInterval(statusInterval);
        bootScreen.classList.add('hidden');
        
        // Show main content with cascade effect
        setTimeout(() => {
            initMainAnimations();
            initLiquidBackground();
        }, 300);
    }, 3500);
}

// Liquid Background Canvas
function initLiquidBackground() {
    const canvas = document.getElementById('liquidCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect nearby particles
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const distance = Math.hypot(a.x - b.x, a.y - b.y);
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// Enhanced Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar effects
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax for hero elements
        const heroContent = document.querySelector('.hero-content');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${currentScroll * 0.3}px)`;
            heroContent.style.opacity = 1 - (currentScroll / 800);
        }
        
        if (heroStats) {
            heroStats.style.transform = `translateY(${currentScroll * 0.2}px)`;
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Hero Animations
function initHeroAnimations() {
    // Advanced typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            '#1CDIDSCRIPT',
            'Atomic Hub #1',
            'Better Autofarm',
            'Better Performance'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    // Animated stats counter
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateValue(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// Enhanced counter animation
function animateValue(element) {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2500;
    const start = 0;
    const startTime = Date.now();
    
    function updateValue() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        if (progress < 1) {
            if (isDecimal) {
                element.textContent = current.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
                if (element.dataset.target === '43') {
                    element.textContent += 'ms';
                } else if (element.dataset.target === '5247') {
                    element.textContent += '+';
                }
            }
            requestAnimationFrame(updateValue);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(target).toLocaleString();
                if (element.dataset.target === '43') {
                    element.textContent += 'ms';
                } else if (element.dataset.target === '5247') {
                    element.textContent += '+';
                }
            }
        }
    }
    
    updateValue();
}

// Particle Effects
function initParticleEffects() {
    // Add floating particles to hero section
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(139, 92, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            animation: particleFloat ${10 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS for particle animation
    if (!document.querySelector('#particleStyles')) {
        const style = document.createElement('style');
        style.id = 'particleStyles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) scale(0);
                }
                10% {
                    opacity: 1;
                    transform: translateY(90vh) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(10vh) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize main animations
function initMainAnimations() {
    // Stagger animations for cards
    const animatedElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .pricing-card, .testimonial-card, .faq-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Add hover tilt effect to cards
    const cards = document.querySelectorAll('.feature-card, .benefit-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Load data and initialize components
async function loadDataAndInitialize() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Initialize all sections with enhanced animations
        initFeatures(data.features);
        initBenefits(data.benefits);
        initPricing(data.pricing);
        initTestimonials(data.testimonials);
        initFAQ(data.faq);
        
        // Reinitialize animations after content load
        setTimeout(initMainAnimations, 100);
    } catch (error) {
        console.error('Error loading data:', error);
        useDefaultData();
    }
}

// Initialize Features with animations
function initFeatures(features) {
    const grid = document.getElementById('featuresGrid');
    if (!grid || !features) return;
    
    features.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Benefits
function initBenefits(benefits) {
    const grid = document.getElementById('benefitsGrid');
    if (!grid || !benefits) return;
    
    benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        
        const pointsList = benefit.points.map(point => 
            `<li>${point}</li>`
        ).join('');
        
        card.innerHTML = `
            <div class="benefit-liquid-bg"></div>
            <div class="benefit-icon">${benefit.icon}</div>
            <h3>${benefit.title}</h3>
            <ul>${pointsList}</ul>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Pricing
function initPricing(pricing) {
    const grid = document.getElementById('pricingGrid');
    if (!grid || !pricing) return;
    
    pricing.forEach((plan) => {
        const card = document.createElement('div');
        card.className = plan.featured ? 'pricing-card featured' : 'pricing-card';
        
        const featuresList = plan.features.map(feature => 
            `<li class="pricing-feature">
                <span class="feature-check">✓</span>
                <span>${feature}</span>
            </li>`
        ).join('');
        
        card.innerHTML = `
            ${plan.featured ? '<div class="pricing-badge">MOST POPULAR</div>' : ''}
            <div class="pricing-name">${plan.name}</div>
            <div class="pricing-price">${plan.price}</div>
            <div class="pricing-period">${plan.period}</div>
            <ul class="pricing-features">${featuresList}</ul>
            <button class="btn-pricing">${plan.cta || 'Get Started'}</button>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Testimonials
function initTestimonials(testimonials) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid || !testimonials) return;
    
    testimonials.forEach((testimonial) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const stars = '★'.repeat(testimonial.rating);
        
        card.innerHTML = `
            <div class="testimonial-quote">"</div>
            <div class="testimonial-header">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <div class="testimonial-role">${testimonial.role}</div>
                    <div class="testimonial-company">${testimonial.company}</div>
                </div>
            </div>
            <div class="testimonial-content">
                "${testimonial.text}"
            </div>
            <div class="testimonial-rating">
                ${stars.split('').map(() => '<span class="star">★</span>').join('')}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize FAQ with enhanced interactions
function initFAQ(faqItems) {
    const grid = document.getElementById('faqGrid');
    if (!grid || !faqItems) return;
    
    faqItems.forEach((item) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        
        faqElement.innerHTML = `
            <div class="faq-question">
                <span>${item.question}</span>
                <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-content">${item.answer}</div>
            </div>
        `;
        
        const question = faqElement.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items with animation
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqElement && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            faqElement.classList.toggle('active');
        });
        
        grid.appendChild(faqElement);
    });
}

// Button interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-pricing, .btn-hero-primary, .btn-cta, .btn-liquid')) {
        e.preventDefault();
        
        // Ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            pointer-events: none;
            transform: translate(${x}px, ${y}px) scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Add ripple animation if not exists
        if (!document.querySelector('#rippleStyles')) {
            const style = document.createElement('style');
            style.id = 'rippleStyles';
            style.textContent = `
                @keyframes rippleEffect {
                    to {
                        transform: translate(var(--x), var(--y)) scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('Button clicked:', e.target.textContent);
    }
});

// Default data fallback (same as before but with enhanced styling)
function useDefaultData() {
    const defaultData = {
        features: [
            {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Our script won’t slow down or lag your device."
            },
            {
                icon: "🔒",
                title: "Quantum Security",
                description: "Worried your script isn’t safe? Don’t worry—ours has been proven secure for 2 years and is the first hub to bypass anti-cheat systems!"
            },
            {
                icon: "🌍",
                title: "Trusted",
                description: "Our hub has over 1,600 buyers and has been trusted for 2 years."
            },
            {
                icon: "🎯",
                title: "99.9% Uptime",
                description: "Our script is always online 24/7—no downtime at all."
            },
            {
                icon: "🛠️",
                title: "Always Updated",
                description: "Tired of hubs that rarely update? Don’t worry—we update daily whenever there’s a new game update!"
            },
            {
                icon: "💬",
                title: "Fast Support",
                description: "We have a support team ready 24/7—no more unresolved issues!"
            }
        ],
        benefits: [
            {
                icon: "🚀",
                title: "Next-Gen Performance",
                points: [
                    "Doesn't slow down devices",
                    "AI-powered optimization",
                    "Fast Autofarm",
                    "Anti CPU Leak Technology"
                ]
            },
            {
                icon: "💎",
                title: "Premium Features",
                points: [
                    "5 Billion+ in just 1 hour",
                    "Webhook integration",
                    "Better UI",
                    "Improved Autofarm Panel"
                ]
            },
            {
                icon: "📊",
                title: "Tons of Features",
                points: [
                    "Truck Autofarm",
                    "Minigame Autofarm",
                    "Event Autofarm",
                    "Auto Time Trial"
                ]
            }
        ],
        pricing: [
            {
                name: "Free",
                price: "0",
                period: "lifetime",
                features: [
                    "1 Account",
                    "1 HWID",
                    "Slow Autofarm",
                    "Basic Support",
                    "Limited Features"
                ]
            },
            {
                name: "Professional",
                price: "100,000",
                period: "lifetime",
                featured: true,
                features: [
                    "Unlimited accounts",
                    "10 HWIDs",
                    "Priority support",
                    "Fast Autofarm",
                    "AI-powered Autofarm, safer and more stable"
                ],
                cta: "Most Popular"
            },
            {
                name: "Enterprise",
                price: "150,000",
                period: "lifetime",
                features: [
                    "Unlimited accounts",
                    "Unlimited HWIDs",
                    "No HWID Reset Needed",
                    "Sharing Allowed",
                    "Lite Version Access",
                    "Super Stable",
                    "Anti Force Close Technology"
                ],
                cta: "Contact Sales"
            }
        ],
testimonials: [
            {
                name: "kecikthejago",
                role: "Customer",
                company: "",
                avatar: "https://media.discordapp.net/attachments/1251862836297203853/1379198085216862320/805749700291592213_1748896847398.webp?ex=684e870f&is=684d358f&hm=7d8a3d8e948a68e69c26a0b828f3963e88a01e399509a13166372f6ad109c605&=&format=webp",
                text: "I have never experienced any of the problem i got from past script i use like, this is moderation text. your gameplay has been log for review. the script hasnt been any problem since i use, its 2 month now. good job atomical team..",
                rating: 5
            },
            {
                name: "posaidonlele",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1376951458003419147/1105531206881251368_1748361209730.webp?ex=684eec7a&is=684d9afa&hm=965c277e165d4d985b2b7d37771d6584419258ab181ebc176ca5cccf39658e9f",
                text: "This script is very fast to get money in cdid, and many good features, and I really salute the service of the staff, the staff is very fast",
                rating: 5
            },
            {
                name: "kylisc",
                role: "Customer / Showcaser",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1375448688289386506/1351900508679311384_1748002921484.webp?ex=684ebae9&is=684d6969&hm=e21bbd02ac27f10b849383da53a2eeff7f6f17ab8c04d801609501c23ba96e4e",
                text: "Gacorrrr no ban ban dah pokoknya mah ngenahh pisan make na",
                rating: 5
            },
            {
                name: "mik_cdid ",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1372207035344748614/848973190172377088_1747230051156.webp?ex=684ecd63&is=684d7be3&hm=61115646bb2c9e5c5374b5a0d04296d46f8d2182d59109d883c585cbba170916",
                text: "Gacor Parah wok, nyesel sih kalo lu pada ga beli 😝",
                rating: 5
            },
            {
                name: "skymyname",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1372011879475580958/1213845005068800080_1747183522472.webp?ex=684ec062&is=684d6ee2&hm=a187dce2bfb8fa7d17268587fdefc97a90c7503a62bc01de3853b2f4d6e01807",
                text: "duit dah 100m+ gara gara mske scini tinggal tunggu update cik gacorr",
                rating: 5
            },
            {
                name: "mban._07016",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1369065202024321084/1137433102394859580_1746480979721.webp?ex=684e9414&is=684d4294&hm=bf170d1b9bac5fcea0d02b5b82b4dfcf95a7f768e875534b08da2a77fa9c0fe2",
                text: "gileee gg bgt. bisa kaya secara money dan point hanya dengan hitungan jam, gg emg atomicals ni",
                rating: 5
            },
            {
                name: "d12",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1368763617528385536/739428523512692736_1746409076356.webp?ex=684eccb4&is=684d7b34&hm=04ae9ba0f2cb52e9ebe54e387b6293a5596907cb72799372846b88ccac619ff1&",
                text: "worth the price dan gk pernah mengecewakan dari awal",
                rating: 5
            },
            {
                name: "valendra712",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1368540845711556769/1239378641419370567_1746355963463.webp?ex=684ea5fb&is=684d547b&hm=748715a5fe8de2424a2e87e556aa4f1aabc07d6ba274841ff3f5377666a6b9be",
                text: "Suka sama scriptnya easy to use dan ga main main dalam hasilnya,keep it up atomical🤝",
                rating: 5
            },
            {
                name: "variesv1",
                role: "Customer",
                company: "",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1368221778555699240/838618710645276712_1746279891979.webp?ex=684ece54&is=684d7cd4&hm=f486eb81760bf292c6fac2fcf8ad6bf0d33f5e5e5d38ef7d3df8fc41514b361e",
                text: "baru beli, gacor banget, staff ramah membantu fast res fast proses ily ♥️",
                rating: 5
            }
        ],
        faq: [
            {
                question: "What is Atomic Hub CDID?",
                answer: "Atomic Hub CDID is the best, fastest, and safest CDID script in Indonesia. Trusted for over 2 years!"
            },
            {
                question: "How much can I earn from autofarm?",
                answer: "Without the gamepass (50% Job Earnings), you’ll earn over 3 billion per hour. With the gamepass, over 5 billion per hour."
            },
            {
                question: "Is this script safe to use?",
                answer: "Yes! Our script has been proven safe for over 2 years, and many users rely on it. We also use anti force-close technology for added stability."
            },
            {
                question: "Is this script good for boosting (joki)?",
                answer: "Great question! Yes—it’s ideal for boosting. We have features like truck autofarm, minigame autofarm, and event autofarm. Nearly 100% of boosters in CDID use our script because it’s incredibly stable!"
            }
        ]
    };

    initFeatures(defaultData.features);
    initBenefits(defaultData.benefits);
    initPricing(defaultData.pricing);
    initTestimonials(defaultData.testimonials);
    initFAQ(defaultData.faq);
}
