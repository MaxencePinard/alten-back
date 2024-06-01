const Column = require('../models/column');
const AdminColumn = require('../models/adminColumn');

exports.getColumns = (req, res, next) => {
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
};

exports.getAdminColumns = (req, res, next) => {
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
};

exports.editAdminColumns = (req, res, next) => {
  AdminColumn.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.createColumnsList = (req, res, next) => {
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  Column.insertMany(req.body).then(() => {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
};

exports.createAdminColumnsList = (req, res, next) => {
  for (let i=0; i<req.body.length; i++) {
    delete req.body[i]._id;
  }
  AdminColumn.insertMany(req.body).then(() => {
      console.log("Data inserted");
      res.status(201).json({ message: 'Liste enregistrée !'});
  }).catch(function (error) {
      console.log(error);
  });
};
