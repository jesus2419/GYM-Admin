const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express(); // <-- primero se crea la app

// Luego se configura CORS
app.use(cors({
  origin: 'http://localhost:3000',
  // credentials: true // descomenta solo si usas cookies
}));

const routes = require('./routes/routes');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
