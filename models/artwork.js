const mongoose = require('mongoose');

const artworksSchema = new mongoose.Schema({
  artName: String,
  cost: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  client: String,
  source: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Artwork', artworksSchema);
