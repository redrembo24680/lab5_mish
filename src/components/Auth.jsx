import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let response;
            if (isLogin) {
                response = await authService.login({ email, password });
            } else {
                response = await authService.register({ email, password, name });
            }
            
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Reload page or use state management to update App's user state
            // For now, let's navigate, the App component should handle the check
            window.location.href = '/profile'; 
        } catch (err) {
            setError(err.response?.data?.message || 'Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container auth-section">
            <div className="auth-card">
                <h2>{isLogin ? 'Вхід у систему' : 'Реєстрація'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Ім'я</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Ваше ім'я" 
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Введіть email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Введіть пароль" 
                            required 
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Завантаження...' : (isLogin ? 'Увійти' : 'Зареєструватися')}
                    </button>
                </form>
                <p className="auth-toggle">
                    {isLogin ? 'Немає акаунту?' : 'Вже є акаунт?'}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'var(--primary-color)' }}>
                        {isLogin ? ' Зареєструватися' : ' Увійти'}
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Auth;
