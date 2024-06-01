const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { auth } = require('../middleware/auth');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
        role: 'user',
        adminColumns: ['code', 'name']
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
   .then(user => {
     if (!user) {
       return res.status(401).json({ message: 'Login ou mot de passe incorrect'});
     }
     bcrypt.compare(req.body.password, user.password)
       .then(valid => {
         if (!valid) {
           return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
         }
         res.status(200).json({
           userId: user._id,
           email: user.email,
           username: user.username,
           role: user.role,
           token:  jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
         });
       })
         .catch(error => res.status(500).json({ error }));
   })
   .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.body.id })
   .then(user => {
     if (!user) {
       return res.status(401).json({ message: 'Pas d\'utilisateur avec cet id'});
     } else {
       res.status(200).json({
         userId: user._id,
         email: user.email,
         username: user.username,
         role: user.role,
         adminColumns: user.adminColumns
       });
     }
   })
   .catch(error => res.status(500).json({ error }));
};

exports.editUser = (req, res, next) => {
  console.log(req.body);
  console.log({...req.body});
  if(req.body.password) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.updateOne({ _id: req.body.userId }, { ...req.body, password: hash })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    User.updateOne({ _id: req.body.userId }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
  }

};

exports.editAdminColumnsList = (req, res, next) => {
  console.log(req.body);
  User.updateOne({ _id: req.body.id }, { adminColumns: req.body.columns, _id: req.body.id })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
};
