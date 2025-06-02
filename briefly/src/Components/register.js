import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şifre kontrolü
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    // Burada kayıt işlemleri yapılacak
    console.log('Kayıt yapılıyor:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Yeni Hesap Oluştur</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Ad Soyad</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="Ad Soyad"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Şifre</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="form-input"
              placeholder="Şifre Tekrar"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-button">
            Kayıt Ol
          </button>

          <div className="auth-links">
            <a href="/login" className="auth-link">
              Zaten hesabınız var mı? Giriş yapın
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

