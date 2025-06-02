import React, { useRef, useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import "../Components/summarization.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// PDF.js worker'ı ayarla
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const Summarization = () => {
    const fileInputRef = useRef(null);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);

    const splitTextIntoChunks = (text, maxLength = 1000) => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const chunks = [];
        let currentChunk = '';

        for (const sentence of sentences) {
            if ((currentChunk + sentence).length > maxLength) {
                if (currentChunk) chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                currentChunk += (currentChunk ? ' ' : '') + sentence;
            }
        }
        if (currentChunk) chunks.push(currentChunk.trim());
        return chunks;
    };

    const extractTextFromPDF = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }

            return fullText;
        } catch (error) {
            console.error('PDF okuma hatası:', error);
            throw new Error('PDF dosyası okunamadı');
        }
    };

    const summarizeText = async (text) => {
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
                {
                    inputs: text,
                    parameters: {
                        max_length: 130,
                        min_length: 30,
                        do_sample: false
                    }
                },
                {
                    headers: {
                        'Authorization': 'Bearer APİ_KEY',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data[0] && response.data[0].summary_text) {
                return response.data[0].summary_text;
            }
            throw new Error('Özet oluşturulamadı');
        } catch (error) {
            console.error('Özetleme hatası:', error);
            throw error;
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setSummary('');
        setError('');
        setPdfUrl(null);
        setFileSelected(true);

        try {
            let text;
            
            if (file.type === 'application/pdf') {
                text = await extractTextFromPDF(file);
                const pdfUrl = URL.createObjectURL(file);
                setPdfUrl(pdfUrl);
            } else {
                text = await file.text();
            }
            
            if (!text || text.trim().length === 0) {
                throw new Error('Dosya içeriği okunamadı');
            }

            const chunks = splitTextIntoChunks(text);
            console.log('Metin parçaları:', chunks.length);

            const summaries = [];
            for (const chunk of chunks) {
                try {
                    const chunkSummary = await summarizeText(chunk);
                    summaries.push(chunkSummary);
                } catch (err) {
                    console.error('Parça özetleme hatası:', err);
                }
            }

            const finalSummary = summaries.join('\n\n');
            setSummary(finalSummary);

        } catch (err) {
            console.error('Hata detayı:', err);
            setError(`Hata oluştu: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    if (!fileSelected) {
        return (
            <div className="initial-container">
                <h3>Metin Özetleyici</h3>
                <div className="upload-container">
                    <div className="upload-area" onClick={handleUploadClick}>
                        Dosya yükleme<i className="bi bi-file-earmark-text"></i>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".txt,.pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="left-panel">
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileChange}
                />
                {pdfUrl && (
                    <iframe
                        className="pdf-viewer"
                        src={pdfUrl}
                        title="PDF Viewer"
                    />
                )}
            </div>
            <div className="right-panel">
                {loading && <p className="loading">Özet oluşturuluyor...</p>}
                {error && <p className="error">{error}</p>}
                {summary && (
                    <div>
                        <h3>Özet</h3>
                        <p className="summary-content">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
