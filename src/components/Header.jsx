import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ user }) => {
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <header>
            <div className="logo">💻 IT JobFinder</div>
            <nav>
                <ul>
                    <li><Link to="/">Вакансії</Link></li>
                    <li><Link to="/categories">Категорії</Link></li>
                    {user && <li><Link to="/profile">Мій профіль</Link></li>}
                </ul>
            </nav>
            {user ? (
                <div className="user-nav">
                    <span className="user-email">{user.email}</span>
                    <button onClick={handleLogout} className="login-btn logout-btn">Вийти</button>
                </div>
            ) : (
                <Link to="/auth" className="login-btn">Увійти</Link>
            )}
        </header>
    );
};

export default Header;
