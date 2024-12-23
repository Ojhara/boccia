// Smooth scrolling for navigation links
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

// Sticky navigation
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > navHeight) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
    lastScrollY = window.scrollY;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .athlete-card, .trainer-card, .gallery-item, .event-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Category Filter functionality
const categoryButtons = document.querySelectorAll('.category-btn');
const athleteCards = document.querySelectorAll('.athlete-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.textContent;
        
        athleteCards.forEach(card => {
            if (category === 'All') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Gallery image modal
const galleryItems = document.querySelectorAll('.gallery-item');
const body = document.body;

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = item.querySelector('img').src;
        
        modal.appendChild(modalImg);
        body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Add CSS class for modal
const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        cursor: pointer;
    }
    
    .modal img {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Initialize animations on page load
window.addEventListener('load', animateOnScroll);
