// Loading screen - CORRIGÉ pour garantir le fonctionnement
document.addEventListener('DOMContentLoaded', function() {
    // Cache le loader après le chargement
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            // Force la suppression complète après la transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 500); // Attend 500ms pour voir le loader, puis le cache
});

// Progress bar
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateProgressBar);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80; // Header height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Section visibility animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

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

// Active TOC link
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Mobile TOC
const tocToggle = document.getElementById('tocToggle');
const tocModal = document.getElementById('tocModal');

if (tocToggle && tocModal) {
    tocToggle.addEventListener('click', function() {
        tocModal.style.display = 'block';
    });
}

// Close TOC Modal function
function closeTocModal() {
    const tocModal = document.getElementById('tocModal');
    if (tocModal) {
        tocModal.style.display = 'none';
    }
}

// Make closeTocModal available globally
window.closeTocModal = closeTocModal;

// Click outside to close modal
if (tocModal) {
    tocModal.addEventListener('click', function(e) {
        if (e.target === tocModal) {
            closeTocModal();
        }
    });
}

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (header && window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else if (header) {
        header.style.boxShadow = 'none';
    }
});

// Show/hide floating TOC based on screen size
function checkFloatingToc() {
    const floatingToc = document.getElementById('floatingToc');
    if (floatingToc) {
        if (window.innerWidth > 1200 && window.scrollY > 500) {
            floatingToc.style.display = 'block';
        } else {
            floatingToc.style.display = 'none';
        }
    }
}

window.addEventListener('scroll', checkFloatingToc);
window.addEventListener('resize', checkFloatingToc);

// Download PDF function
function downloadPDF() {
    window.print();
}

// Make downloadPDF available globally
window.downloadPDF = downloadPDF;

// Print optimization
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible');
    });
});

// Interactive checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const allChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const total = document.querySelectorAll('input[type="checkbox"]').length;
        
        if (allChecked === total) {
            setTimeout(() => {
                alert('Félicitations ! Vous êtes prêt à vous lancer dans l\'investissement en habitat partagé ! 🎉');
            }, 300);
        }
    });
});

// Feature cards hover effect
document.querySelectorAll('.feature-card, .comparison-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Lazy loading for images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    updateProgressBar();
    updateActiveLink();
    checkFloatingToc();
    
    // Ensure loading screen is hidden even if DOMContentLoaded didn't fire
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen && !loadingScreen.classList.contains('hide')) {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});