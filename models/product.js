const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: String, required: true },
  rating: { type: Number, required: true },
  code: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
