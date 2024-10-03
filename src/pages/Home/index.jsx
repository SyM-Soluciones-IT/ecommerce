import React, { useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Products from "./Products";
import Experiences from "./Experiences";
import About from "./About";
import Contact from "./Contact";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  const productsRef = useRef(null);
  const aboutRef = useRef(null); // Ref para la sección "Sobre Nosotros"
  const contactRef = useRef(null); // Ref para la sección "Contacto"

  return (
    <div>
      <Header 
        productsRef={productsRef} 
        aboutRef={aboutRef} // Pasar el ref "Sobre Nosotros" al Header
        contactRef={contactRef} // Pasar el ref "Contacto" al Header
      />
      {portfolioData && (
        <div className="bg-secondary px-40 sm:px-5">
          <Intro />
          <div ref={productsRef}>
            <Products />
          </div>
          <div ref={aboutRef}>
          <About />
          </div>
            <Experiences /> 
          
          <div ref={contactRef}>
            <Contact />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
