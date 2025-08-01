// Section visibility animation
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

// Fix spécifique pour mobile - s'assurer que toutes les sections sont visibles après chargement
window.addEventListener('load', function() {
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
