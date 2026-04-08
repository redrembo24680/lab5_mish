document.addEventListener('DOMContentLoaded', () => {
    // Обробка форми пошуку
    const searchBtn = document.querySelector('.search-form button');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.search-form input');
            const position = (inputs[0]?.value || '').trim().toLowerCase();
            const location = (inputs[1]?.value || '').trim().toLowerCase();
            
            const vacancyCards = document.querySelectorAll('.vacancy-card');
            let foundCount = 0;

            if (!position && !location) {
                alert('Будь ласка, введіть хоча б один критерій пошуку.');
                // Показуємо всі вакансії якщо поля очищені
                vacancyCards.forEach(card => card.style.display = 'block');
                return;
            }

            vacancyCards.forEach(card => {
                const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
                const reqs = (card.querySelector('.reqs')?.textContent || '').toLowerCase();
                
                // Перевірка локації з бейджів або тексту картки
                const badgesText = Array.from(card.querySelectorAll('.badge'))
                                        .map(b => b.textContent.toLowerCase())
                                        .join(' ');
                
                const matchPosition = position === '' || title.includes(position) || reqs.includes(position);
                const matchLocation = location === '' || badgesText.includes(location);

                if (matchPosition && matchLocation) {
                    card.style.display = 'block'; // або можна використати 'flex', якщо це flex-контейнер
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Плавний перехід до результатів
            const vacanciesSection = document.getElementById('vacancies');
            if (vacanciesSection) {
                vacanciesSection.scrollIntoView({ behavior: 'smooth' });
            }

            if (foundCount === 0) {
                // Якщо нічого не знайдено, можна показати сповіщення (опціонально)
                alert('На жаль, за вашим запитом нічого не знайдено. Спробуйте змінити критерії пошуку.');
            }
        });
    }

    // Кнопки відгуку на вакансії
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.vacancy-card');
            const title = card.querySelector('h3').textContent;
            alert(`Ви успішно відгукнулися на вакансію: ${title}`);
        });
    });

    // Кнопки профілю
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            alert('Почалося завантаження вашого CV...');
        });
    }

    const editBtn = document.querySelector('.edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            alert('Редагування профілю тимчасово недоступне.');
        });
    }

    // Плавний скрол для навігації
    const navLinks = document.querySelectorAll('nav a, header .login-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
