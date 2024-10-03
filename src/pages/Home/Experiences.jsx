import React from "react";

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
  const comments = [
    {
      name: "Juan Pérez",
      rating: 5,
      comment: "¡Excelente servicio! Los envíos son rápidos y seguros.",
    },
    {
      name: "María García",
      rating: 5,
      comment: "Estoy muy satisfecha con la atención y la rapidez de los envíos. ¡Recomiendo totalmente!",
    },
    {
      name: "Luis Fernández",
      rating: 5,
      comment: "Un servicio de 10. Los productos llegaron en perfectas condiciones y a tiempo.",
    },
    {
      name: "Ana López",
      rating: 5,
      comment: "Me encantó la experiencia de compra. Sin duda, volveré a comprar aquí.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Sección de envíos */}
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Envios a todo el país</h1>

      <div className="mt-6 w-full flex items-center justify-center mb-6">
        <img 
          src="https://via.placeholder.com/800x400.png?text=Imagen+de+Env%C3%ADos" 
          alt="Banner de envíos" 
          className="w-2/3 sm:w-full object-cover rounded-lg"
        />
      </div>


      {/* Sección de comentarios */}
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3 mt-6">Experiencias de Nuestros Clientes</h1>
      <div className="mt-10 w-full grid grid-cols-3 sm:flex sm:flex-col items-center justify-center">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mb-4"
          >
            <h3 className="text-lg font-semibold">{comment.name}</h3>
            <StarRating rating={comment.rating} />
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experiences;
