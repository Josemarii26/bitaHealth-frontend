import React from "react";
import "../styles/InfoSection.css";
import video from "../assets/videoSalud2.mp4"; // Coloca una imagen de ejemplo en /src/assets

function InfoSection2() {
  return (
    <div className="info-section">
      
      <div className="info-text">
        <h2>Cambia tus hábitos ahora</h2>
        <p>
          Con BitaHealth podrás descubrir cuales son tus niveles de estrés con una simple medición cardíaca con el kit BiTalino. Solo será necesaria una pequeña medición de un minuto para que sepas acerca de tí y de tu salud cardíaca.
        </p>
      </div>

      <div className="info-image2">
      <video className="hero-video2" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
}

export default InfoSection2;
