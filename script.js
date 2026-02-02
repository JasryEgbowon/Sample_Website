// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchBtn = document.getElementById('searchBtn');
const closeSearch = document.getElementById('closeSearch');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
const removeButtons = document.querySelectorAll('.remove-item');
const header = document.querySelector('.header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Search Functionality
searchBtn.addEventListener('click', () => {
    searchContainer.classList.add('active');
    searchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = '';
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        searchContainer.classList.remove('active');
    }
});

// Cart Sidebar
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Remove item from cart
removeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        cartItem.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            cartItem.remove();
            updateCartCount();
        }, 300);
    });
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelectorAll('.cart-item');
    cartCount.textContent = cartItems.length;
    
    if (cartItems.length === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'flex';
    }
}

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Hero Slider
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    // Ensure index is within bounds
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Previous slide
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot click
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Newsletter Form Submission
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        return;
    }
    
    // Simulate successful submission
    formMessage.textContent = 'Thank you for subscribing to VogueSphere!';
    formMessage.classList.remove('error');
    formMessage.classList.add('success');
    
    // Reset form
    emailInput.value = '';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('success');
    }, 5000);
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
        header.classList.add('scrolled');
    } else {
        backToTop.classList.remove('visible');
        header.classList.remove('scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Collection Card Animation on Scroll
const collectionCards = document.querySelectorAll('.collection-card');
const trendCards = document.querySelectorAll('.trend-card');

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

// Apply animation to collection cards
collectionCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Apply animation to trend cards
trendCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
    observer.observe(card);
});

// Initialize cart count
updateCartCount();

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(style);
