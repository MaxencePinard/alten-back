const Product = require('../models/product');

exports.newProduct = (req, res, next) => {
  delete req.body._id;
  delete req.body.isSelected;
  const product = new Product({
    ...req.body
  });
  product.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getProductsList = (req, res, next) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
};

exports.getProductById = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
};

exports.editProduct = (req, res, next) => {
  delete req.body.isSelected;
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteOneProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSelectedProducts = (req, res, next) => {
  Product.deleteMany({ _id: req.body })
    .then(() => res.status(200).json({ message: 'Objets supprimés !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAdminProductsList = (req, res, next) => {
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
};

exports.createProductsList = (req, res, next) => {
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  Product.insertMany(req.body).then(() => {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
};
