import React, { useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import axios from "axios";

function Contact() {
  const [contact, setContact] = useState({
    instagram1: '',
    instagram2: '',
    google_map_url: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/get-contact');
        setContact(response.data.data); 
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContact();
  }, []);
  

  const hasInstagramLinks = contact.instagram1 && contact.instagram2;

  return (
    <div className="p-5">
      <h1 className="text-3xl text-quaternary text-center font-bold mb-4">Nuestro Instagram</h1>

      <div className="flex sm:flex-col justify-around gap-10">
        {hasInstagramLinks ? (
          <>
            <div className="flex justify-center">
              <InstagramEmbed url={contact.instagram1} width={550} />
            </div>
            <div className="flex justify-center">
              <InstagramEmbed url={contact.instagram2} width={550} />
            </div>
          </>
        ) : (
          <p>Cargando publicaciones de Instagram...</p>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <h1 className="text-3xl text-quaternary text-center font-bold mb-4">Ubicación</h1>
      </div>
      <div className="w-full h-[400px]">
        <iframe
          title="Mapa de Bahía Blanca"
          src={contact.google_map_url}
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
