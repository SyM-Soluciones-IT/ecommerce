import React from "react";
import nosotros from "../../images/nosotros.jpg";

function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Título de la sección con el mismo estilo que "Experiences" */}
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Sobre Nosotros</h1>

      {/* Descripción de la empresa */}
      <div className="  p-6 rounded-lg w-full flex items-center justify-center mt-6">
        <p className="text-lg text-center">
          Bienvenidos a nuestra tienda, donde nos especializamos en ofrecer
          artículos de la más alta calidad para bebés. Nuestra misión es
          brindar a los padres los mejores productos para el cuidado y el
          bienestar de sus pequeños.
          <br />
          <br />
          Creemos que cada bebé merece lo mejor, por eso seleccionamos con
          cuidado cada artículo que ofrecemos. Desde ropa suave y cómoda hasta
          juguetes seguros y educativos, aquí encontrarás todo lo que necesitas
          para hacer la vida de tu bebé más feliz.
          <br />
          <br />
          Nuestro equipo está formado por padres apasionados que entienden las
          necesidades de las familias modernas. Estamos comprometidos a
          proporcionar un servicio excepcional y a ayudarte a encontrar los
          productos perfectos para tu pequeño.
        </p>
      </div>

      {/* Imagen representativa */}
      <div className="mt-6 w-full flex items-center justify-center">
        <img
          src={nosotros}
          alt="Artículos para bebés"
          className="w-2/3 sm:w-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default AboutUs;
