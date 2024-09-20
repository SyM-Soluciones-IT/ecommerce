require('dotenv').config();


const express = require('express');
const connectDB = require('./config/database');
const tournamentRoutes = require('./routes/tournamentRoutes');
const setRoutes = require('./routes/setRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(express.json()); // Permite leer los datos enviados en formato JSON

// Conectar a la base de datos
connectDB();

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Usar las rutas
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/sets', setRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

