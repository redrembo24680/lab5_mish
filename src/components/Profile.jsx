import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';

const Profile = ({ user }) => {
    const [profileData, setProfileData] = useState({
        name: user.name || 'User',
        role: 'Junior Web Developer',
        location: '📍 м. Львів',
        status: 'Шукаю роботу',
        skills: 'HTML5, CSS3, JavaScript, React, Git'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authService.getProfile();
                setProfileData(prev => ({ ...prev, ...res.data }));
            } catch (err) {
                console.error("Помилка при завантаженні профілю:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            // In a real lab, you'd have a PUT/PATCH endpoint for this
            // Since the lab only asked for Register/Login/Profile, 
            // I'll show how to use the backend for this if you implement that route.
            alert('Дані профілю оновлено локально. Для повного збереження потрібно реалізувати UPDATE роут на сервері.');
            setIsEditing(false);
        } catch (err) {
            alert('Помилка при збереженні: ' + err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <section className="container"><h2>Завантаження профілю...</h2></section>;
    if (error) return (
        <section className="container">
            <h2 className="error-msg">Помилка: {error}</h2>
            <button onClick={handleLogout} className="edit-btn">Вийти та спробувати знову</button>
        </section>
    );

    return (
        <section id="profile" className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Мій профіль</h2>
                <button onClick={handleLogout} className="edit-btn" style={{ borderColor: '#ff4d4d', color: '#ff4d4d' }}>Вийти</button>
            </div>
            
            <div className="profile-card">
                <div className="avatar-placeholder">{profileData.name[0].toUpperCase()}</div>
                <div className="details">
                    {isEditing ? (
                        <div className="edit-form">
                            <input name="name" value={profileData.name} onChange={handleChange} placeholder="Ім'я" />
                            <input name="role" value={profileData.role} onChange={handleChange} placeholder="Посада" />
                            <input name="location" value={profileData.location} onChange={handleChange} placeholder="Локація" />
                            <input name="status" value={profileData.status} onChange={handleChange} placeholder="Статус" />
                            <textarea name="skills" value={profileData.skills} onChange={handleChange} placeholder="Навички (через кому)" />
                            <div className="profile-actions">
                                <button className="resume-btn" onClick={handleSave}>Зберегти</button>
                                <button className="edit-btn" onClick={() => setIsEditing(false)}>Скасувати</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="profile-header">
                                <h3>{profileData.name}</h3>
                                <span className="badge status">{profileData.status}</span>
                            </div>
                            <p className="location">📍 {profileData.location.replace('📍 ', '')}</p>
                            <p className="role"><strong>Бажана посада:</strong> {profileData.role}</p>
                            
                            <div className="progress-container">
                                <p>Заповненість профілю: 100%</p>
                                <div className="progress-bar"><div className="progress" style={{ width: '100%' }}></div></div>
                            </div>

                            <div className="skills">
                                {profileData.skills.split(',').map(skill => (
                                    <span key={skill} className="skill-tag">{skill.trim()}</span>
                                ))}
                            </div>
                            
                            <div className="profile-actions">
                                <button className="resume-btn" onClick={() => alert('Почалося завантаження вашого CV...')}>
                                    Завантажити CV
                                </button>
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    Редагувати профіль
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;
