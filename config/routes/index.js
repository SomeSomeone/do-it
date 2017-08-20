const pageRoutes = require('./pages_routes');
const markRoutes = require('./marks_routes');
const usersRoutes = require('./users_routes');
const publicRoutes = require('./public_routes');


module.exports = function(app, db ,express) {
  pageRoutes(app, db , express);
  markRoutes(app, db , express);
  usersRoutes(app, db , express);


  publicRoutes(app,express);
};