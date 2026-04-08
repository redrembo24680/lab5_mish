import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { vacanciesData } from '../data/vacancies';
import VacancyCard from './VacancyCard';

const CategoryPage = () => {
    const { name } = useParams();
    
    // Filter vacancies by category name (case-insensitive)
    const filteredVacancies = vacanciesData.filter(v => 
        v.title.toLowerCase().includes(name.toLowerCase()) || 
        v.description.toLowerCase().includes(name.toLowerCase())
    );

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <Link to="/" style={{ color: 'var(--secondary)', display: 'inline-block', marginBottom: '20px' }}>
                ← Назад до всіх вакансій
            </Link>
            <h2>Напрямок: {name}</h2>
            
            {filteredVacancies.length > 0 ? (
                <div className="vacancies-grid">
                    {filteredVacancies.map(v => (
                        <VacancyCard key={v.id} vacancy={v} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777', marginTop: '50px' }}>
                    На жаль, у категорії "{name}" поки що немає відкритих вакансій.
                </p>
            )}
        </div>
    );
};

export default CategoryPage;
