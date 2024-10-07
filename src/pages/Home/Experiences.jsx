import React, { useEffect, useState } from "react";
import axios from "axios";

// Componente para mostrar estrellas
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={index < rating ? "gold" : "gray"}
          className="mr-1"
        >
          <path d="M12 .587l3.668 7.429 8.21 1.192-5.943 5.827 1.406 8.191L12 18.896l-7.342 3.856 1.406-8.191-5.943-5.827 8.21-1.192z" />
        </svg>
      ))}
    </div>
  );
};

function Experiences() {
  const [comments, setComments] = useState([]); // Inicializa comments como un arreglo vacío
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true); // Inicia la carga
      try {
        const response = await axios.get('http://localhost:5000/api/experiences/get-experiences');
        // Asegúrate de que la respuesta tenga el formato correcto
        if (Array.isArray(response.data)) {
          setComments(response.data); // Establece comentarios directamente desde response.data
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setComments(response.data.data); // Establece comentarios desde response.data.data
        } else {
          throw new Error("La estructura de datos no es un arreglo");
        }
      } catch (error) {
        setError('Error al cargar las experiencias');
        console.error(error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };
    fetchExperiences();
  }, []);
  
  if (loading) return <p>Cargando experiencias...</p>; // Mensaje de carga
  if (error) return <p>{error}</p>; // Mensaje de error

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Envios a todo el país</h1>

      <div className="mt-6 w-full flex items-center justify-center mb-6">
        <img 
          src="https://via.placeholder.com/800x400.png?text=Imagen+de+Env%C3%ADos" 
          alt="Banner de envíos" 
          className="w-2/3 sm:w-full object-cover rounded-lg"
        />
      </div>

      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3 mt-6">Experiencias de Nuestros Clientes</h1>
      <div className="mt-10 w-full grid grid-cols-3 sm:flex sm:flex-col items-center justify-center">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id} // Asegúrate de que `comment.id` sea único
              className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mb-4"
            >
              <h3 className="text-lg font-semibold">{comment.name}</h3>
              <StarRating rating={comment.rating} />
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No hay experiencias disponibles.</p> // Mensaje si no hay comentarios
        )}
      </div>
    </div>
  );
}

export default Experiences;
