import React from "react";

function Experiences() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-tertiary text-white p-6 rounded-lg w-full flex items-center justify-center">
        <h1 className="text-3xl font-bold">Envios a todo el país</h1>
      </div>
      
      <div className="mt-6 w-full flex items-center justify-center">
        <img 
          src="https://via.placeholder.com/800x400.png?text=Imagen+de+Env%C3%ADos" 
          alt="Banner de envíos" 
          className="w-2/3 sm:w-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default Experiences;
