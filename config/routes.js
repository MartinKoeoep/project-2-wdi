const express = require('express');
const router = express.Router();


const users = require('../controllers/users');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const artworksController = require('../controllers/artworks');

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);
router.route('/logout')
  .get(sessions.delete);



router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update);
router.route('/users/:id/edit')
  .get(users.edit);


router.route('/')
  .get(artworksController.home);
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
