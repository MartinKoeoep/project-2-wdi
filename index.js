const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

const databaseURI = 'mongodb://localhost/project2artistDB';

mongoose.connect(databaseURI);

const router = require('./config/root');


const app = express();
// set up our templating engine
// THIS MUST COME BEFORE OUR REQUEST HANDLERS
app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// setting up static folder
app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride((req)=>{
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);

app.listen(4000, () => console.log(`Express started on port: ${4000}`));
