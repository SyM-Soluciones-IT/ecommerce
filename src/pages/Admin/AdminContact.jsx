import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminContact() {
  const [contact, setContact] = useState({
    instagram1: '',
    instagram2: '',
    google_map_url: ''
  });

  // Cargar los datos de contacto actuales
  useEffect(() => {
    const fetchContact = async () => {
      const response = await axios.get('http://localhost:5000/api/contact/get-contact');
      setContact(response.data.data); // Ajustar la respuesta para obtener el objeto correcto
    };
    fetchContact();
  }, []);

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/contact/update-contact', { ...contact, id: 1 }); // Asignar ID 1
      alert('Información de contacto actualizada con éxito');
    } catch (error) {
      console.error('Error actualizando el contacto', error);
    }
  };

  return (
    <div>
      <h2>Administrar Información de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <label>Instagram 1:</label>
        <input
          type="text"
          name="instagram1"
          value={contact.instagram1}
          onChange={handleChange}
        />
        <label>Instagram 2:</label>
        <input
          type="text"
          name="instagram2"
          value={contact.instagram2}
          onChange={handleChange}
        />
        <label>Google Map URL:</label>
        <input
          type="text"
          name="google_map_url"
          value={contact.google_map_url}
          onChange={handleChange}
        />
        <button
          className="px-10 py-2 bg-blue-500 text-white border border-blue-700 rounded"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default AdminContact;
