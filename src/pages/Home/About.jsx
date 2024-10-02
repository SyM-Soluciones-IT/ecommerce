import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Título de la sección con el mismo estilo que "Experiences" */}
      <div className="bg-tertiary text-white p-6 rounded-lg w-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">Sobre Nosotros</h1>
      </div>

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
          src="https://via.placeholder.com/800x400.png?text=Imagen+de+Art%C3%ADculos+para+Beb%C3%A9s"
          alt="Artículos para bebés"
          className="w-2/3 sm:w-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default AboutUs;
