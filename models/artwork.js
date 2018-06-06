const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  tally: { type: Number, default: 1 },
  liker: String
});

const artworksSchema = new mongoose.Schema({
  artName: String,
  cost: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  client: String,
  source: String,
  ratings: [ratingSchema]
}, {
  timestamps: true
});

artworksSchema.virtual('rating')
  .get(function() {
    let score = 0;
    this.ratings.forEach(() => {
      score += 1;
    });
    return score;
  });

module.exports = mongoose.model('Artwork', artworksSchema);
