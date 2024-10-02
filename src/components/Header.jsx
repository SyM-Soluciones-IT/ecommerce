import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import abejitaLogo from '../images/abejita-logo.png';

function Header({ productsRef, aboutRef, contactRef }) { // Aceptar los refs como props
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  // Función para desplazarse a la sección de productos
  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Función para desplazarse a la sección "Sobre Nosotros"
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Función para desplazarse a la sección de contacto
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className='p-5 bg-secondary flex justify-between items-center sticky top-0 w-full z-[100]'>
      <div className='flex items-center'>
        <img src={abejitaLogo} alt="Logo de Abejita" width={100} />
      </div>

      <nav className='flex space-x-4'>
        <Link to="/" className='text-tertiary text-xl hover:text-quaternary'>Inicio</Link>
        <button onClick={scrollToProducts} className='text-tertiary text-xl hover:text-quaternary'>Productos</button>
        <button onClick={scrollToAbout} className='text-tertiary text-xl hover:text-quaternary'>Sobre Nosotros</button> {/* Añadir botón "Sobre Nosotros" */}
        <button onClick={scrollToContact} className='text-tertiary text-xl hover:text-quaternary'>Contacto</button> {/* Añadir botón "Contacto" */}
      </nav>

      <div className='flex items-center'>
        <img src={abejitaLogo} alt="Logo de Abejita" width={100} />
      </div>
    </div>
  );
}

export default Header;
