const express = require('express');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products');
const columnsRoutes = require('./routes/columns');
const userRoutes = require('./routes/user');

const app = express();
const currency = 'EUR';

mongoose.connect('mongodb+srv://pinardmaxence:JknFZEh2qjDrB2p8@cluster0.drbkseu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/products', productsRoutes);
app.use('/api/columns', columnsRoutes);
app.use('/api/auth', userRoutes);

app.get('/api/currency', (req, res, next) => {
  res.status(200).json(currency);
});

module.exports = app;
