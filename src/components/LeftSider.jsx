import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { welcomeText, images } = intro; // Cambiamos 'image' a 'images'

  return (
    <div className="h-4/5 bg-secondary flex flex-col items-center gap-8 py-10">
      <h1 className="text-white">{welcomeText || ''}</h1>
      <div className="flex flex-col items-center gap-8">
        {/* Carrusel de imágenes */}
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
          {images && images.length > 0 ? (
            images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Carousel Image ${index + 1}`} className="w-full h-auto" />
              </div>
            ))
          ) : (
            <div>No images available</div>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Intro;
