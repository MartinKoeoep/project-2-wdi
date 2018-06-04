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
    .exec()
    .then((user)=>{
      res.render('users/show', {user});
    });

}

function userEdit(req, res){
  console.log(req.params.id);
  User
    .findById(req.params.id)
    .exec()
    .then((user)=>{
      // if (!(res.locals.username === user.creator.username)) return res.redirect('/');
      res.render('users/edit', {user});
    });
}

function userUpdate(req, res){
  User
    .findById(req.params.id)
    .update(req.body)
    .then( user =>{
      return res.redirect(`/users/${req.params.id}`);
    });
}

module.exports = {
  index: indexRoute,
  show: userShow,
  edit: userEdit,
  update: userUpdate
};
