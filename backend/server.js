require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const ShipmentRoutes = require('./routes/shipmentsRoutes');
const aboutRoute = require('./routes/aboutRoute');
const contactRoute = require('./routes/contactRoute');
const experiencesRoute = require('./routes/experiencesRoute');


const app = express();
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Permite leer los datos enviados en formato JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Usar las rutas
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipments', ShipmentRoutes);
app.use('/api/about', aboutRoute);
app.use('/api/contact', contactRoute);
app.use('/api/experiences', experiencesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

