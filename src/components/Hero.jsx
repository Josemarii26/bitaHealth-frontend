import React from "react";
import "../styles/Hero.css";
import video from "../assets/videoSalud3.mp4"; // Coloca una imagen de ejemplo en /src/assets


function Hero() {
  return (
    <div className="hero">
      <video className="hero-video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="hero-overlay">
        <h1>BitaHealth, salud y bienestar a tu alcance con BiTalino</h1>
      </div>
    </div>
  );
}

export default Hero;
