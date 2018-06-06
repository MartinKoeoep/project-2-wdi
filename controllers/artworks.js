const Artworks = require('../models/artwork');

function artworksIndex(req, res){
  Artworks
    .find()
    .exec()
    .then( artworks => {
      sortByKey(artworks, 'updatedAt');
      res.render('artworks/index', {
        title: 'All the artworks',
        artworks
      });
    });
}

function artworksShow(req, res){
  Artworks
    .findById(req.params.id)
    .populate('creator')
    .exec()
    .then((artwork)=>{
      res.render('artworks/show', {artwork});
    });
}

function artworksNew(req, res){
  if (!res.locals.isLoggedIn) return res.redirect('/');
  res.render('artworks/new');
}

function artworksCreate(req, res){
  const artworkData = req.body;
  artworkData['creator'] = res.locals.currentUser.id;
  Artworks
    .create(req.body)
    .then((artwork) => {
      return  res.redirect(`/artworks/${artwork._id}`);
    });
}

function artworksEdit(req, res){
  Artworks
    .findById(req.params.id)
    .populate('creator')
    .exec()
    .then((artwork)=>{
      if (!(res.locals.currentUser.username === artwork.creator.username)) return res.redirect('/');
      res.render('artworks/edit', {artwork});
    });
}

function artworksUpdate(req, res){
  Artworks
    .findById(req.params.id)
    .update(req.body)
    .then( () =>{
      return res.redirect(`/artworks/${req.params.id}`);
    });
}

function artworksDelete(req, res){
  if (!res.locals.isLoggedIn) return res.redirect('/');
  Artworks
    .findById(req.params.id)
    .exec()
    .then(artwork => {
      artwork.remove();
      return res.redirect('/artworks');
    });
}

function artworksHome(req, res){
  Artworks
    .find()
    .exec()
    .then(artworks => {
      sortByKey(artworks, 'updatedAt');
      res.render('home',{artworks});
    });
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = b[key]; var y = a[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

module.exports = {
  index: artworksIndex,
  show: artworksShow,
  new: artworksNew,
  create: artworksCreate,
  edit: artworksEdit,
  update: artworksUpdate,
  delete: artworksDelete,
  home: artworksHome
};
