import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-grid container">
                <div className="footer-col">
                    <h4>IT JobFinder</h4>
                    <p>Найбільша платформа для пошуку роботи в сфері інформаційних технологій.</p>
                </div>
                <div className="footer-col">
                    <h4>Кандидатам</h4>
                    <ul>
                        <li><a href="#">Пошук вакансій</a></li>
                        <li><a href="#">Компанії</a></li>
                        <li><a href="#">Зарплатний віджет</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Роботодавцям</h4>
                    <ul>
                        <li><a href="#">Додати вакансію</a></li>
                        <li><a href="#">Пошук кандидатів</a></li>
                        <li><a href="#">Прайс-лист</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Контакти</h4>
                    <p>📍 Львів, пл. Ринок, 1</p>
                    <p>📧 support@it-jobfinder.ua</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 IT JobFinder. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;
