const express = require('express');
const router = express.Router();

const artworksController = require('../controllers/artworks');

router.get('/',(req, res) => res.render('home',{
  isHomepage: true
}));

router.route('/artworks')
  .get(artworksController.index)
  .post(artworksController.create);

router.route('/artworks/new')
  .get(artworksController.new);

router.route('/artworks/:id')
  .get(artworksController.show)
  .put(artworksController.update)
  .delete(artworksController.delete);

router.route('/artworks/:id/edit')
  .get(artworksController.edit);

module.exports = router;
