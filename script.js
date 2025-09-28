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

// Cached DOM references for scroll-based effects
const navbar = document.querySelector('.navbar');
const heroImage = document.querySelector('.hero-image');
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

const NAVBAR_SCROLL_THRESHOLD = 50;
const ACTIVE_SECTION_OFFSET = 100;
const NAVBAR_DEFAULT_BACKGROUND = 'rgba(255, 255, 255, 0.95)';
const NAVBAR_SCROLLED_BACKGROUND = 'rgba(255, 255, 255, 0.98)';
const NAVBAR_DEFAULT_SHADOW = '0 2px 20px rgba(0, 0, 0, 0.1)';
const NAVBAR_SCROLLED_SHADOW = '0 2px 20px rgba(0, 0, 0, 0.15)';

let sectionMetrics = [];
let scrollRafId = null;

function computeSectionMetrics() {
    sectionMetrics = sections.map(section => {
        const top = Math.max(section.offsetTop - ACTIVE_SECTION_OFFSET, 0);
        const height = section.offsetHeight;
        return {
            id: section.id,
            top,
            bottom: top + height
        };
    });
}

function updateNavbarState(scrollY) {
    if (!navbar) {
        return;
    }

    if (scrollY > NAVBAR_SCROLL_THRESHOLD) {
        navbar.style.background = NAVBAR_SCROLLED_BACKGROUND;
        navbar.style.boxShadow = NAVBAR_SCROLLED_SHADOW;
    } else {
        navbar.style.background = NAVBAR_DEFAULT_BACKGROUND;
        navbar.style.boxShadow = NAVBAR_DEFAULT_SHADOW;
    }
}

function updateActiveNavLink(scrollY) {
    if (!navLinks.length || !sectionMetrics.length) {
        return;
    }

    let currentId = '';
    for (let i = 0; i < sectionMetrics.length; i++) {
        const { top, bottom, id } = sectionMetrics[i];
        if (scrollY >= top && scrollY < bottom) {
            currentId = id;
            break;
        }
    }

    navLinks.forEach(link => {
        const isActive = currentId && link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', Boolean(isActive));
    });
}

function updateHeroParallax(scrollY) {
    if (!heroImage) {
        return;
    }

    const rate = scrollY * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
}

function runScrollEffects() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    updateNavbarState(scrollY);
    updateActiveNavLink(scrollY);
    updateHeroParallax(scrollY);

    scrollRafId = null;
}

function requestScrollEffects() {
    if (scrollRafId !== null) {
        return;
    }

    scrollRafId = requestAnimationFrame(runScrollEffects);
}

computeSectionMetrics();
runScrollEffects();

if (typeof ResizeObserver !== 'undefined') {
    const sectionResizeObserver = new ResizeObserver(() => {
        computeSectionMetrics();
        requestScrollEffects();
    });

    sections.forEach(section => sectionResizeObserver.observe(section));
}

window.addEventListener('scroll', requestScrollEffects, { passive: true });
window.addEventListener('resize', () => {
    computeSectionMetrics();
    requestScrollEffects();
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature, .collection-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Collection card hover effects
document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    computeSectionMetrics();
    runScrollEffects();
});

// Add smooth transitions to all interactive elements
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

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