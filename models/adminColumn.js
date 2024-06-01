const mongoose = require('mongoose');

const adminColumnSchema = mongoose.Schema({
  id: { type: String, required: true },
  lang: { type: String, required: true },
  header: { type: String, required: false },
  field: { type: String, required: true },
  sortable: { type: Boolean, required: true },
  searchable: { type: Boolean, required: true },
  displayed: { type: Number, required: false },
});

module.exports = mongoose.model('AdminColumn', adminColumnSchema);
