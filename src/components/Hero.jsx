import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(position, location);
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Твоя кар'єра в IT починається тут</h1>
                <p>Тисячі вакансій від найкращих технологічних компаній.</p>
                
                <form className="search-form" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Посада (напр. React Developer)" 
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Місто або Remote" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button type="submit">Шукати</button>
                </form>
            </div>
        </section>
    );
};

export default Hero;
