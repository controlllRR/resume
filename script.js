document.querySelector('.nav-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    
    this.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Создаем оверлей если его нет
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
        
        // Добавляем обработчик клика по оверлею
        newOverlay.addEventListener('click', () => {
            nav.classList.remove('active');
            this.classList.remove('active');
            newOverlay.classList.remove('active');
        });
    }
    
    // Переключаем класс active у оверлея
    document.querySelector('.overlay').classList.toggle('active');
});

// Закрываем меню при клике по пункту меню
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav').classList.remove('active');
        document.querySelector('.nav-toggle').classList.remove('active');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    });
});

// Плавная прокрутка к разделам
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .skill-category, .project-card').forEach(element => {
    element.classList.add('scroll-animation');
    observer.observe(element);
});

// Изменение header при скролле
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Добавление активного класса для текущего раздела в меню
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Добавляем индикатор прокрутки
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-highlight';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.height = scrolled + '%';
});

// Добавляем анимацию для skill-category при появлении
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
});

// Добавляем эффект параллакса для hero секции
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('#hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hero.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
});

// Добавляем плавное появление для всех секций
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
});

const showSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(showSection, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
}); 