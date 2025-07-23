document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initParticleBackground();
    initShowcaseGallery();
    initMobileMenu();
    initInteractiveElements();
    initSmoothScrolling();
    cleanPageUrls();
});

function cleanPageUrls() {
    if (window.history.replaceState) {
        const path = window.location.pathname;
        if (path.endsWith('.html')) {
            const cleanUrl = path.replace(/\.html$/, '');
            window.history.replaceState(null, null, cleanUrl);
        }
    }
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const botMessages = [
        "Nexus Command", 
        "Your ultimate Discord companion", 
        "Multi-language support", 
        "Moderation • Music • Fun",
        "100+ powerful features"
    ];

    let currentMessageIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let isTypingPaused = false;

    const type = () => {
        if (isTypingPaused) {
            setTimeout(type, typingSpeed);
            return;
        }

        const currentMessage = botMessages[currentMessageIndex];
        
        if (isDeleting) {
            typingText.textContent = currentMessage.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentMessageIndex = (currentMessageIndex + 1) % botMessages.length;
                typingSpeed = 500;
            } else {
                typingSpeed = 30;
            }
        } else {
            typingText.textContent = currentMessage.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentMessage.length) {
                isTypingPaused = true;
                typingSpeed = 2000;
                setTimeout(() => {
                    isTypingPaused = false;
                    isDeleting = true;
                    typingSpeed = 30;
                    type();
                }, typingSpeed);
                return;
            } else {
                typingSpeed = 100 - Math.random() * 50;
            }
        }

        setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);
}

function initParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.3 + 0.1;
        
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
        
        particleContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: ${Math.random() * 0.5 + 0.1};
            }
            90% {
                opacity: ${Math.random() * 0.5 + 0.1};
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initShowcaseGallery() {
    const showcaseTrack = document.getElementById('showcase-track');
    const showcaseModal = document.getElementById('showcase-modal');
    
    if (!showcaseTrack || !showcaseModal) return;

    const showcaseImages = [
        { url: "https://i.ibb.co/gMsBpNKf/Profile.png", title: "Profile" },
        { url: "https://i.ibb.co/Hpgzwk55/pytool.png", title: "PY_tool" },
        { url: "https://i.ibb.co/JwYhH52x/emoji.png", title: "RS_grabemoji" },
        { url: "https://i.ibb.co/LX9Rs43j/image.png", title: "JS_voidban" },
        { url: "https://i.ibb.co/FLvjvbwr/mimic.png", title: "RB_mimic" },
        { url: "https://i.ibb.co/6cqkpWC9/Screenshot-2025-07-19-195116.png", title: "Voice Master" }
    ];

    showcaseImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'showcase-item';
        item.setAttribute('data-title', image.title);
        
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.title;
        img.loading = 'lazy';
        
        item.appendChild(img);
        showcaseTrack.appendChild(item);
        
        item.addEventListener('click', () => {
            const modalImage = showcaseModal.querySelector('#modal-image');
            const imageTitle = showcaseModal.querySelector('#image-title');
            
            modalImage.src = image.url;
            modalImage.alt = image.title;
            imageTitle.textContent = image.title;
            
            showcaseModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = showcaseModal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        showcaseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    showcaseModal.addEventListener('click', (e) => {
        if (e.target === showcaseModal) {
            showcaseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const duplicateShowcase = showcaseTrack.cloneNode(true);
    showcaseTrack.appendChild(duplicateShowcase);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

function initInteractiveElements() {
    document.querySelectorAll('.neon-button, .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    document.querySelectorAll('.hover-glow').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-2px)';
            el.style.boxShadow = '0 5px 15px rgba(157, 78, 221, 0.4)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.boxShadow = '';
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
