import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetPortfolioData, ShowLoading, ReloadData } from "./redux/rootSlice";
import Login from "./pages/Admin/Login";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const url = "https://peniamatias.alwaysdata.net/api/portfolio/get-portfolio-data";
  const dispatch = useDispatch();
  
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const language = localStorage.getItem('language') || 'EN'; // Obtener el idioma del localStorage
      const response = await axios.get(url, {
        params: {language}
      });
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
      <WhatsAppButton /> 
    </BrowserRouter>
  );
}

export default App;
