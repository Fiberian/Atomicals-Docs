// PUSINK GUE NGENTOTTT, YANG BACA KEK KONTOLL!@

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedCursor();
    initEnhancedBootAnimation();
    initSmoothScrollEffects();
    initEnhancedHeroAnimations();
    initEnhancedParticleCanvas();
    
    // Load data only once
    loadDataAndInitialize();
    
    initMobileMenu();
});

// Enhanced Custom Cursor with Trail Effect
function initEnhancedCursor() {
    const cursor = document.getElementById('cursorOrb');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        // Mouse position tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation with spring physics
        function animateCursor() {
            const speed = 0.12;
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;
            
            cursorX += distX * speed;
            cursorY += distY * speed;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Enhanced hover effects
        const interactiveElements = document.querySelectorAll(
            'a, button, .feature-card, .benefit-card, .pricing-card, .testimonial-card, .faq-item, .nav-link, input, textarea'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                el.style.transform = 'scale(1.02)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                el.style.transform = 'scale(1)';
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Enhanced Boot Animation with Matrix Effect
function initEnhancedBootAnimation() {
    const bootScreen = document.getElementById('bootScreen');
    const bootStatus = document.querySelector('.boot-status');
    const bootText = document.querySelector('.boot-text');
    
    // Add blur reveal class
    setTimeout(() => {
        bootText.classList.add('blur-reveal');
        bootStatus.classList.add('blur-reveal');
    }, 100);
    
    // Status messages with tech feel
    const statusMessages = [
        'Initializing Quantum Core...',
        'Loading Glass Engine...',
        'Establishing Neural Link...',
        'Calibrating Systems...',
        'Welcome to Atomic Hub'
    ];
    
    let messageIndex = 0;
    const statusInterval = setInterval(() => {
        if (messageIndex < statusMessages.length) {
            bootStatus.style.opacity = '0';
            bootStatus.style.filter = 'blur(20px)';
            
            setTimeout(() => {
                bootStatus.textContent = statusMessages[messageIndex];
                bootStatus.style.opacity = '1';
                bootStatus.style.filter = 'blur(0)';
            }, 200);
            
            messageIndex++;
        }
    }, 600);
    
    // Enhanced hide boot screen
    setTimeout(() => {
        clearInterval(statusInterval);
        bootScreen.classList.add('hidden');
        
        // Start page animations
        setTimeout(() => {
            animatePageContent();
        }, 300);
    }, 3500);
}

// Animate all page content with blur
function animatePageContent() {
    // Animate navbar
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('visible');
    
    // Animate nav links with stagger
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // Animate hero content
    const blurElements = document.querySelectorAll('.blur-load');
    blurElements.forEach((el) => {
        const delay = el.dataset.delay || 0;
        el.style.setProperty('--delay', delay);
        
        setTimeout(() => {
            el.classList.add('visible');
        }, delay * 1000);
    });
    
    // Start hero animations
    setTimeout(() => {
        startTypingAnimation();
        animateHeroStats();
    }, 800);
}

// Enhanced Particle Canvas with Connection Lines
function initEnhancedParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth > 768 ? 100 : 50;
    const connectionDistance = 150;
    let mouseX = 0;
    let mouseY = 0;
    
    // Mouse tracking for particle interaction
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.color = Math.random() > 0.5 ? '139, 92, 246' : '232, 121, 249';
        }
        
        update() {
            // Movement
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= (dx / distance) * force * 2;
                this.y -= (dy / distance) * force * 2;
            }
            
            // Wrap around edges
            if (this.x > width + 50) this.x = -50;
            if (this.x < -50) this.x = width + 50;
            if (this.y > height + 50) this.y = -50;
            if (this.y < -50) this.y = height + 50;
            
            // Pulse effect
            this.pulsePhase += this.pulseSpeed;
            this.currentOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.3;
        }
        
        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.currentOpacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
            gradient.addColorStop(0, `rgba(${this.color}, ${this.currentOpacity * 0.5})`);
            gradient.addColorStop(1, `rgba(${this.color}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const distance = Math.hypot(a.x - b.x, a.y - b.y);
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    
                    // Gradient line
                    const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                    gradient.addColorStop(0, `rgba(${a.color}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${b.color}, ${opacity})`);
                    
                    ctx.strokeStyle = gradient;
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

// Enhanced Smooth Scroll Effects
function initSmoothScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    function updateScroll() {
        const currentScroll = window.pageYOffset;
        
        // Navbar morphing with blur
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Enhanced parallax for hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && currentScroll < window.innerHeight) {
            const opacity = Math.max(0, 1 - (currentScroll / 600));
            const blur = Math.min(30, currentScroll / 20);
            const scale = 1 - (currentScroll / 2000);
            
            heroContent.style.opacity = opacity;
            heroContent.style.filter = `blur(${blur}px)`;
            heroContent.style.transform = `translateY(${currentScroll * 0.4}px) scale(${scale})`;
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
    
    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                // Add blur effect during scroll
                document.body.style.transition = 'filter 0.3s ease';
                document.body.style.filter = 'blur(2px)';
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    document.body.style.filter = 'blur(0)';
                }, 300);
            }
        });
    });
}

// Enhanced Hero Animations with Blur
function initEnhancedHeroAnimations() {
    // Advanced typing effect
    startTypingAnimation();
    
    // Animated stats
    animateHeroStats();
}

// Enhanced typing animation with blur
function startTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const phrases = [
        '#1 CDID SCRIPT',
        'ATOMIC HUB V4.0',
        'BETTER AUTOFARM',
        'MAXIMUM PERFORMANCE',
        'TRUSTED WORLDWIDE'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        // Apply typing class for blur effect
        typingText.classList.add('typing');
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Character change blur effect
        typingText.style.filter = 'blur(4px)';
        setTimeout(() => {
            typingText.style.filter = 'blur(0)';
        }, 50);
        
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

// Animate hero stats when visible
function animateHeroStats() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateValueWithBlur(stat);
                    }, index * 200);
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

// Enhanced counter animation with blur effect
function animateValueWithBlur(element) {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2500;
    const start = 0;
    const startTime = Date.now();
    
    // Initial blur
    element.style.filter = 'blur(20px)';
    element.style.transform = 'scale(0.8)';
    
    function updateValue() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        // Gradually reduce blur and scale
        const blurAmount = 20 * (1 - progress);
        const scale = 0.8 + (0.2 * progress);
        element.style.filter = `blur(${blurAmount}px)`;
        element.style.transform = `scale(${scale})`;
        
        if (progress < 1) {
            if (isDecimal) {
                element.textContent = current.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(updateValue);
        } else {
            element.style.filter = 'blur(0)';
            element.style.transform = 'scale(1)';
            if (isDecimal) {
                element.textContent = target.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(target).toLocaleString();
            }
        }
    }
    
    updateValue();
}

// Enhanced Blur Intersection Observer
function initBlurIntersectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const blurObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on position
                const rect = entry.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const delay = Math.min((rect.top / viewportHeight) * 0.3, 0.5);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
            }
        });
    }, observerOptions);
    
    // Observe all elements that need blur animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .pricing-card, .faq-item, .blur-load:not(.visible)'
    );
    
    animateElements.forEach(el => {
        blurObserver.observe(el);
    });
}

// Load data and initialize components
// Load data and initialize components
let dataLoaded = false; // Flag to prevent duplicate loading

async function loadDataAndInitialize() {
    // Prevent duplicate loading
    if (dataLoaded) return;
    dataLoaded = true;
    
    // Clear existing content first
    clearAllContent();
    
    try {
        // Check if database.json exists
        const response = await fetch('database.json');
        if (!response.ok) {
            throw new Error('Database file not found');
        }
        const data = await response.json();
        
        initFeatures(data.features);
        initBenefits(data.benefits);
        initPricing(data.pricing);
        initEnhancedTestimonials(data.testimonials);
        initFAQ(data.faq);
        
        // Reinitialize observers after content load
        setTimeout(() => {
            initBlurIntersectionObservers();
        }, 100);
    } catch (error) {
        console.error('Error loading data, using default:', error);
        useDefaultData();
        
        // Reinitialize observers after default data
        setTimeout(() => {
            initBlurIntersectionObservers();
        }, 100);
    }
}

// Clear all dynamic content
function clearAllContent() {
    const elements = [
        'featuresGrid',
        'benefitsGrid',
        'pricingGrid',
        'testimonialsTrack',
        'faqGrid'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = '';
        }
    });
}

// Initialize Features with enhanced blur
function initFeatures(features) {
    const grid = document.getElementById('featuresGrid');
    if (!grid || !features) return;
    
    features.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Benefits with enhanced animations
function initBenefits(benefits) {
    const grid = document.getElementById('benefitsGrid');
    if (!grid || !benefits) return;
    
    benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.style.animationDelay = `${index * 0.15}s`;
        
        const pointsList = benefit.points.map(point => 
            `<li>${point}</li>`
        ).join('');
        
        card.innerHTML = `
            <div class="benefit-icon">${benefit.icon}</div>
            <h3>${benefit.title}</h3>
            <ul>${pointsList}</ul>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize Pricing with enhanced animations
function initPricing(pricing) {
    const grid = document.getElementById('pricingGrid');
    if (!grid || !pricing) return;
    
    pricing.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = plan.featured ? 'pricing-card featured' : 'pricing-card';
        card.style.animationDelay = `${index * 0.2}s`;
        
        const featuresList = plan.features.map(feature => 
            `<li class="pricing-feature">
                <span class="feature-check">✓</span>
                <span>${feature}</span>
            </li>`
        ).join('');
        
        card.innerHTML = `
            ${plan.featured ? '<div class="pricing-border-animation"></div>' : ''}
            ${plan.featured ? '<div class="pricing-badge">MOST POPULAR</div>' : ''}
            ${plan.featured ? '<div class="pricing-sparkle"></div>' : ''}
            <div class="pricing-name">${plan.name}</div>
            <div class="pricing-price">${plan.price}</div>
            <div class="pricing-period">${plan.period}</div>
            <ul class="pricing-features">${featuresList}</ul>
            <button class="btn-pricing" onclick="window.open('https://discord.gg/getsades', '_blank')">${plan.cta || 'Get Started'}</button>
        `;
        
        // Add hover effect with tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            if (plan.featured) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            } else {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (plan.featured) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = '';
            }
            
            // Smooth transition back
            card.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                card.style.transition = '';
            }, 300);
        });
        
        grid.appendChild(card);
    });
}

// Enhanced Testimonials with Infinite Horizontal Scroll
function initEnhancedTestimonials(testimonials) {
    const track = document.getElementById('testimonialsTrack');
    if (!track || !testimonials) return;
    
    // Clear existing content
    track.innerHTML = '';
    
    // Create testimonial cards
    const createTestimonialCard = (testimonial) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const stars = '★'.repeat(testimonial.rating);
        
        card.innerHTML = `
            <div class="testimonial-quote">"</div>
            <div class="testimonial-header">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <div class="testimonial-role">${testimonial.role}</div>
                    <div class="testimonial-date">${testimonial.date}</div>
                </div>
            </div>
            <div class="testimonial-content">
                "${testimonial.text}"
            </div>
            <div class="testimonial-rating">
                ${stars.split('').map(() => '<span class="star">★</span>').join('')}
            </div>
        `;
        
        return card;
    };
    
    // Create multiple sets for smooth infinite scroll
    const sets = 3; // Number of sets to ensure smooth loop
    for (let i = 0; i < sets; i++) {
        testimonials.forEach(testimonial => {
            track.appendChild(createTestimonialCard(testimonial));
        });
    }
    
    // Calculate animation duration based on content
    const cardWidth = 450; // Approximate card width including gap
    const totalWidth = testimonials.length * cardWidth;
    const duration = totalWidth / 50; // Adjust speed here (lower = faster)
    
    // Apply dynamic animation duration
    track.style.animationDuration = `${duration}s`;
    
    // Pause on hover functionality
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Touch support for mobile
    let touchStart = 0;
    track.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    });
}

// Initialize FAQ with enhanced blur animations
function initFAQ(faqItems) {
    const grid = document.getElementById('faqGrid');
    if (!grid || !faqItems) return;
    
    faqItems.forEach((item, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.style.animationDelay = `${index * 0.1}s`;
        
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
            // Close other items with blur effect
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqElement && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.style.filter = 'blur(2px)';
                    setTimeout(() => {
                        item.style.filter = 'blur(0)';
                    }, 300);
                }
            });
            
            // Toggle current item
            faqElement.classList.toggle('active');
            
            // Blur effect on toggle
            faqElement.style.filter = 'blur(5px)';
            setTimeout(() => {
                faqElement.style.filter = 'blur(0)';
            }, 150);
        });
        
        grid.appendChild(faqElement);
    });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
    });
}

// Enhanced Ripple Effect
document.addEventListener('click', (e) => {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        
        // Remove existing ripples
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Create ripple
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
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
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: rippleEffect 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Default data fallback
function useDefaultData() {
    const defaultData = {
        features: [
            { icon: "⚡", title: "Lightning Fast", description: "Our script won't slow down or lag your device - optimized for peak performance." },
            { icon: "🔒", title: "Quantum Security", description: "Proven secure for 2 years, first hub to bypass anti-cheat!" },
            { icon: "🌍", title: "Trusted Worldwide", description: "Over 1,600+ buyers trust our service globally." },
            { icon: "🎯", title: "99.9% Uptime", description: "Always online 24/7 with no downtime guaranteed." },
            { icon: "🛠️", title: "Daily Updates", description: "Updated daily with every game update!" },
            { icon: "💬", title: "24/7 Support", description: "Support team ready to help anytime!" }
        ],
        benefits: [
            {
                icon: "🚀",
                title: "Next-Gen Performance",
                points: ["No device slowdown", "AI-powered optimization", "Lightning autofarm", "Anti CPU leak tech", "Quantum processing"]
            },
            {
                icon: "💎",
                title: "Premium Features",
                points: ["5 Billion+ per hour", "Webhook integration", "Beautiful UI", "Enhanced autofarm", "Custom configs"]
            },
            {
                icon: "📊",
                title: "Complete Features",
                points: ["Truck Autofarm", "Minigame Autofarm", "Event Autofarm", "Auto Time Trial", "Smart Routes"]
            }
        ],
        pricing: [
            {
                name: "Free Trial",
                price: "FREE",
                period: "lifetime",
                features: ["1 Account", "1 HWID", "Basic autofarm", "Community support", "Limited features"]
            },
            {
                name: "Professional",
                price: "IDR 100K",
                period: "lifetime",
                featured: true,
                features: ["Unlimited accounts", "10 HWIDs", "Priority support", "Fast autofarm", "AI features", "All premium features"],
                cta: "Most Popular"
            },
            {
                name: "Enterprise",
                price: "IDR 150K",
                period: "lifetime",
                features: ["Unlimited accounts", "Unlimited HWIDs", "No HWID reset", "Sharing allowed", "All features", "Personal support"],
                cta: "Best Value"
            }
        ],
        testimonials: [
            {
                name: "valendra712",
                role: "Customer",
                date: "5/4/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1368540845711556769/1239378641419370567_1746355963463.webp?ex=684ea5fb&is=684d547b&hm=748715a5fe8de2424a2e87e556aa4f1aabc07d6ba274841ff3f5377666a6b9be",
                text: "Suka sama scriptnya easy to use dan ga main main dalam hasilnya,keep it up atomical🤝",
                rating: 5
            },
            {
                name: "variesv",
                role: "Customer",
                date: "5/3/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1368221778555699240/838618710645276712_1746279891979.webp?ex=684ece54&is=684d7cd4&hm=f486eb81760bf292c6fac2fcf8ad6bf0d33f5e5e5d38ef7d3df8fc41514b361e",
                text: "This script is incredibly fast for earning money in CDID, has many great features, and I really appreciate the staff's service - they respond super quickly!",
                rating: 5
            },
            {
                name: "subspiinx",
                role: "Customer",
                date: "5/2/2025",
                avatar: "https://media.discordapp.net/attachments/1251862836297203853/1367885254039179436/1112933496705523722_1746199658278.webp?ex=684ee66a&is=684d94ea&hm=599ffc380a7919c52bedabcab5e7c07d95ea2d3e92488dc1715c60c3ffb2c0c3&=&format=webp",
                text: "GACOR DAH POKOKNYA MAH ANTI KERUT ANTI BOCOR!!",
                rating: 5
            },
            {
                name: "banunugraha ",
                role: "Customer",
                date: "4/29/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1366772630560051220/1340326310286725170_1745934388057.webp?ex=684eceb4&is=684d7d34&hm=e671180f8bd478b1c0e29bfa29503c5bc5c4bc2df07a3c22c8634216282194b5",
                text: "Mantap dehh dijelasin se jelas jelasnya se detail detai nyaa, btw aku belum pernah pale script dan ini pertama kalinya pakee, mudah banget soalnya dibantu sampe bisaaa",
                rating: 5
            },
            {
                name: "2in1guy",
                role: "Customer",
                date: "4/28/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1366375817738850344/365882381187547136_1745839780341.webp?ex=684eaea4&is=684d5d24&hm=0784915bf4e24f6d09904d4f7095cff01cbaea9321eb7ad22c9f9703a5c35647",
                text: "Best bgt scriptnya!!! admin juga ramah bgt, mantap pollllll!",
                rating: 5
            },
            {
                name: "piwpowwwa",
                role: "Customer",
                date: "4/28/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1366346952417087518/1314738556622868542_1745832898597.webp?ex=684f3c82&is=684deb02&hm=083ed6a892896e6f2a310eed14526f62ded4eee2c478cdb6f587e4492f50b4a2",
                text: "mantap intinya dri awalnya bnyk problem smpe teroptimalisasi dengan baik gacor dahh intinya, semoga terus berkembang smpe bisa 100 triliun per detik",
                rating: 5
            },
            {
                name: "akugemaaaa",
                role: "Customer",
                date: "4/27/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1365846747305349130/842374297183191050_1745713640583.webp?ex=684ebc28&is=684d6aa8&hm=15dcc2fd89384f47e177416f881875f8c94a76d43629d245ed9d4cafbbf80fbd",
                text: "mantap intinya dri awalnya bnyk problem smpe teroptimalisasi dengan baik gacor dahh intinya, semoga terus berkembang smpe bisa 100 triliun per detik",
                rating: 5
            },
            {
                name: "flevii_",
                role: "Customer",
                date: "4/26/2025",
                avatar: "https://media.discordapp.net/attachments/1251862836297203853/1365642371211067433/1303349384922005506_1745664913321.webp?ex=684ea691&is=684d5511&hm=534e7b49457a1ac08e48d9aff462775409ac5ab1074ff433a1ce9cb7156f6c14&=&format=webp",
                text: "Best CDID script ever, I never felt good using roblox script, until I found Atomic, and its feel good 🌟",
                rating: 5
            },
            {
                name: "moltreess",
                role: "Customer - Donator",
                date: "4/26/2025",
                avatar: "https://cdn.discordapp.com/attachments/1251862836297203853/1365620661569196063/305731356531490817_1745659737176.webp?ex=684f3b19&is=684de999&hm=dd8c6300760468884168db7577809cc5d5a1ac2470c8309ce58209cf805a7ff9",
                text: "It's been a year since I used this script, and overall, not bad! \nUdah improve banyak banget aselii, yang mulai consume CPU Dan ramnya jadi lebih kecil, autofarm minigame, Dan Masih banyak lagi! What are you waiting for? Buy a premium Script Right Now.",
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
                answer: "Without gamepass: 3 Billion+ per hour. With gamepass (50% Job Earnings): 5 Billion+ per hour."
            },
            {
                question: "Is this script safe to use?",
                answer: "Yes! Our script has been proven safe for 2 years with anti force-close technology."
            },
            {
                question: "How do I get support?",
                answer: "Join our Discord at discord.gg/getsades for 24/7 support. Our team responds within minutes!"
            }
        ]
    };
    
    initFeatures(defaultData.features);
    initBenefits(defaultData.benefits);
    initPricing(defaultData.pricing);
    initEnhancedTestimonials(defaultData.testimonials);
    initFAQ(defaultData.faq);
}

// Performance optimization - Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize particle canvas on resize
        initEnhancedParticleCanvas();
    }, 250);
});

// Add page visibility handling
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.testimonials-track').forEach(track => {
            track.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page is visible
        document.querySelectorAll('.testimonials-track').forEach(track => {
            track.style.animationPlayState = 'running';
        });
    }
});
