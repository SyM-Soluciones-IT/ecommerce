import React, { useEffect, useState } from "react";
import { Form, Input, message, Spin } from "antd"; // Importa Spin para el loading
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { fetchAboutData } from "../../redux/aboutActions"; // Asegúrate que esta es la ruta correcta
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { aboutData } = useSelector((state) => state.root);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar los datos de About al montar el componente
  useEffect(() => {
    const loadAboutData = async () => {
      await dispatch(fetchAboutData());
      setLoading(false); // Termina la carga
    };
    loadAboutData();
  }, [dispatch]);

  // Manejo de error si aboutData no está disponible
  if (loading) {
    return <Spin size="large" />; // Mostrar un spinner mientras carga
  }

  // Verificar si aboutData contiene datos válidos
  if (!aboutData || !aboutData.success || !aboutData.data) {
    return <div>Error al cargar datos.</div>; // Manejo de error si no hay datos
  }


  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      // Crear FormData para enviar el archivo de imagen y otros datos
      const formData = new FormData();
      formData.append("description1", values.description1);
      formData.append("description2", values.description2);
      formData.append("description3", values.description3);
      formData.append("image", imageFile); // Añadir el archivo de imagen al FormData
      formData.append("_id", aboutData.data.id); // Incluye el ID de los datos actuales de About

      const response = await axios.put(
        "http://localhost:5000/api/about/update-about", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Error al actualizar la información", error);
    }
  };

  // Función para manejar el cambio del input de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          description1: aboutData.data.description1 || "",
          description2: aboutData.data.description2 || "",
          description3: aboutData.data.description3 || "",
        }}
      >
        <Form.Item name="description1" label="Descripción 1" required>
          <TextArea placeholder="Primera parte de la descripción" />
        </Form.Item>

        <Form.Item name="description2" label="Descripción 2" required>
          <TextArea placeholder="Segunda parte de la descripción" />
        </Form.Item>

        <Form.Item name="description3" label="Descripción 3" required>
          <TextArea placeholder="Tercera parte de la descripción" />
        </Form.Item>

        <Form.Item label="Cargar Imagen">
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end">
            <button
              className="px-10 py-2 bg-blue-500 text-white border border-blue-700 rounded"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminAbout;
