import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Özel giriş kontrolü
    if (email === 'frknslck.2001@gmail.com' && password === 'furkan') {
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify({
        email: email,
        name: 'Furkan'
      }));
      // Sayfayı yenile ve ana sayfaya yönlendir
      window.location.href = '/';
    } else {
      setError('E-posta veya şifre hatalı!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Hesabınıza Giriş Yapın</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">E-posta Adresi</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="E-posta Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Şifre</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="auth-links">
            <div className="checkbox-group">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="remember-me" className="form-label">
                Beni Hatırla
              </label>
            </div>

            <a href="#" className="auth-link">
              Şifrenizi mi unuttunuz?
            </a>
          </div>

          <button type="submit" className="auth-button">
            Giriş Yap
          </button>

          <div className="auth-links">
            <a href="/register" className="auth-link">
              Hesabınız yok mu? Kayıt olun
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};


