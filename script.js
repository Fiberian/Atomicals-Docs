// Enhanced Atomic Hub Script with Ultra-Smooth macOS-style Animations

// Load GSAP first
function loadGSAP() {
    return new Promise((resolve) => {
        if (typeof gsap !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.onload = () => {
            const scrollScript = document.createElement('script');
            scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js';
            scrollScript.onload = resolve;
            document.head.appendChild(scrollScript);
        };
        document.head.appendChild(script);
    });
}

// Initialize after GSAP is loaded
document.addEventListener('DOMContentLoaded', async function() {
    await loadGSAP();
    
    initEnhancedCursor();
    initEnhancedBootAnimation();
    initSmoothScrollEffects();
    initEnhancedHeroAnimations();
    initEnhancedParticleCanvas();
    
    // Load data only once
    loadDataAndInitialize();
    
    initMobileMenu();
    initAdvancedInteractions();
});

// Enhanced Custom Cursor with Smoother Trail Effect
function initEnhancedCursor() {
    const cursor = document.getElementById('cursorOrb');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let velocityX = 0, velocityY = 0;
        
        // Mouse position tracking with velocity
        document.addEventListener('mousemove', (e) => {
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            
            velocityX = deltaX;
            velocityY = deltaY;
            
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Ultra-smooth cursor animation with spring physics
        function animateCursor() {
            const springFactor = 0.15;
            const dampingFactor = 0.85;
            
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;
            
            const accX = distX * springFactor;
            const accY = distY * springFactor;
            
            velocityX = (velocityX + accX) * dampingFactor;
            velocityY = (velocityY + accY) * dampingFactor;
            
            cursorX += velocityX;
            cursorY += velocityY;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Add subtle rotation based on velocity
            const rotation = (velocityX * 0.5);
            cursor.style.transform = `rotate(${rotation}deg)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Enhanced hover effects with smooth transitions
        const interactiveElements = document.querySelectorAll(
            'a, button, .feature-card, .benefit-card, .pricing-card, .testimonial-card, .faq-item, .nav-link, input, textarea'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                el.style.transform = 'scale(1.05)';
                el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                el.style.transform = 'scale(1)';
            });
        });
        
        // Enhanced click effect
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.7)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Enhanced Boot Animation with Ultra-Smooth Matrix Effect
function initEnhancedBootAnimation() {
    const bootScreen = document.getElementById('bootScreen');
    const bootStatus = document.querySelector('.boot-status');
    const bootText = document.querySelector('.boot-text');
    const matrixDots = document.querySelectorAll('.matrix-dot');
    
    // Add blur reveal class
    setTimeout(() => {
        bootText.classList.add('blur-reveal');
        bootStatus.classList.add('blur-reveal');
    }, 100);
    
    // Status messages with smooth transitions
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
            }, 1);
            
            messageIndex++;
        }
    }, 1);
    
    // Enhanced hide boot screen
    setTimeout(() => {
        clearInterval(statusInterval);
        bootScreen.classList.add('hidden');
        
        // Start page animations
        setTimeout(() => {
            animatePageContent();
        }, 1);
    }, 1);
}

// Animate all page content with enhanced blur and stagger
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
        startEnhancedTypingAnimation();
        animateHeroStats();
    }, 800);
}

// Enhanced Particle Canvas with Advanced Connection Lines
function initEnhancedParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth > 768 ? 120 : 60;
    const connectionDistance = 180;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    
    // Enhanced mouse tracking with smooth interpolation
    const mouse = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    };
    
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
    });
    
    class EnhancedParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.color = Math.random() > 0.5 ? '139, 92, 246' : '232, 121, 249';
            this.orbitRadius = Math.random() * 50 + 20;
            this.orbitSpeed = Math.random() * 0.02 + 0.01;
            this.orbitPhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            // Smooth mouse interpolation
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            
            // Orbital movement
            this.orbitPhase += this.orbitSpeed;
            const orbitX = Math.cos(this.orbitPhase) * this.orbitRadius * 0.1;
            const orbitY = Math.sin(this.orbitPhase) * this.orbitRadius * 0.1;
            
            // Base movement with orbit
            this.x += this.speedX + orbitX;
            this.y += this.speedY + orbitY;
            
            // Enhanced mouse interaction with smooth attraction/repulsion
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);
                
                // Smooth repulsion with easing
                this.x -= Math.cos(angle) * force * 3 * (1 - force);
                this.y -= Math.sin(angle) * force * 3 * (1 - force);
            }
            
            // Smooth edge wrapping
            const margin = 50;
            if (this.x > width + margin) {
                this.x = -margin;
                this.y = Math.random() * height;
            }
            if (this.x < -margin) {
                this.x = width + margin;
                this.y = Math.random() * height;
            }
            if (this.y > height + margin) {
                this.y = -margin;
                this.x = Math.random() * width;
            }
            if (this.y < -margin) {
                this.y = height + margin;
                this.x = Math.random() * width;
            }
            
            // Smooth pulse effect
            this.pulsePhase += this.pulseSpeed;
            this.currentOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.3;
            this.currentSize = this.size + Math.sin(this.pulsePhase * 2) * 0.5;
        }
        
        draw() {
            // Main particle with gradient
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.currentSize * 2
            );
            gradient.addColorStop(0, `rgba(${this.color}, ${this.currentOpacity})`);
            gradient.addColorStop(1, `rgba(${this.color}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner glow
            ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize * 0.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Outer glow effect
            const glowGradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.currentSize * 8
            );
            glowGradient.addColorStop(0, `rgba(${this.color}, ${this.currentOpacity * 0.3})`);
            glowGradient.addColorStop(1, `rgba(${this.color}, 0)`);
            
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize * 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new EnhancedParticle());
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        time += 0.01;
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Enhanced connections with gradient and glow
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const distance = Math.hypot(a.x - b.x, a.y - b.y);
                if (distance < connectionDistance) {
                    const opacity = Math.pow(1 - distance / connectionDistance, 2) * 0.4;
                    
                    // Create gradient for connection line
                    const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                    gradient.addColorStop(0, `rgba(${a.color}, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.5})`);
                    gradient.addColorStop(1, `rgba(${b.color}, ${opacity})`);
                    
                    // Draw connection with glow
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    
                    // Add glow to connection
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Smooth resize handler
    window.addEventListener('resize', debounce(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, 250));
}

// Enhanced Smooth Scroll Effects with Parallax
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

// Enhanced Hero Animations
function initEnhancedHeroAnimations() {
    // Advanced typing effect
    startEnhancedTypingAnimation();
    
    // Animated stats with spring physics
    animateHeroStats();
    
    // Floating animation for hero elements
    gsap.to('.hero-badge', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// Enhanced typing animation with smooth blur
function startEnhancedTypingAnimation() {
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
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Smooth character change effect
        gsap.to(typingText, {
            filter: 'blur(0)',
            duration: 0.1,
            ease: "power2.out"
        });
        
        // Apply typing class
        typingText.classList.add('typing');
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
            
            // Phrase change effect
            gsap.fromTo(typingText, {
                filter: 'blur(20px)',
                scale: 0.9
            }, {
                filter: 'blur(0)',
                scale: 1,
                duration: 0.5,
                ease: "power3.out"
            });
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    setTimeout(typeEffect, 1000);
}

// Animate hero stats with enhanced effects
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
                        animateValueWithEnhancedBlur(stat);
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

// Enhanced counter animation with ultra-smooth blur effect
function animateValueWithEnhancedBlur(element) {
    const target = parseFloat(element.dataset.target);
    const isDecimal = element.dataset.decimal === 'true';
    const duration = 2500;
    const start = 0;
    const startTime = Date.now();
    
    // Initial blur
    element.style.filter = 'blur(20px)';
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Start animation
    setTimeout(() => {
        element.style.filter = 'blur(0)';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }, 100);
    
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
            }
            requestAnimationFrame(updateValue);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(target).toLocaleString();
            }
        }
    }
    
    updateValue();
}

// Enhanced Blur Intersection Observer with Smooth Animations
function initBlurIntersectionObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const blurObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const delay = Math.min((rect.top / viewportHeight) * 0.3, 0.5);
                
                // Add staggered delay
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay * 1000);
                
                blurObserver.unobserve(element);
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
let dataLoaded = false;

async function loadDataAndInitialize() {
    if (dataLoaded) return;
    dataLoaded = true;
    
    clearAllContent();
    
    try {
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
            initAdvancedInteractions();
        }, 100);
    } catch (error) {
        console.error('Error loading data, using default:', error);
        useDefaultData();
        
        setTimeout(() => {
            initBlurIntersectionObservers();
            initAdvancedInteractions();
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

// Initialize Features with enhanced animations
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
        
        // Add hover interaction
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
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

// Initialize Pricing with enhanced 3D tilt effect
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
        
        // Enhanced 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            if (plan.featured) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            
            if (plan.featured) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = '';
            }
            
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
        
        grid.appendChild(card);
    });
}

// Enhanced Testimonials with Smooth Infinite Scroll
function initEnhancedTestimonials(testimonials) {
    const track = document.getElementById('testimonialsTrack');
    if (!track || !testimonials) return;
    
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
    const sets = 3;
    for (let i = 0; i < sets; i++) {
        testimonials.forEach(testimonial => {
            track.appendChild(createTestimonialCard(testimonial));
        });
    }
    
    // Calculate animation duration based on content
    const cardWidth = 450;
    const totalWidth = testimonials.length * cardWidth;
    const duration = totalWidth / 50;
    
    track.style.animationDuration = `${duration}s`;
    
    // Enhanced pause on hover with smooth transition
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

// Initialize FAQ with enhanced smooth animations
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
        const answer = faqElement.querySelector('.faq-answer');
        const icon = faqElement.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isActive = faqElement.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqElement) {
                    item.classList.remove('active');
                    const itemAnswer = item.querySelector('.faq-answer');
                    const itemIcon = item.querySelector('.faq-icon');
                    itemAnswer.style.maxHeight = '0';
                    itemIcon.style.transform = 'rotate(0deg)';
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
            
            // Add blur effect
            faqElement.style.filter = 'blur(5px)';
            setTimeout(() => {
                faqElement.style.filter = 'blur(0)';
            }, 150);
        });
        
        grid.appendChild(faqElement);
    });
}

// Mobile Menu with smooth animations
function initMobileMenu() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
        
        // Animate mobile menu items
        if (navbar.classList.contains('mobile-open')) {
            const links = navbar.querySelectorAll('.nav-link');
            links.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}

// Advanced Interactions
function initAdvancedInteractions() {
    // Enhanced Ripple Effect
    document.addEventListener('click', (e) => {
        if (e.target.matches('button') || e.target.closest('button')) {
            const button = e.target.matches('button') ? e.target : e.target.closest('button');
            
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
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
                animation: rippleEffect 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
    
    // Magnetic buttons effect
    const magneticElements = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cta');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            elem.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
            elem.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    });
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
    initEnhancedTestimonials(defaultData.testimonials);
    initFAQ(defaultData.faq);
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

// Page visibility handling
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
