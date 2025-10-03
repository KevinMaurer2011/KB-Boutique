// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-link.active {
        color: #d4af37;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(notificationStyles);

// Motion preference handling
const motionMediaQuery = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: no-preference)')
    : null;
let motionFeaturesEnabled = false;
let animationObserver = null;
let observedMotionElements = [];
let transitionStyleElement = null;
let heroParallaxHandler = null;
let loadFadeHandler = null;
let loadFadeTimeoutId = null;
let loadFadeRan = false;

const cardHoverEnter = function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
};

const cardHoverLeave = function() {
    this.style.transform = 'translateY(0) scale(1)';
};

const startLoadFade = () => {
    if (!document.body) {
        return;
    }

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    loadFadeRan = true;

    if (loadFadeTimeoutId) {
        clearTimeout(loadFadeTimeoutId);
    }

    loadFadeTimeoutId = window.setTimeout(() => {
        document.body.style.opacity = '1';
        loadFadeTimeoutId = null;
    }, 100);
};

const scheduleLoadFade = () => {
    if (loadFadeRan || document.readyState === 'complete') {
        return;
    }

    if (!loadFadeHandler) {
        loadFadeHandler = () => {
            startLoadFade();
            window.removeEventListener('load', loadFadeHandler);
            loadFadeHandler = null;
        };
        window.addEventListener('load', loadFadeHandler);
    }
};

const enableMotionFeatures = () => {
    if (motionFeaturesEnabled) {
        return;
    }

    motionFeaturesEnabled = true;

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        observedMotionElements = Array.from(document.querySelectorAll('.feature, .collection-card, .contact-item'));
        observedMotionElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }

    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', cardHoverEnter);
        card.addEventListener('mouseleave', cardHoverLeave);
    });

    heroParallaxHandler = () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    };

    window.addEventListener('scroll', heroParallaxHandler);

    scheduleLoadFade();

    transitionStyleElement = document.createElement('style');
    transitionStyleElement.textContent = `
        * {
            transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .collection-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn {
            transition: all 0.3s ease;
        }

        .nav-link {
            transition: color 0.3s ease;
        }

        .social-links a {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
    `;
    document.head.appendChild(transitionStyleElement);
};

const disableMotionFeatures = () => {
    if (!motionFeaturesEnabled) {
        return;
    }

    motionFeaturesEnabled = false;

    if (animationObserver) {
        animationObserver.disconnect();
        animationObserver = null;
    }

    observedMotionElements.forEach(el => {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.style.removeProperty('transition');
    });
    observedMotionElements = [];

    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.removeEventListener('mouseenter', cardHoverEnter);
        card.removeEventListener('mouseleave', cardHoverLeave);
        card.style.removeProperty('transform');
    });

    if (heroParallaxHandler) {
        window.removeEventListener('scroll', heroParallaxHandler);
        heroParallaxHandler = null;
    }

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.removeProperty('transform');
    }

    if (loadFadeHandler) {
        window.removeEventListener('load', loadFadeHandler);
        loadFadeHandler = null;
    }

    if (loadFadeTimeoutId) {
        clearTimeout(loadFadeTimeoutId);
        loadFadeTimeoutId = null;
    }

    if (document.body) {
        document.body.style.removeProperty('opacity');
        document.body.style.removeProperty('transition');
    }

    if (transitionStyleElement && transitionStyleElement.parentNode) {
        transitionStyleElement.parentNode.removeChild(transitionStyleElement);
    }

    transitionStyleElement = null;
};

const onDomReady = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
        callback();
    }
};

if (!motionMediaQuery || motionMediaQuery.matches) {
    onDomReady(enableMotionFeatures);
}

if (motionMediaQuery) {
    const handleMotionPreferenceChange = (event) => {
        if (event.matches) {
            onDomReady(enableMotionFeatures);
        } else {
            disableMotionFeatures();
        }
    };

    if (typeof motionMediaQuery.addEventListener === 'function') {
        motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);
    } else if (typeof motionMediaQuery.addListener === 'function') {
        motionMediaQuery.addListener(handleMotionPreferenceChange);
    }
}

// Gallery configuration
const GALLERY_CONFIG = {
    photoCount: 16, // Update this number to match your total photos
    photoPrefix: 'photo',
    photoExtension: '.jpg',
    galleryPath: 'images/gallery/'
};

// Load gallery photos dynamically
function loadGalleryPhotos() {
    const galleryScroll = document.getElementById('gallery-scroll');
    
    // Clear existing content
    galleryScroll.innerHTML = '';
    
    // Generate gallery items for each photo
    for (let i = 1; i <= GALLERY_CONFIG.photoCount; i++) {
        const photoName = `${GALLERY_CONFIG.photoPrefix}${i}${GALLERY_CONFIG.photoExtension}`;
        const photoPath = `${GALLERY_CONFIG.galleryPath}${photoName}`;
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photoPath}" alt="K&B Boutique Item ${i}" class="gallery-img" 
                 onerror="this.style.display='none'; this.parentElement.style.display='none';">
        `;
        
        galleryScroll.appendChild(galleryItem);
    }
}

// Gallery scrolling function
function scrollGallery(direction) {
    const galleryScroll = document.querySelector('.gallery-scroll');
    const scrollAmount = 320; // Width of one gallery item + gap
    
    if (direction === 1) {
        galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryPhotos();
});