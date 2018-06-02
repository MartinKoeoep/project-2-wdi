const Artworks = require('../models/artwork');

function artworksIndex(req, res){
  Artworks
    .find()
    .exec()
    .then( artworks => {
      res.render('artworks/index', {
        title: 'All the artworks',
        artworks
      });
    });
}

function artworksShow(req, res){
  Artworks
    .findById(req.params.id)
    .exec()
    .then((artwork)=>{
      res.render('artworks/show', {artwork});
    });
}

function artworksNew(req, res){
  res.render('artworks/new');
}

function artworksCreate(req, res){
  Artworks
    .create(req.body)
    .then((artwork) => {
      return  res.redirect(`/artworks/${artwork._id}`);
    });
}

function artworksEdit(req, res){
  Artworks
    .findById(req.params.id)
    .exec()
    .then((artwork)=>{
      res.render('artworks/edit', {artwork});
    });
}

function artworksUpdate(req, res){
  Artworks
    .findById(req.params.id)
    .update(req.body)
    .then( artwork =>{
      return res.redirect(`/pictures/${artwork.id}`);
    });
}

function artworksDelete(req, res){
  Artworks
    .findById(req.params.id)
    .exec()
    .then(artwork => {
      artwork.remove();
      return res.redirect('/artworks');
    });
}


module.exports = {
  index: artworksIndex,
  show: artworksShow,
  new: artworksNew,
  create: artworksCreate,
  edit: artworksEdit,
  update: artworksUpdate,
  delete: artworksDelete
};
