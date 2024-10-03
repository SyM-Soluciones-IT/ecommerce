import React, { useEffect, useState } from "react";
import axios from "axios";

function AboutUs() {
  const [aboutData, setAboutData] = useState(null); // Estado para almacenar la información de About

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/about/get-about");
        setAboutData(response.data.data); // Asegúrate de acceder a la propiedad correcta
      } catch (error) {
        console.error("Error al obtener la información de About", error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Cargando...</div>; // Puedes mostrar un loader o un mensaje mientras se cargan los datos
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Título de la sección */}
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Sobre Nosotros</h1>

      {/* Descripción de la empresa */}
      <div className="p-6 rounded-lg w-full flex items-center justify-center mt-6">
        <p className="text-lg text-center">
          {aboutData.description1}
          <br />
          <br />
          {aboutData.description2}
          <br />
          <br />
          {aboutData.description3}
        </p>
      </div>

      {/* Imagen representativa */}
      <div className="mt-6 w-full flex items-center justify-center">
        <img 
          src={`data:image/jpeg;base64,${aboutData.image}`} 
          alt="Artículos para bebés"
          className="w-1/4 sm:w-1/8 object-cover rounded-lg" // Ajustado aquí
        />
    </div>

    </div>
  );
}

export default AboutUs;
