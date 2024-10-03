import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
    aboutData: null, // Agregar este campo para manejar los datos de About
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    SetAboutData: (state, action) => {
      state.aboutData = action.payload; // Reducer para establecer datos de About
    },
  },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortfolioData, ReloadData, SetAboutData } = rootSlice.actions;
