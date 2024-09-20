import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Especifica el directorio raíz del proyecto
  plugins: [react()],
  build: {
    outDir: 'dist', // Directorio de salida
    emptyOutDir: true, // Eliminar archivos existentes en dist antes de la construcción
    assetsInlineLimit: 0, // Incluir todos los archivos en dist, incluso los pequeños
    rollupOptions: {
      input: {
        main: 'index.html', // Incluir index.html
      },
      output: {
        assetFileNames: '[name].[ext]', // Conservar nombres de archivo y extensiones
        chunkFileNames: '[name].[ext]', // Conservar nombres de archivo y extensiones
      },
    },
    // Incluir el archivo _redirects en dist
    assets: [
      '_redirects', // Agrega _redirects a la lista de activos a incluir
    ],
  },
});
