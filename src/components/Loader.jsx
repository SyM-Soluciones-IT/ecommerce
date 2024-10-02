import React from 'react'
import abejita from '../images/abejita-logo.png';

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-secondary z-[10000]'>
      <div className='flex gap-5 text-6xl font-semibold sm:text-3xl'>
        <img className='m' src={abejita} alt="Logo abejita" />
      </div>
    </div>
  )
}

export default Loader