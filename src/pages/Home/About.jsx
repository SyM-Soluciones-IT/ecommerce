import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Llamada al endpoint que devuelve los productos
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 sm:flex sm:flex-col gap-6 p-5">
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Nuestros Productos</h1>
      {products.map((product) => (
        <div key={product.id} className="border border-quaternary rounded-lg p-4 text-center flex flex-col items-center">
          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="w-80 h-80 object-cover mb-4" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-bold my-2">${product.price}</p>
          <button className="bg-tertiary text-white py-2 px-4 rounded hover:bg-quaternary hover:text-600">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
