// Enhanced Typing Effect
const typingText = document.getElementById('typing-text');
const messages = ["Nexus Command", "The ultimate Discord bot", "Multi-language support", "Powerful features"];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let isPaused = false;

function type() {
    if (isPaused) {
        setTimeout(type, typingSpeed);
        return;
    }

    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        // Delete the entire line at once for cleaner effect
        typingText.textContent = '';
        charIndex = 0;
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typingSpeed = 500; // Pause before typing next message
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentMessage.length) {
            isPaused = true;
            typingSpeed = 2000; // Pause at end of message
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typingSpeed = 50;
                type();
            }, typingSpeed);
            return;
        } else {
            typingSpeed = 100 - Math.random() * 50; // Variable speed for natural feel
        }
    }

    setTimeout(type, typingSpeed);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
    
    // Add animated background elements
    createFloatingParticles();
});

// Create floating particles effect
function createFloatingParticles() {
    const container = document.querySelector('.glass-container');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            background: rgba(157, 78, 221, ${opacity});
            border-radius: 50%;
            position: absolute;
            animation: floatParticle ${duration}s linear ${delay}s infinite;
            z-index: -1;
        `;
        
        container.appendChild(particle);
    }
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
@keyframes floatParticle {
    0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 200}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Enhanced Docs category switching
const docsCategories = document.querySelectorAll('.docs-category');
const docsSections = document.querySelectorAll('.docs-content-section');

if (docsCategories.length && docsSections.length) {
    docsCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories and sections
            docsCategories.forEach(c => c.classList.remove('active'));
            docsSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Show corresponding section with fade effect
            const categoryName = category.getAttribute('data-category');
            const targetSection = document.getElementById(categoryName);
            targetSection.style.opacity = 0;
            targetSection.classList.add('active');
            
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.1;
                targetSection.style.opacity = opacity;
                if (opacity >= 1) clearInterval(fadeIn);
            }, 30);
        });
    });
}

// Enhanced Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        const tabContainer = button.closest('.code-tabs');
        
        // Remove active class from all buttons and content
        tabContainer.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        tabContainer.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetTab = document.getElementById(tabId);
        targetTab.classList.add('active');
        
        // Add animation effect
        targetTab.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            targetTab.style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 30);
    });
});

// Enhanced Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Add hover glow effect to all interactive elements
document.querySelectorAll('a, button, .command-item, .docs-category').forEach(el => {
    el.classList.add('hover-glow');
});

// Add ripple effect to buttons
document.querySelectorAll('.neon-button, .support-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyle);