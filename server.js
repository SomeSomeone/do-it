const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db			 = require('./config/db');
const app            = express();


const port = 8000;

//add all in public
app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./config/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
