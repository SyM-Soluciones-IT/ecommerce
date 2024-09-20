import React, { useEffect, useState } from 'react';
import spainFlag from '../images/spain.jpg';
import ukFlag from '../images/uk.jpg';

function Header() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  return (
    <div className='p-5 bg-primary flex justify-between items-center sticky top-0 w-full z-[100]'>
      <h1 className='text-secondary text-4xl font-semibold mr-4'>P</h1>
      <div className='flex items-center'>
        <img 
          src={spainFlag} 
          alt='Spanish Flag' 
          className={`cursor-pointer w-8 h-8 mx-2 ${language === 'ES' ? 'opacity-100' : 'opacity-50'}`} 
          onClick={() => changeLanguage('ES')} 
        />
        <img 
          src={ukFlag} 
          alt='UK Flag' 
          className={`cursor-pointer w-8 h-8 mx-2 ${language === 'EN' ? 'opacity-100' : 'opacity-50'}`} 
          onClick={() => changeLanguage('EN')} 
        />
      </div>
      <h1 className='text-tertiary text-4xl font-semibold'>M</h1>
    </div>
  );
}

export default Header;
