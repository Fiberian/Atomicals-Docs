// Enhanced Atomic Hub Script with Performance Optimization

// Performance Detection and Settings
const PerformanceManager = {
    isLowEnd: false,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Performance settings
    settings: {
        high: {
            particleCount: 120,
            blurAmount: 40,
            animationsEnabled: true,
            complexEffects: true,
            parallaxEnabled: true,
            glowEffects: true
        },
        medium: {
            particleCount: 60,
            blurAmount: 20,
            animationsEnabled: true,
            complexEffects: false,
            parallaxEnabled: true,
            glowEffects: false
        },
        low: {
            particleCount: 30,
            blurAmount: 10,
            animationsEnabled: false,
            complexEffects: false,
            parallaxEnabled: false,
            glowEffects: false
        }
    },
    
    currentSettings: null,
    
    init() {
        this.detectPerformance();
        this.applySettings();
        this.setupAdaptiveQuality();
    },
    
    detectPerformance() {
        // Check for low-end device indicators
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        
        // Simple performance detection
        if (this.isMobile || memory <= 4 || cores <= 2 || this.prefersReducedMotion) {
            this.isLowEnd = true;
        }
        
        // Check GPU
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                // Check for integrated/low-end GPUs
                if (/Intel|Mobile|Integrated/i.test(renderer)) {
                    this.isLowEnd = true;
                }
            }
        }
        
        // Set performance tier
        if (this.isLowEnd) {
            this.currentSettings = this.settings.low;
        } else if (this.isMobile) {
            this.currentSettings = this.settings.medium;
        } else {
            this.currentSettings = this.settings.high;
        }
    },
    
    applySettings() {
        const root = document.documentElement;
        
        if (this.isLowEnd) {
            root.classList.add('low-performance');
            // Disable heavy effects via CSS
            root.style.setProperty('--blur-amount', '10px');
            root.style.setProperty('--animation-duration', '0s');
        } else if (this.isMobile) {
            root.classList.add('medium-performance');
            root.style.setProperty('--blur-amount', '20px');
        }
        
        // Disable animations if reduced motion is preferred
        if (this.prefersReducedMotion) {
            root.classList.add('reduced-motion');
        }
    },
    
    setupAdaptiveQuality() {
        // Monitor FPS and adjust quality dynamically
        let frameCount = 0;
        let lastTime = performance.now();
        let lowFPSCount = 0;
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is consistently low, reduce quality
                if (fps < 30) {
                    lowFPSCount++;
                    if (lowFPSCount > 3 && this.currentSettings !== this.settings.low) {
                        console.log('Low FPS detected, reducing quality');
                        this.currentSettings = this.settings.low;
                        this.applySettings();
                        // Reduce particle count if particle system exists
                        if (window.particleSystem) {
                            window.particleSystem.reduceParticles();
                        }
                    }
                } else {
                    lowFPSCount = 0;
                }
            }
            
            if (!this.isLowEnd) {
                requestAnimationFrame(checkFPS);
            }
        };
        
        // Only monitor FPS on non-low-end devices
        if (!this.isLowEnd) {
            requestAnimationFrame(checkFPS);
        }
    }
};

// Load GSAP with performance check
function loadGSAP() {
    return new Promise((resolve) => {
        // Skip GSAP on very low-end devices
        if (PerformanceManager.isLowEnd) {
            resolve();
            return;
        }
        
        if (typeof gsap !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = resolve;
        script.onerror = resolve; // Continue even if GSAP fails to load
        document.head.appendChild(script);
    });
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize performance manager first
    PerformanceManager.init();
    
    await loadGSAP();
    
    // Initialize components based on performance
    if (!PerformanceManager.isLowEnd) {
        initOptimizedCursor();
        initOptimizedParticleCanvas();
    }
    
    initOptimizedBootAnimation();
    initOptimizedScrollEffects();
    initOptimizedHeroAnimations();
    
    // Load data
    loadDataAndInitialize();
    
    initMobileMenu();
    initOptimizedInteractions();
});

// Optimized Custom Cursor
function initOptimizedCursor() {
    const cursor = document.getElementById('cursorOrb');
    
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) {
        if (cursor) cursor.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let rafId = null;
    
    // Throttled mouse tracking
    let moveTimer;
    document.addEventListener('mousemove', (e) => {
        clearTimeout(moveTimer);
        moveTimer = setTimeout(() => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, 16); // ~60fps
    });
    
    // Optimized cursor animation
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        rafId = requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Simplified hover effects
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
        } else if (!document.hidden) {
            rafId = requestAnimationFrame(animateCursor);
        }
    });
}

// Optimized Boot Animation
function initOptimizedBootAnimation() {
    const bootScreen = document.getElementById('bootScreen');
    
    // Skip boot animation on low-end devices
    if (PerformanceManager.isLowEnd) {
        bootScreen.classList.add('hidden');
        setTimeout(animatePageContent, 100);
        return;
    }
    
    // Simplified boot animation
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        animatePageContent();
    }, 1500);
}

// Optimized page content animation
function animatePageContent() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.add('visible');
    
    // Use CSS animations instead of JS for blur elements
    const blurElements = document.querySelectorAll('.blur-load');
    
    if (PerformanceManager.isLowEnd) {
        // Instant show on low-end devices
        blurElements.forEach(el => el.classList.add('visible'));
    } else {
        // Staggered animation on capable devices
        blurElements.forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 100);
        });
    }
    
    // Start animations
    setTimeout(() => {
        if (!PerformanceManager.isLowEnd) {
            startOptimizedTypingAnimation();
        }
        animateHeroStats();
    }, 500);
}

// Optimized Particle System
let particleSystem = null;

function initOptimizedParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = PerformanceManager.currentSettings.particleCount;
    const connectionDistance = PerformanceManager.isMobile ? 120 : 150;
    
    class OptimizedParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Simple boundary check
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
        particles.push(new OptimizedParticle());
    }
    
    let animationId;
    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > frameInterval) {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Simple connections (only if not low-end)
            if (!PerformanceManager.isLowEnd && particles.length < 50) {
                ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
                ctx.lineWidth = 1;
                
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < connectionDistance) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            lastTime = currentTime;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate(0);
    
    // Optimized resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 300);
    });
    
    // Pause when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animationId = requestAnimationFrame(animate);
        }
    });
    
    // Expose particle system for dynamic quality adjustment
    window.particleSystem = {
        reduceParticles: () => {
            const reduceBy = Math.floor(particles.length / 2);
            particles.splice(0, reduceBy);
        }
    };
}

// Optimized Smooth Scroll
function initOptimizedScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    function updateScroll() {
        const currentScroll = window.pageYOffset;
        
        // Navbar state
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax only on capable devices
        if (!PerformanceManager.isLowEnd && PerformanceManager.currentSettings.parallaxEnabled) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && currentScroll < window.innerHeight) {
                const translateY = currentScroll * 0.4;
                const opacity = Math.max(0, 1 - (currentScroll / 600));
                
                heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
                heroContent.style.opacity = opacity;
            }
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }, 10);
    }, { passive: true });
    
    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                if (PerformanceManager.isLowEnd) {
                    // Instant scroll on low-end devices
                    window.scrollTo(0, offsetTop);
                } else {
                    // Smooth scroll on capable devices
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Optimized Hero Animations
function initOptimizedHeroAnimations() {
    if (!PerformanceManager.isLowEnd) {
        startOptimizedTypingAnimation();
    }
    animateHeroStats();
}

// Optimized Typing Animation
function startOptimizedTypingAnimation() {
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
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typingText.classList.add('typing');
        
        let typingSpeed = isDeleting ? 50 : 100;
        
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

// Optimized stats animation
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (PerformanceManager.isLowEnd) {
                    // Instant value on low-end devices
                    const target = parseFloat(element.dataset.target);
                    const isDecimal = element.dataset.decimal === 'true';
                    element.textContent = isDecimal ? target.toFixed(1) + '%' : Math.floor(target).toLocaleString();
                } else {
                    animateValue(element);
                }
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px' });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Simplified counter animation
function animateValue(element) {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple easing
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = start + (target - start) * easeOutQuad;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Optimized Intersection Observer
function initOptimizedObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    // Batch observe elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add visible class with minimal delay
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .pricing-card, .faq-item, .blur-load:not(.visible)'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// Load data and initialize components
let dataLoaded = false;

async function loadDataAndInitialize() {
    if (dataLoaded) return;
    dataLoaded = true;
    
    try {
        const response = await fetch('database.json');
        const data = await response.json();
        
        initFeatures(data.features);
        initBenefits(data.benefits);
        initPricing(data.pricing);
        initOptimizedTestimonials(data.testimonials);
        initFAQ(data.faq);
        
        // Initialize observers after content load
        requestAnimationFrame(() => {
            initOptimizedObservers();
        });
    } catch (error) {
        console.error('Error loading data:', error);
        // Use default data as fallback
        useDefaultData();
    }
}

// Initialize Features
function initFeatures(features) {
    const grid = document.getElementById('featuresGrid');
    if (!grid || !features) return;
    
    const fragment = document.createDocumentFragment();
    
    features.forEach((feature, index) => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        fragment.appendChild(card);
    });
    
    grid.appendChild(fragment);
}

// Initialize Benefits
function initBenefits(benefits) {
    const grid = document.getElementById('benefitsGrid');
    if (!grid || !benefits) return;
    
    const fragment = document.createDocumentFragment();
    
    benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const pointsList = benefit.points.map(point => 
            `<li>${point}</li>`
        ).join('');
        
        card.innerHTML = `
            <div class="benefit-icon">${benefit.icon}</div>
            <h3>${benefit.title}</h3>
            <ul>${pointsList}</ul>
        `;
        
        fragment.appendChild(card);
    });
    
    grid.appendChild(fragment);
}

// Initialize Pricing
function initPricing(pricing) {
    const grid = document.getElementById('pricingGrid');
    if (!grid || !pricing) return;
    
    const fragment = document.createDocumentFragment();
    
    pricing.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = plan.featured ? 'pricing-card featured' : 'pricing-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
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
            <button class="btn-pricing" onclick="window.open('https://discord.gg/getsades', '_blank')">${plan.cta || 'Get Started'}</button>
        `;
        
        // Simplified hover effect for low-end devices
        if (!PerformanceManager.isLowEnd) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
        
        fragment.appendChild(card);
    });
    
    grid.appendChild(fragment);
}

// Optimized Testimonials
function initOptimizedTestimonials(testimonials) {
    const track = document.getElementById('testimonialsTrack');
    if (!track || !testimonials) return;
    
    const fragment = document.createDocumentFragment();
    
    // Create fewer duplicates on mobile
    const sets = PerformanceManager.isMobile ? 2 : 3;
    
    for (let i = 0; i < sets; i++) {
        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            
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
                    ${'★'.repeat(testimonial.rating).split('').map(() => '<span class="star">★</span>').join('')}
                </div>
            `;
            
            fragment.appendChild(card);
        });
    }
    
    track.appendChild(fragment);
    
    // Adjust animation speed for performance
    const cardWidth = 450;
    const totalWidth = testimonials.length * cardWidth;
    const duration = totalWidth / (PerformanceManager.isLowEnd ? 30 : 50);
    
    track.style.animationDuration = `${duration}s`;
    
    // Pause on hover only on non-touch devices
    if (!PerformanceManager.isMobile) {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
}

// Initialize FAQ
function initFAQ(faqItems) {
    const grid = document.getElementById('faqGrid');
    if (!grid || !faqItems) return;
    
    const fragment = document.createDocumentFragment();
    
    faqItems.forEach((item, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.style.animationDelay = `${index * 0.05}s`;
        
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
        const answer = faqElement.querySelector('.faq-answer');
        const icon = faqElement.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isActive = faqElement.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqElement) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                faqElement.classList.remove('active');
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                faqElement.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
        
        fragment.appendChild(faqElement);
    });
    
    grid.appendChild(fragment);
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

// Optimized Interactions
function initOptimizedInteractions() {
    // Simple ripple effect only on non-low-end devices
    if (!PerformanceManager.isLowEnd) {
        document.addEventListener('click', (e) => {
            if (e.target.matches('button') || e.target.closest('button')) {
                const button = e.target.matches('button') ? e.target : e.target.closest('button');
                
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
                    animation: rippleEffect 0.6s ease-out;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }
}

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
    initOptimizedTestimonials(defaultData.testimonials);
    initFAQ(defaultData.faq);
    
    requestAnimationFrame(() => {
        initOptimizedObservers();
    });
}

// Page visibility handling for performance
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
