import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import abejitaLogo  from '../images/abejita-logo.png';

function Header() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  return (
    <div className='p-5 bg-secondary flex justify-between items-center sticky top-0 w-full z-[100]'>
      <div className='flex items-center'>
        <img src={abejitaLogo} alt="Logo de Abejita" width={100}/>
      </div>
      
      <nav className='flex space-x-4'>
        <Link to="/" className='text-tertiary text-xl hover:text-quaternary'>Inicio</Link>
        <Link to="/productos" className='text-tertiary text-xl hover:text-quaternary'>Productos</Link>
        <Link to="/sobre-nosotros" className='text-tertiary text-xl hover:text-quaternary'>Sobre Nosotros</Link>
        <Link to="/contacto" className='text-tertiary text-xl hover:text-quaternary'>Contacto</Link>
      </nav>

      <div className='flex items-center'>
        <img src={abejitaLogo} alt="Logo de Abejita" width={100}/>
      </div>
    </div>
  );
}

export default Header;
