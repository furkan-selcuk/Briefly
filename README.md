# Briefly

Briefly, metin özetleme ve dosya dönüştürme işlemlerini kolaylaştıran bir web uygulamasıdır.

## Özellikler

### 1. Metin Özetleme
- PDF ve TXT dosyalarını yükleme desteği
- Uzun metinleri otomatik olarak parçalara ayırma
- Hugging Face API kullanarak akıllı metin özetleme
- PDF dosyalarını tarayıcıda görüntüleme

### 2. DOCX'ten PDF'e Dönüştürme
- DOCX dosyalarını PDF formatına dönüştürme
- Yüksek kaliteli çıktı
- Kolay indirme seçeneği

## Teknolojiler

- React.js
- Axios
- PDF.js
- Hugging Face API
- jsPDF
- Mammoth.js
- HTML2Canvas
- Bootstrap Icons

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/furkan-selcuk/Briefly.git
```

2. Proje dizinine gidin:
```bash
cd Briefly
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Uygulamayı başlatın:
```bash
npm start
```

## Kullanım

### Metin Özetleme
1. "Metin Özetleyici" bölümüne gidin
2. PDF veya TXT dosyanızı yükleyin
3. Sistem otomatik olarak metni özetleyecektir

### DOCX'ten PDF'e Dönüştürme
1. "DOCX'ten PDF'e Dönüştürücü" bölümüne gidin
2. DOCX dosyanızı yükleyin
3. "Dönüştür" butonuna tıklayın
4. Dönüştürülen PDF'i indirin

## Notlar

- Metin özetleme özelliği için Hugging Face API anahtarı gereklidir
- DOCX'ten PDF'e dönüştürme işlemi sadece DOCX dosyalarını destekler
- Büyük dosyaların işlenmesi biraz zaman alabilir
