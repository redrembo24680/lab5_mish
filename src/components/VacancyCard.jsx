import React from 'react';

const VacancyCard = ({ vacancy }) => {
    return (
        <article className="vacancy-card">
            <div className="badges">
                {vacancy.type === 'Remote' && <span className="badge remote">Remote</span>}
                {vacancy.type === 'Office' && <span className="badge office">{vacancy.location}</span>}
                {vacancy.type === 'Hybrid' && <span className="badge office">{vacancy.location}</span>}
                {vacancy.isHot && <span className="badge hot">Hot</span>}
            </div>
            <h3>{vacancy.title}</h3>
            <p className="company"><strong>🏢 {vacancy.company}</strong></p>
            <p className="reqs">{vacancy.description}</p>
            <div className="card-footer">
                <p className="salary">{vacancy.salary}</p>
                <button className="apply-btn" onClick={() => alert(`Ви успішно відгукнулися на вакансію: ${vacancy.title}`)}>
                    Відгукнутися
                </button>
            </div>
        </article>
    );
};

export default VacancyCard;
