const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);