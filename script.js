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

// Loading state handling
const removeLoadingState = () => {
    document.body.classList.remove('is-loading');
};

const handleInitialLoad = () => {
    requestAnimationFrame(() => {
        requestAnimationFrame(removeLoadingState);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleInitialLoad);
} else {
    handleInitialLoad();
}

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        removeLoadingState();
    }
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
    contactForm.addEventListener('submit', function (e) {
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

// Newsletter subscription (Footer)
const newsletterForm = document.querySelector('.footer .newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
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

    notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
    notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    const hideNotification = () => {
        if (!notification.classList.contains('notification-hide')) {
            notification.classList.add('notification-hide');
            notification.setAttribute('aria-hidden', 'true');
            notification.addEventListener('animationend', () => {
                notification.remove();
            }, { once: true });
        }
    };

    setTimeout(() => {
        if (notification.parentNode) {
            hideNotification();
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification();
    });
}

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
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
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

    .back-to-top {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter Popup
const newsletterPopup = document.getElementById('newsletter-popup');
const popupClose = document.querySelector('.popup-close');
const newsletterFormPopup = document.querySelector('.newsletter-popup .newsletter-form');

// Show popup after 5 seconds if not already shown
if (newsletterPopup && !localStorage.getItem('newsletterShown')) {
    setTimeout(() => {
        newsletterPopup.classList.add('active');
    }, 5000);
}

// Close popup
if (popupClose) {
    popupClose.addEventListener('click', () => {
        newsletterPopup.classList.remove('active');
        localStorage.setItem('newsletterShown', 'true');
    });
}

// Close on outside click
if (newsletterPopup) {
    newsletterPopup.addEventListener('click', (e) => {
        if (e.target === newsletterPopup) {
            newsletterPopup.classList.remove('active');
            localStorage.setItem('newsletterShown', 'true');
        }
    });
}

// Handle form submission for popup
if (newsletterFormPopup) {
    newsletterFormPopup.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterFormPopup.querySelector('input[type="email"]').value;
        if (isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            newsletterPopup.classList.remove('active');
            localStorage.setItem('newsletterShown', 'true');
            newsletterFormPopup.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
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

    if (!galleryScroll) {
        return;
    }

    // Clear existing content
    galleryScroll.innerHTML = '';

    // Generate gallery items for each photo
    for (let i = 1; i <= GALLERY_CONFIG.photoCount; i++) {
        const photoName = `${GALLERY_CONFIG.photoPrefix}${i}${GALLERY_CONFIG.photoExtension}`;
        const photoPath = `${GALLERY_CONFIG.galleryPath}${photoName}`;

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photoPath}" alt="K&B Boutique Item ${i}" class="gallery-img" loading="lazy"
                 onerror="this.style.display='none'; this.parentElement.style.display='none';">
        `;

        galleryScroll.appendChild(galleryItem);
    }
}

// Gallery scrolling function
function scrollGallery(direction) {
    const galleryScroll = document.getElementById('gallery-scroll');

    if (!galleryScroll) {
        return;
    }

    const scrollAmount = 320; // Width of one gallery item + gap

    if (direction === 1) {
        galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', function () {
    const galleryScroll = document.getElementById('gallery-scroll');

    if (!galleryScroll) {
        return;
    }

    loadGalleryPhotos();
});