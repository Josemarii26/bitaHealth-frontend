// src/FileUploadComponent.js
import React, { useState } from "react";

import "../styles/FileUploadComponent.css";

// Importar componentes para gráficos de ChartJS
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Registrar elementos necesarios en ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function FileUploadComponent() {
  const [txtFile, setTxtFile] = useState(null);
  const [h5File, setH5File] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTxtChange = (e) => {
    if (e.target.files.length > 0) {
      setTxtFile(e.target.files[0]);
    }
  };


  // En este ejemplo se envía solo el archivo TXT.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!txtFile) {
      alert("Por favor, sube el archivo TXT.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("txtFile", txtFile);
    // Si deseas enviar también el archivo H5, descomenta la siguiente línea:
    // formData.append("h5File", h5File);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Error al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Reinicia los estados para otra medición
    setTxtFile(null);
    setH5File(null);
    setResult(null);
    setLoading(false);
  };

  // Función para descargar el informe PDF
  const handleDownloadPDF = async () => {
    const input = document.getElementById("report");
    if (!input) {
      alert("No se encontró el contenido a exportar.");
      return;
    }
    
    // Captura el contenido completo del elemento, usando windowWidth y windowHeight
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calcula la altura de la imagen en el PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Si la imagen es mayor que una página, se divide en varias páginas
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    
    pdf.save("informe_bitalino.pdf");
  };

  // Preparar datos para los gráficos resumen (si hay resultados)
  let pieData = null;
  let barData = null;
  if (result && result.model_result && result.model_result.summary) {
    const summary = result.model_result.summary;
    const labels = Object.keys(summary);
    const counts = labels.map((label) => summary[label].count);
    pieData = {
      labels: labels,
      datasets: [
        {
          label: "Predicciones",
          data: counts,
          backgroundColor: ["#2daa3e", "#217c2d", "#13461a", "#6ecf7b"],
          borderWidth: 1,
        },
      ],
    };
    barData = {
      labels: labels,
      datasets: [
        {
          label: "Conteo",
          data: counts,
          backgroundColor: ["#2daa3e", "#217c2d", "#13461a", "#6ecf7b"],
          borderColor: ["#2b6cb0", "#c53030", "#2f855a", "#b7791f"],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div className="file-upload-container">
      <div className="upload-card">
        <h4 className="upload-title">Análisis de BitaHealth</h4>
        <p className="upload-description">
          Sube tu archivo TXT de BiTalino para que la IA realice el análisis.
        </p>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="file"
            accept=".txt"
            onChange={handleTxtChange}
            className="upload-input"
          />
          <button type="submit" disabled={loading} className="upload-button">
            {loading ? "Procesando..." : "Enviar archivos"}
          </button>
          <button onClick={handleReset} className="upload-button">
            Volver a hacer otra medición
          </button>
        </form>
      </div>

      {result && (
        <div id="report" className="result-card">
          <h5 className="result-title">Resultados de la IA</h5>

          

          {/* Botón para descargar el informe PDF */}
          <div className="download-container">
            <button onClick={handleDownloadPDF} className="download-button">
              Descargar Informe PDF
            </button>
          </div>

          {/* Resultado textual }
          {result.model_result && (
            <div className="result-text">
              <pre>{JSON.stringify(result.model_result, null, 2)}</pre>
            </div>
          )}

          {/* Sección de gráficos resumen de predicciones */}
          {result.model_result && result.model_result.summary && (
            <div className="chart-container">
              <h5>Resumen de Predicciones </h5>
              {pieData && <Pie data={pieData} />}
              <br></br>
              {barData && (
                <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
              )}
            </div>
          )}

          
          
          {/* Sección de gráficos generados en el backend */}
          {result.graphs && (
            <div className="result-images">
              <h5>Señal ECG limpia</h5>
              <img
                src={`data:image/png;base64,${result.graphs.ecg_plot}`}
                alt="ECG limpio"
              />

              <h5>Segmento ECG ampliado</h5>
              <img
                src={`data:image/png;base64,${result.graphs.ecg_zoom_plot}`}
                alt="Segmento ECG con pico destacado"
              />

              <h5>Serie de intervalos RR</h5>
              <img
                src={`data:image/png;base64,${result.graphs.rr_plot}`}
                alt="Serie de intervalos RR"
              />

              {result.graphs.poincare_plot && (
                <>
                  <h5>Poincaré Plot</h5>
                  <img
                    src={`data:image/png;base64,${result.graphs.poincare_plot}`}
                    alt="Poincaré Plot"
                  />
                </>
              )}

              <h5>Histograma de intervalos RR</h5>
              <img
                src={`data:image/png;base64,${result.graphs.rr_histogram}`}
                alt="Histograma de RR"
              />

              {result.graphs.rr_fft && (
                <>
                  <h5>Espectro de potencia (FFT) de RR</h5>
                  <img
                    src={`data:image/png;base64,${result.graphs.rr_fft}`}
                    alt="Espectro de potencia de RR"
                  />
                </>
              )}
            </div>
          )}

          
        </div>
      )}
    </div>
  );
}

export default FileUploadComponent;
