// Loading animation
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.classList.add('hide');
    
    // Fix spécifique pour mobile - s'assurer que toutes les sections sont visibles après chargement
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            document.querySelectorAll('section').forEach(section => {
                // Forcer la visibilité si la section n'est pas encore visible
                if (!section.classList.contains('visible')) {
                    const rect = section.getBoundingClientRect();
                    // Si la section est dans le viewport ou au-dessus
                    if (rect.top < window.innerHeight) {
                        section.classList.add('visible');
                    }
                }
            });
        }, 1000);
    }
});

// Progress bar
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Section visibility animation avec fix mobile
const observerOptions = {
    threshold: 0.05, // Réduit pour mobile
    rootMargin: '0px 0px -10px 0px' // Moins de marge négative
};

// Vérification si IntersectionObserver est supporté
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
} else {
    // Fallback pour les anciens navigateurs
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible');
    });
}

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active TOC link highlighting
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile TOC Modal
const tocToggle = document.getElementById('tocToggle');
const tocModal = document.getElementById('tocModal');

if (tocToggle) {
    tocToggle.addEventListener('click', function() {
        tocModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

function closeTocModal() {
    const tocModal = document.getElementById('tocModal');
    tocModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Download PDF function
function downloadPDF() {
    // Simulation de téléchargement
    alert('La fonction de téléchargement PDF sera bientôt disponible !');
    // Dans une vraie application, vous appelleriez ici une API pour générer le PDF
}

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Animate numbers on scroll
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Add the suffix back
            const suffix = element.getAttribute('data-suffix') || '';
            element.innerHTML = end + suffix;
        }
    };
    window.requestAnimationFrame(step);
};

// Observe stat numbers for animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const text = entry.target.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const number = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                entry.target.setAttribute('data-suffix', suffix);
                animateValue(entry.target, 0, number, 1500);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => statObserver.observe(number));

// Force sections visibility on mobile after DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Additional check for mobile
    if (window.innerWidth <= 768) {
        // Make first few sections immediately visible
        const sectionsToShow = ['#introduction', '#partie1', '#partie2', '#partie3', '#partie4'];
        sectionsToShow.forEach(sectionId => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.classList.add('visible');
            }
        });
    }
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-check visibility on resize
        if (window.innerWidth <= 768) {
            document.querySelectorAll('section').forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && !section.classList.contains('visible')) {
                    section.classList.add('visible');
                }
            });
        }
    }, 250);
});
