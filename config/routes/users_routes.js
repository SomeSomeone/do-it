const path  = require('path');




VIEWS=path.join(__dirname, './../../app/views');



module.exports = function(app, db) {
  

  const userHelper  = require('../user_routes_helper.js')(db);


  app.get('/cabinet', userHelper.auth, (req, res) => {
      res.sendFile('/index.html', { root : VIEWS })
  });
  app.get('/log_in',(req, res) => {
    res.sendFile('/index.html', { root : VIEWS })
  });
  app.post('/log_in',(req, res) => {
    userHelper.log_in(req, res)
    //userHelper.log_in(req, res)
  });
  app.get('/registrate',(req, res)=>{
    res.sendFile('/index.html', { root : VIEWS })
  })
  app.post('/registrate',(req, res)=>{
    userHelper.registrate(req, res)
  })

};