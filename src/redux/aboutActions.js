import axios from "axios";
import { SetAboutData, ShowLoading, HideLoading } from "./rootSlice"; // Importar las acciones necesarias

export const fetchAboutData = () => async (dispatch) => {
  dispatch(ShowLoading());
  try {
    const response = await axios.get("http://localhost:5000/api/about/get-about"); 
    dispatch(SetAboutData(response.data)); // Actualiza el estado con los datos obtenidos
  } catch (error) {
    console.error("Error al obtener datos de About", error);
  } finally {
    dispatch(HideLoading());
  }
};
