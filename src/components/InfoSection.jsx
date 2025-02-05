import React from "react";
import "../styles/InfoSection.css";
import video from "../assets/videoSalud.mp4"; // Coloca una imagen de ejemplo en /src/assets

function InfoSection() {
  return (
    <div className="info-section">
      <div className="info-image">
        <video className="hero-video2" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="info-text">
        <h2>Mide tu estrés con BitaHealth</h2>
        <p>
          Descubre cómo nuestra tecnología te permite monitorear y
          analizar tu salud de manera precisa. Con nuestro sistema, obtendrás
          información sobre tu estrés y variabilidad cardíaca, facilitándote el
          camino hacia una mejor calidad de vida.
        </p>
      </div>
    </div>
  );
}

export default InfoSection;
