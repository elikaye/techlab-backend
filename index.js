import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import './src/config/firebaseAdmin.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.json({ message: 'API funcionando' }));

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack); // Log en consola
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


