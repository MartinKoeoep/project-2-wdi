const User  = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }));
}

function userShow(req, res){
  User
    .findById(req.params.id)
    .populate('artworks')
    .exec()
    .then((user)=>{
      res.render('users/show', {user});
    });

}

function userEdit(req, res){
  User
    .findById(req.params.id)
    .exec()
    .then((user)=>{
      if (req.params.id === res.locals.currentUser.id){
        res.render('users/edit', {user});
      } else {
        return res.redirect('/');
      }

    });
}

function userUpdate(req, res){
  User
    .findById(req.params.id)
    .update(req.body)
    .then( () =>{
      return res.redirect(`/users/${req.params.id}`);
    });
}

module.exports = {
  index: indexRoute,
  show: userShow,
  edit: userEdit,
  update: userUpdate
};
