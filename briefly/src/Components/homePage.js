import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import WebsiteImage from '../images/undraw_building-a-website_1wrp.svg';

export const HomePage = () => {
    return (
        <div className='homepage-container'>
            <div className='homepage-content'style={{ marginTop: '50px' }}>
                <div className='homepage-content-left'>
                    <h1>Briefly ile özetlemek artık çok daha kolay!</h1>
                    <p>Daha üretken olmak ve belgelerle daha akıllı çalışmak için ihtiyacınız olan tüm araçlar.</p>
                    <button className='homepage-content-left-button'>Get Started</button>
                </div>
                <div className='homepage-content-right'>
                    <img src={WebsiteImage} alt="Website Illustration" />
                </div>
            </div>
            <div className='homepage-content-popüler-yazılar' style={{ marginTop: '50px' }}>
                <h1>Popüler Yazılar</h1>
                <div className='homepage-content-popüler-yazılar-liste'>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-pdf"></i> PDF Word Çevirme</h3>
                        <p>PDF'leri düzenlenebilir Word belgelerine dönüştür</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-pdf"></i> PDF Birleştirme</h3>
                        <p>Birden fazla PDF'i bir tek belge olarak birleştir</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-jpg"></i> JPG PDF Çevirme</h3>
                        <p>JPG, PNG, BMP, GIF ve TIFF görüntülerini PDF'e dönüştür</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-pdf"></i> PDF İmzala</h3>
                        <p>Bir elektronik imza oluşturarak belgelerinizi imzalayın</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-pdf"></i> PDF Düzenleme</h3>
                        <p>PDF'ine metin, şekiller, görüntüler ve elle ek açıklamalar ekle</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                    <div className='popüler-yazı-kutusu'>
                        <h3> <i class="bi bi-filetype-pdf"></i> PDF Küçültme</h3>
                        <p>PDF'nin boyutunu kalite kaybı olmadan düşür</p>
                        <a href="#">Daha Fazla</a>
                    </div>
                </div>
            </div>
            <div className='homepage-content' style={{ marginTop: '50px' }}>
                <div className='homepage-content-left'>
                <img src={WebsiteImage} alt="Website Illustration" />
                    
                </div>
                <div className='homepage-content-right'>
                <h1>Briefly ile özetlemek artık çok daha kolay!</h1>
                    <p>Daha üretken olmak ve belgelerle daha akıllı çalışmak için ihtiyacınız olan tüm araçlar.</p>
                    <button className='homepage-content-left-button'>Get Started</button>
                </div>
            </div>
        </div>
    );
};


