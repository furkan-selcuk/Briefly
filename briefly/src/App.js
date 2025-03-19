import React, { useState } from 'react';
import translate from 'translate';
import './App.css';

function App() {
  const [englishText, setEnglishText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // Dosya yükleme fonksiyonu
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      setEnglishText(text);
      
      try {
        // Çeviri işlemi
        translate.engine = 'google'; // veya 'libre', 'deepl' gibi farklı motorlar
        const result = await translate(text, { from: 'en', to: 'tr' });
        setTranslatedText(result);
      } catch (error) {
        console.error('Çeviri hatası:', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="App">
      <h1>Metin Çeviri Uygulaması</h1>
      
      <input 
        type="file" 
        accept=".txt"
        onChange={handleFileUpload} 
      />

      <div style={{ display: 'flex', margin: '20px' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <h3>İngilizce Metin:</h3>
          <p>{englishText}</p>
        </div>

        <div style={{ flex: 1, padding: '10px' }}>
          <h3>Türkçe Çeviri:</h3>
          <p>{translatedText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
