// require the express library
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const databaseURI = 'mongodb://localhost/project2artistDB';

mongoose.connect(databaseURI);

const router = require('./config/routes');

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

app.use(router);

// listen out for incoming requests on PORT 4000
app.listen(4000, ()=> console.log('Express is listening to port 4000'));
