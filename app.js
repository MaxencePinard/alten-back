const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Column = require('./models/column');
const AdminColumn = require('./models/adminColumn');

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

app.post('/api/newProduct', (req, res, next) => {
  delete req.body._id;
  delete req.body.isSelected;
  const product = new Product({
    ...req.body
  });
  product.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/products', (req, res, next) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
});

app.put('/api/products/:id', (req, res, next) => {
  delete req.body.isSelected;
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products', (req, res, next) => {
  Product.deleteMany({ _id: req.body })
    .then(() => res.status(200).json({ message: 'Objets supprimés !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/adminProducts', (req, res, next) => {
  let adminProducts = [];
  Product.find()
    .then(products => {
      for (let i=0; i<products.length; i++) {
        adminProducts.push(products[i]);
        adminProducts[i].isSelected = false;
      }
      res.status(200).json(products);
    })
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/columns/:lang', (req, res, next) => {
  Column.find({ lang: req.params.lang }, null, {sort:{id: 1}})
    .then(columns => {
      if (columns.length === 0) {
        Column.find({ lang: "en" }, null, {sort:{id: 1}})
          .then(enColumns => res.status(200).json(enColumns))
          .catch(enError => res.status(400).json({ enError }));
      } else {
        res.status(200).json(columns);
      }
    })
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/adminColumns/:lang', (req, res, next) => {
  AdminColumn.find({ lang: req.params.lang }, null, {sort:{id: 1}})
    .then(columns => {
      if (columns.length === 0) {
        AdminColumn.find({ lang: "en" }, null, {sort:{id: 1}})
          .then(enColumns => res.status(200).json(enColumns))
          .catch(enError => res.status(400).json({ enError }));
      } else {
        res.status(200).json(columns);
      }
    })
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/adminColumns/:id', (req, res, next) => {
  AdminColumn.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
});

app.get('/api/currency', (req, res, next) => {
  res.status(200).json(currency);
});

app.post('/api/newProductsList', (req, res, next) => {
  console.log(req.body);
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  Product.insertMany(req.body).then(function () {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
});

app.post('/api/newColumnsList', (req, res, next) => {
  console.log(req.body);
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  Column.insertMany(req.body).then(function () {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
});

app.post('/api/newAdminColumnsList', (req, res, next) => {
  console.log(req.body);
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  AdminColumn.insertMany(req.body).then(function () {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
});

module.exports = app;
