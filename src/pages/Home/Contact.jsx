import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Importar íconos
import { InstagramEmbed } from "react-social-media-embed";

function Contact() {
  return (
    <div className="p-5">
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">
        Nuestro Instagram
      </h1>

      <div className="flex sm:flex-col justify-around gap-10">

              {/* Tarjeta Instagram */}
              <div className="flex justify-center">
                <InstagramEmbed
                  url="https://www.instagram.com/p/DAl0dBtxAVP/"
                  width={550}
                />
              </div>

              {/* Tarjeta de Instagram*/}
              <div className="flex justify-center">
                <InstagramEmbed
                  url="https://www.instagram.com/p/DAldIRAJmJS/"
                  width={550}
                />
              </div>
            
      </div>

      {/* Mapa de Bahía Blanca */}
      <div className="flex justify-center mt-10">
        <h1 className="text-3xl text-quaternary text-center font-bold mb-4 col-span-3">Ubicación</h1>
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
