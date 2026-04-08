import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { icon: "🎨", name: "Frontend" },
    { icon: "⚙️", name: "Backend" },
    { icon: "🛠", name: "DevOps" },
    { icon: "🐞", name: "QA / Testing" },
    { icon: "📱", name: "Mobile (iOS/Android)" },
    { icon: "📊", name: "Data Science" }
];

const Categories = () => {
    return (
        <section id="categories" className="container">
            <h2>Популярні напрямки</h2>
            <div className="categories-grid">
                {categories.map((cat, index) => (
                    <Link key={index} to={`/category/${cat.name}`} className="category-card" style={{ display: 'block' }}>
                        {cat.icon} {cat.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
