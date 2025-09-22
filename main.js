document.addEventListener('DOMContentLoaded', () => {

    // --- ヘッダーのスクロール制御 ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- トップページのお知らせ表示 ---
    const newsContainer = document.getElementById('news-list-container');
    if (newsContainer && typeof newsData !== 'undefined') {
        const latestNews = newsData.slice(0, 3);
        latestNews.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${item.link}">
                    <time datetime="${item.date}">${item.date.replaceAll('-', '.')}</time>
                    <span class="title">${item.title}</span>
                </a>
            `;
            newsContainer.appendChild(li);
        });
    }

    // --- お知らせ一覧ページの表示 ---
    const archiveContainer = document.getElementById('news-archive-container');
    if (archiveContainer && typeof newsData !== 'undefined') {
        newsData.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${item.link}">
                    <time datetime="${item.date}">${item.date.replaceAll('-', '.')}</time>
                    <p class="title">${item.title}</p>
                </a>
            `;
            archiveContainer.appendChild(li);
        });
    }
    
    // --- スクロールアニメーション ---
    const animatedItems = document.querySelectorAll('.animated-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedItems.forEach(item => observer.observe(item));

    // --- ハンバーガーメニュー制御 ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
            });
        });
    }

    // --- デスクトップ ドロップダウン制御 ---
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();
            dropdown.classList.toggle('is-active');
        });
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('is-active');
            }
        });
    }

    // --- 画像スライダー制御 ---
    const slider = document.getElementById('hero-slider');
    if (slider) {
        const slides = Array.from(slider.querySelectorAll('.slide'));
        const nextButton = document.getElementById('slider-next');
        const prevButton = document.getElementById('slider-prev');
        const dotsNav = document.getElementById('slider-dots');
        let currentIndex = 0;
        let autoplayInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);

        const goToSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };

        nextButton.addEventListener('click', () => goToSlide((currentIndex + 1) % slides.length));
        prevButton.addEventListener('click', () => goToSlide((currentIndex - 1 + slides.length) % slides.length));
        dotsNav.addEventListener('click', e => {
            if (e.target.matches('.dot')) goToSlide(dots.indexOf(e.target));
        });
        
        const startAutoplay = () => { autoplayInterval = setInterval(() => nextButton.click(), 5000); };
        const stopAutoplay = () => clearInterval(autoplayInterval);
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        
        goToSlide(0);
        startAutoplay();
    }
});