import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  // Verifica si el idioma es español (ES)
  const isSpanish = contact.language === "ES";

  return (
    <div>
      <SectionTitle title={isSpanish ? "Di Hola" : "Say Hi"} />

      <div className="flex sm:flex-col px-5 justify-center gap-10">
        <div className="flex flex-col w-1/3">
          {isSpanish ? (
            <pre className="text-tertiary text-sm">
              {`{
  nombre: ${contact.name}
  edad: ${contact.age}
  género: ${contact.gender}
  email: ${contact.email}
  móvil: ${contact.mobile}
  país: ${contact.country}
  ciudad: ${contact.city}
}`}
            </pre>
          ) : (
            <>
              <p className="text-tertiary text-sm">{"{"}</p>
              {Object.keys(contact).map(
                (key) =>
                  key !== "_id" && (
                    <p className="ml-5">
                      <span className="text-tertiary text-sm">{key}: </span>
                      <span className="text-tertiary text-sm">
                        {contact[key]}
                      </span>
                    </p>
                  )
              )}
              <p className="text-tertiary text-sm">{"}"}</p>
            </>
          )}
        </div>

        <div className="h-[400px]">
          <dotlottie-player
            src="https://lottie.host/427c7775-f5bb-4ee1-9456-5ec1fa5c1b91/khYVIlYmRE.json"
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
