import React from 'react'

function Footer() {
  const isSpanish = localStorage.getItem("language") === "ES";
  return (
    <div className='py-10'>
      <div className='h-[1px] w-full bg-gray-700'></div>

      <div className='flex items-center justify-center flex-col mt-10 gap-2 opacity-80'>
        <h1 className="text-white">
          {isSpanish ? "Diseñado y Desarrollado Por" : "Designed and Developed By"}
        </h1>
        <h1 className='text-white'>
          <span className='text-white'>Peña Matias</span>
        </h1>
      </div>
    </div>
  )
}

export default Footer