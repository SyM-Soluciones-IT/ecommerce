import React from "react";
import aro from "../../images/aro.jpg";
import nubes from "../../images/nubes.jpg";
import peces from "../../images/peces.jpg";

function Products() {
  const products = [
    {
      id: 1,
      image: aro,
      title: "Aro de Colores",
      description: "Un aro con cintas de colores para la estimulación visual y motora.",
      price: "$10.00",
    },
    {
      id: 2,
      image: nubes,
      title: "Nubes Tejidas",
      description: "Dos nubes tejidas a mano, ideales para decorar la habitación.",
      price: "$15.00",
    },
    {
      id: 3,
      image: peces,
      title: "Peces de Colores",
      description: "Un juego de pesca con peces de tela, ideal para mejorar la coordinación.",
      price: "$12.00",
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 p-5">
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Nuestros Productos</h1>
      {products.map((product) => (
        <div key={product.id} className="border border-quaternary rounded-lg p-4 text-center flex flex-col items-center">
          <img src={product.image} alt={product.title} className="w-80 h-48 object-cover mb-4" />
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-bold my-2">{product.price}</p>
          <button className="bg-tertiary text-white py-2 px-4 rounded hover:bg-quaternary hover:text-600">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
