import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    name: '',
    rating: 1,
    comment: '',
  });
  const [editExperience, setEditExperience] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experiences/get-experiences');
        setExperiences(response.data);
      } catch (error) {
        setMessage('Error al cargar las experiencias');
        console.error(error);
      }
    };
    fetchExperiences();
  }, []);
  
  const handleChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editExperience) {
        await axios.put(`http://localhost:5000/api/experiences/update-experience/${editExperience.id}`, newExperience);
        setMessage('Experiencia actualizada con éxito');
        setEditExperience(null);
      } else {
        await axios.post('http://localhost:5000/api/experiences/create-experience', newExperience);
        setMessage('Experiencia agregada con éxito');
      }

      setNewExperience({ name: '', rating: 1, comment: '' });
      const response = await axios.get('http://localhost:5000/api/experiences/get-experiences');
      setExperiences(response.data);
    } catch (error) {
      setMessage('Error al guardar la experiencia');
      console.error(error);
    }
  };

  const handleEdit = (exp) => {
    setEditExperience(exp);
    setNewExperience({ name: exp.name, rating: exp.rating, comment: exp.comment });
  };

  const handleCancelEdit = () => {
    setEditExperience(null);
    setNewExperience({ name: '', rating: 1, comment: '' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/experiences/delete-experience/${id}`);
      setMessage('Experiencia eliminada con éxito');
      const response = await axios.get('http://localhost:5000/api/experiences/get-experiences');
      setExperiences(response.data);
    } catch (error) {
      setMessage('Error al eliminar la experiencia');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Administrar Experiencias</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newExperience.name}
          onChange={handleChange}
          required
          className="border rounded p-2 mr-2"
        />
        <select
          name="rating"
          value={newExperience.rating}
          onChange={handleChange}
          required
          className="border rounded p-2 mr-2"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <textarea
          name="comment"
          placeholder="Comentario"
          value={newExperience.comment}
          onChange={handleChange}
          required
          className="border rounded p-2 mr-2"
        />
        <button
          className="px-10 py-2 bg-blue-500 text-white border border-blue-700 rounded"
          type="submit"
        >
          {editExperience ? 'Actualizar Experiencia' : 'Agregar Experiencia'}
        </button>
        {editExperience && (
          <button type="submit" onClick={handleCancelEdit} className="px-10 py-2 bg-blue-500 text-white border border-blue-700 rounded">
            Cancelar
          </button>
        )}
      </form>

      <h2>Experiencias</h2>
      <ul className="list-disc pl-5">
        {experiences.map(exp => (
          <li key={exp.id} className="mb-2 p-2 border-b">
            <strong>{exp.name}:</strong> {exp.comment} - {exp.rating} estrellas 
            <button type="submit" onClick={() => handleEdit(exp)} className="ml-2 px-10 py-2 bg-green-500 text-white border ">Editar</button>
            <button type="submit" onClick={() => handleDelete(exp.id)} className="ml-2 px-10 py-2 bg-red-500 text-white border ">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminExperiences;
