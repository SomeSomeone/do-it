const path  = require('path');
const basicAuth 	 = require('basic-auth');
const Base64    = require('../Base64.js');

VIEWS=path.join(__dirname, './../../app/views');


var auth = function (req, res, next) {


  if (req.cookies.globals===undefined) {
    res.redirect('/log_in');
  }
  var userData=JSON.parse(req.cookies.globals).currentUser
  if (!userData || !userData.authdata || !userData.username) {
    res.redirect('/log_in');
  }

  if (userData.username === 'admin' && userData.authdata === Base64.encode('admin'  + ':' + 'pass')) {
    next();
  } else {
    res.redirect('/log_in');
  }
}



module.exports = function(app, db) {
  app.get('/cabinet', auth, (req, res) => {
      res.sendFile('/index.html', { root : VIEWS })
  });
  //check cookieStore
  app.get('/log_in',(req, res) => {
      res.sendFile('/index.html', { root : VIEWS })
  });
  app.post('/log_in',(req, res) => {
      var user = basicAuth(req);
      console.log(user)
      if (!user || !user.name || !user.pass) {
        res.status(500).send('Something broke!');
      }
      if (user.name === 'admin' && user.pass === 'pass') {
        res.status(200).send('Something Ok!');
      } else {
        res.status(500).send('Something broke!');
      }

  });

};