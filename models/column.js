const mongoose = require('mongoose');

const columnSchema = mongoose.Schema({
  id: { type: String, required: true },
  lang: { type: String, required: true },
  header: { type: String, required: false },
  field: { type: String, required: true },
});

module.exports = mongoose.model('Column', columnSchema);
