// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    nav.classList.toggle('nav_active');
    
    // Обновляем aria-атрибут для доступности
    const isExpanded = burger.classList.contains('burger_active');
    burger.setAttribute('aria-expanded', isExpanded);
});

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('burger_active');
        nav.classList.remove('nav_active');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnBurger = burger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains('nav_active')) {
        burger.classList.remove('burger_active');
        nav.classList.remove('nav_active');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.15
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Инициализация анимаций после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-up, .slide-left, .slide-right, .scale-in, .section-title'
    );
    animatedElements.forEach(el => scrollObserver.observe(el));
});
