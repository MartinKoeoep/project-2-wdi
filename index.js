// require the express library
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');

// const databaseURI = 'mongodb://localhost/project2artistDB';
const {port, dbURI} = require('./config/enviroment');

mongoose.connect(dbURI);

const router = require('./config/routes');
const User = require('./models/user');
// create an express app
const app = express();

// set up our templating engine
// THIS MUST COME BEFORE OUR REQUEST HANDLERS
app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(ejsLayouts);

// set up our static folder
// THIS MUST COME BEFORE OUR REQUEST HANDLERS
app.use(express.static(`${__dirname}/public`));

// setup bodyParser to handle Post requests

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride((req)=>{
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .populate({path: 'artworks', populate: {path: 'creator'}})
    .exec()
    .then((user) =>{
      res.locals.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(router);

// listen out for incoming requests on PORT 4000
app.listen(port, ()=> console.log('Express is listening to port '+ port));
