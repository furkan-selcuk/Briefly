import React, { useState, useRef } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Components/changer.css";
import { jsPDF } from "jspdf";
import mammoth from "mammoth";
import html2canvas from "html2canvas";

// Türkçe karakterleri Latin harflerle değiştiren fonksiyon
function fixTurkishChars(text) {
    const map = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'İ': 'I',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U'
    };
    return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, m => map[m]);
}

export const Changer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [converted, setConverted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                setSelectedFile(file);
                setFileName(file.name.split('.')[0]);
                setConverted(false);
                setDownloadLink(null);
            } else {
                alert("Lütfen sadece DOCX dosyası yükleyin!");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const convertToPdf = async () => {
        if (!selectedFile) return;
        
        setLoading(true);
        
        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            const htmlString = result.value;

            // Geçici bir div'e HTML'i ekle
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlString;
            document.body.appendChild(tempDiv);

            // html2canvas ile görselini al
            const canvas = await html2canvas(tempDiv, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "a4"
            });

            // Görseli PDF'e ekle
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);

            // Temizle
            document.body.removeChild(tempDiv);

            const pdfBlob = pdf.output("blob");
            const url = URL.createObjectURL(pdfBlob);

            setDownloadLink(url);
            setConverted(true);
        } catch (error) {
            console.error("Dönüştürme hatası:", error);
            alert("Dosya dönüştürme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };
    
    const resetForm = () => {
        setSelectedFile(null);
        setConverted(false);
        setDownloadLink(null);
        setFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className='changer-container'>
            <h1>DOCX'ten PDF'e Dönüştürücü</h1>

            <div className='changer-container-input-container'>
                {!converted ? (
                    <>
                        <div className='changer-container-input-container-input'>
                            <i className="bi bi-file-earmark-word"></i>
                            <input 
                                ref={fileInputRef}
                                style={{
                                    height: "50px", 
                                    width: "200px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    marginTop: "25px"
                                }} 
                                type="file" 
                                accept=".docx" 
                                onChange={handleFileChange}
                            />
                        </div>
                        <button 
                            className='changer-container-input-container-button'
                            onClick={convertToPdf}
                            disabled={!selectedFile || loading}
                        >
                            {loading ? 'Dönüştürülüyor...' : 'Dönüştür'}
                        </button>
                    </>
                ) : (
                    <div className='changer-container-download'>
                        <i className="bi bi-file-earmark-check" style={{ fontSize: "50px", color: "#4CAF50" }}></i>
                        <p>Dosyanız PDF'e dönüştürüldü!</p>
                        <a 
                            href={downloadLink}
                            download={`${fileName || 'donusturulmus'}.pdf`}
                            className='changer-container-download-button'
                        >
                            <i className="bi bi-download"></i> PDF İndir
                        </a>
                        <button 
                            className='changer-container-reset-button'
                            onClick={resetForm}
                        >
                            Yeni Dosya Dönüştür
                        </button>
                    </div>
                )}
            </div>
            
            <div className="conversion-notes">
                <p>Not: Bu dönüştürücü sadece DOCX dosyalarını destekler.</p>
            </div>
        </div>
    );
};
