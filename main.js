// ========================================
// VARIABLES GLOBALES
// ========================================
const navbar = document.querySelector('.navbar');
const repoCards = document.querySelectorAll('.repo-card');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-links a');

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMACIÓN DE CARDS AL HACER SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Inicializar animación de cards
repoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ========================================
// EFECTO PARALLAX EN HERO
// ========================================
function handleParallax() {
    const heroSection = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

window.addEventListener('scroll', handleParallax);

// ========================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('body').value;
        
        // Crear enlace mailto
        const mailtoLink = `mailto:usajhoel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Abrir cliente de correo
        window.location.href = mailtoLink;
        
        // Limpiar formulario
        contactForm.reset();
        
        // Mostrar mensaje de confirmación
        showNotification('Abriendo tu cliente de correo...', 'success');
    });
}

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00B8D9' : '#0052CC'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// CONTADOR DE RECURSOS
// ========================================
function updateResourceCount() {
    const totalCards = document.querySelectorAll('.repo-card').length;
    const countElement = document.querySelector('.resource-count');
    
    if (countElement) {
        animateCounter(countElement, 0, totalCards, 1500);
    }
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ========================================
// EFECTO HOVER AVANZADO EN CARDS
// ========================================
repoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `
            translateY(-8px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========================================
// BÚSQUEDA Y FILTRADO DE CICLOS
// ========================================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            repoCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const shouldShow = cardText.includes(searchTerm);
                
                card.style.display = shouldShow ? 'block' : 'none';
                
                if (shouldShow) {
                    card.style.animation = 'fadeIn 0.3s ease';
                }
            });
        });
    }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0052CC, #4C9AFF);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 82, 204, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll al hacer clic
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateY(0)';
    });
}

// ========================================
// ANIMACIONES CSS DINÁMICAS
// ========================================
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
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
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// LAZY LOADING DE IMÁGENES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ESTADÍSTICAS Y ANALYTICS
// ========================================
function trackCardClick(cardElement) {
    const cycleNumber = cardElement.dataset.cycle;
    console.log(`Card clicked: Cycle ${cycleNumber}`);
    
    // Aquí puedes agregar Google Analytics o tracking personalizado
    // gtag('event', 'card_click', { 'cycle': cycleNumber });
}

repoCards.forEach(card => {
    card.addEventListener('click', function() {
        trackCardClick(this);
    });
});

// ========================================
// FUNCIÓN PARA ABRIR TODOS LOS ENLACES
// ========================================
function abrirTodosLosEnlaces() {
    const enlaces = [
        'https://drive.google.com/drive/u/1/folders/1GIGf9ocMcnsEaeTgN2d4b3ionCXLdnEK',
        'https://drive.google.com/drive/u/1/folders/1FHBK4-8qu844FqYJVijSQALNPux5kTxZ',
        'https://drive.google.com/drive/u/1/folders/14zNNWMjS1vwdtc6V5z8cp2XTQLexTl-',
        'https://drive.google.com/drive/u/1/folders/1H9OtLFXDxFCHAjsZ5c91G0zzMkEYJt3',
        'https://drive.google.com/drive/u/1/folders/1a3VizGlr1hbFBa8eJCndSqqRhn5Llrsf',
        'https://drive.google.com/drive/u/1/folders/14GslWkiWwF4o5Fb0cXm5s8q1PEXL5tXx',
        'https://drive.google.com/drive/u/1/folders/1VQiRd5pdBPZ7X1mG-q5RmkR8D5GSMD',
        'https://drive.google.com/drive/u/1/folders/1dzDkZeYBIZQ0jWXg60m-PdBEoOJfzqy',
        'https://drive.google.com/drive/u/1/folders/1ky5qnpvJrgyC543GiabI5XJsKT3eCI9',
        'https://drive.google.com/drive/u/1/folders/1UMQWG-Ypozu4d7VPBrO6EhaLX3XD3qc',
        'https://drive.google.com/drive/u/1/folders/1n1-NmSU0eyVRs1M1DGKOIbs0F7h2hUN',
        'https://drive.google.com/drive/u/1/folders/1u48xIiNYghyN50lvQd2RzxhYI4g0u1Aw',
        'https://drive.google.com/drive/u/1/folders/1dR1Dhu28p4vR-rZvtMU9qznYVTfKUg4f',
        'https://drive.google.com/drive/u/1/folders/1LkU-8Da5DvFqvelfKZHs5BOfkuxCBa1e',
        'https://drive.google.com/drive/u/1/folders/1lvumHSXOGBU37suZVCPXm8-ycWWmjsqI'
    ];
    
    enlaces.forEach((url, index) => {
        setTimeout(() => {
            window.open(url, '_blank');
        }, index * 300); // Delay para evitar bloqueo de pop-ups
    });
    
    showNotification(`Abriendo ${enlaces.length} carpetas de Drive...`, 'success');
}

// Hacer la función global
window.abrirTodosLosEnlaces = abrirTodosLosEnlaces;

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================
document.addEventListener('DOMContentLoaded', ()
