import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService, vacancyService } from './services/api';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import VacancyList from './components/VacancyList';
import HowItWorks from './components/HowItWorks';
import Profile from './components/Profile';
import CategoryPage from './components/CategoryPage';
import Auth from './components/Auth';
import Footer from './components/Footer';
import { vacanciesData } from './data/vacancies';

const App = () => {
    const [allVacancies, setAllVacancies] = useState([]);
    const [filteredVacancies, setFilteredVacancies] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            // 1. Check Auth
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (token && storedUser) {
                try {
                    const res = await authService.getProfile();
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }

            // 2. Fetch Vacancies from DB
            try {
                const res = await vacancyService.getAll();
                // If DB is empty, fallback to local data for demo purposes, 
                // but in a real lab we should show DB data.
                const data = res.data.length > 0 ? res.data : vacanciesData;
                setAllVacancies(data);
                setFilteredVacancies(data);
            } catch (err) {
                console.error('Failed to fetch vacancies', err);
                setAllVacancies(vacanciesData);
                setFilteredVacancies(vacanciesData);
            }
            
            setLoading(false);
        };
        init();
    }, []);

    const handleSearch = (position, location) => {
        const queryPosition = position.trim().toLowerCase();
        const queryLocation = location.trim().toLowerCase();

        if (!queryPosition && !queryLocation) {
            setFilteredVacancies(allVacancies);
            return;
        }

        const filtered = allVacancies.filter(v => {
            const titleMatch = v.title.toLowerCase().includes(queryPosition) || 
                               (v.description && v.description.toLowerCase().includes(queryPosition));
            const locationMatch = v.location.toLowerCase().includes(queryLocation) ||
                                  (v.type && v.type.toLowerCase().includes(queryLocation));
            
            if (queryPosition && queryLocation) return titleMatch && locationMatch;
            return titleMatch || locationMatch;
        });

        setFilteredVacancies(filtered);
    };

    if (loading) return <div className="loading">Завантаження...</div>;

    return (
        <Router>
            <Header user={user} />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero onSearch={handleSearch} />
                            <Categories />
                            <VacancyList vacancies={filteredVacancies} />
                            <HowItWorks />
                        </>
                    } />
                    <Route 
                        path="/profile" 
                        element={user ? <Profile user={user} /> : <Navigate to="/auth" />} 
                    />
                    <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/profile" />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
