import React from 'react';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="container bg-light">
            <h2>Як це працює?</h2>
            <div className="steps-flex">
                <div className="step">
                    <div className="step-icon">1</div>
                    <h3>Створи профіль</h3>
                    <p>Розкажи про свої навички та досвід роботи в IT.</p>
                </div>
                <div className="step">
                    <div className="step-icon">2</div>
                    <h3>Знайди вакансію</h3>
                    <p>Використовуй зручні фільтри для пошуку ідеальної позиції.</p>
                </div>
                <div className="step">
                    <div className="step-icon">3</div>
                    <h3>Отримай Офер</h3>
                    <p>Пройди співбесіду та розпочни роботу своєї мрії.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
