import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  // Verifica si el idioma es español (ES)
  const isSpanish = contact.language === "ES";

  return (
    <div className="p-5">
      <SectionTitle title={isSpanish ? "Contáctanos" : "Contact Us"} />

      <div className="flex sm:flex-col justify-center gap-10">
        <div className="flex flex-col w-1/3">
          <h2 className="text-tertiary text-lg font-bold mb-4">
            {isSpanish ? "Información de Contacto" : "Contact Information"}
          </h2>
          <p className="text-tertiary text-sm">{`${contact.name}`}</p>
          <p className="text-tertiary text-sm">{`${contact.email}`}</p>
          <p className="text-tertiary text-sm">{`${contact.mobile}`}</p>
        </div>

        <div className="w-1/3">
          <h2 className="text-tertiary text-lg font-bold mb-4">
            {isSpanish ? "Redes Sociales" : "Social Media"}
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.facebook.com/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary text-sm hover:text-quaternary"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary text-sm hover:text-quaternary"
            >
              Instagram
            </a>
            <a
              href="https://www.twitter.com/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary text-sm hover:text-quaternary"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Mapa de Bahía Blanca */}
      <div className="flex justify-center mt-10">
        <h2 className="text-tertiary text-lg font-bold mb-4">{isSpanish ? "Ubicación" : "Location"}</h2>
      </div>
      <div className="w-full h-[400px]">
        <iframe
          title="Mapa de Bahía Blanca"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.129115825506!2d-60.70941038467157!3d-38.7139692796355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b4b83fd493b225%3A0x8e27265e25815af6!2sBah%C3%ADa%20Blanca%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1695964854694!5m2!1ses-419!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
