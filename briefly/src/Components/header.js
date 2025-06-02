import React, { useState, useEffect } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/icon.webp';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className='header-container'>
            <div className='header-logo' onClick={() => navigate('/')}>
                <img src={logo} alt='logo' />
            </div>
            <h1 className='header-title'>Briefly</h1>
            <div className='header-menu'>
                <button className='header-menu-button' onClick={() => navigate('/changer')}>
                    <i className="bi bi-file-earmark-pdf"></i>DOCX'ten PDF'e Dönüştür
                </button>
                <button className='header-menu-button' onClick={() => navigate('/summarization')}>
                    YZ özetleme <i className="bi bi-filetype-ai"></i>
                </button>
            </div>
            <div className='header-login'>
                {user ? (
                    <div className='user-info'>
                        <span className='user-name'><i className="bi bi-person-circle"></i> {user.name}</span>
                        <button className='header-login-button' onClick={handleLogout}>Çıkış Yap</button>
                    </div>
                ) : (
                    <button className='header-login-button' onClick={() => navigate('/login')}>Oturum aç</button>
                )}
            </div>
        </div>
    );
};


