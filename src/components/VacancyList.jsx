import React, { useState } from 'react';
import VacancyCard from './VacancyCard';

const VacancyList = ({ vacancies }) => {
    const [sortOrder, setSortOrder] = useState('newest');

    const sortedVacancies = [...vacancies].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return (
        <section id="vacancies" className="container">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Гарячі вакансії</h2>
                <div className="sorting-controls">
                    <label htmlFor="sort">Сортувати:</label>
                    <select 
                        id="sort" 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="newest">Спочатку нові</option>
                        <option value="oldest">Спочатку старі</option>
                    </select>
                </div>
            </div>
            
            {sortedVacancies.length > 0 ? (
                <div className="vacancies-grid">
                    {sortedVacancies.map(v => (
                        <VacancyCard key={v.id} vacancy={v} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}>
                    На жаль, за вашим запитом нічого не знайдено.
                </p>
            )}
        </section>
    );
};

export default VacancyList;
