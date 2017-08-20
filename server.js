const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db			 = require('./config/db');
const app            = express();


const port = 8000;



MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./config/routes')(app, database ,express);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
