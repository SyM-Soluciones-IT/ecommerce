import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import peces from "../../images/peces.jpg";
import nubes from "../../images/nubes.jpg";
import aro from "../../images/aro.jpg";
import portaChupetes from "../../images/porta-chupetes.jpg";

function Intro() {
  const images = [peces, nubes, aro, portaChupetes];

  return (
    <div className="flex justify-center items-center py-10 bg-secondary">
      <div style={{ width: '80%', maxWidth: '1200px', margin: 'auto' }}>
        {/* Carrusel de imágenes */}
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          className="mx-auto" // Centrado del carrusel
        >
          {images.map((img, index) => (
            <div key={index} style={{ height: '400px' }}> {/* Establecer la altura */}
              <img
                src={img}
                alt={`Carousel Image ${index + 1}`}
                className="w-full h-full object-cover" // Ajustar la imagen al contenedor
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Intro;
