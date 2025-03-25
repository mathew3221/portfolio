// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize EmailJS with your public key
emailjs.init("jr2SlfT40_EulAAK0");

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission Handling
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');
const submitBtnText = submitBtn.querySelector('span');
const submitBtnIcon = submitBtn.querySelector('i');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending...';
    submitBtnIcon.className = 'fas fa-spinner fa-spin';

    try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new FormData(contactForm)
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            throw new Error(data.message || 'Something went wrong!');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        submitBtnIcon.className = 'fas fa-paper-plane';
    }
});

// Show message function
function showMessage(message, type) {
    const messageContainer = document.querySelector('.form-message-container');
    messageContainer.innerHTML = ''; // Clear any existing messages
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Add the message to the container
    messageContainer.appendChild(messageDiv);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for Skill Bars
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when the page loads
window.addEventListener('load', typeWriter);

// Project Card Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 