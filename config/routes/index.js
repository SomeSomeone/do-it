const pageRoutes = require('./pages_routes');
const markRoutes = require('./marks_routes');
const usersRoutes = require('./users_routes');



module.exports = function(app, db) {
  pageRoutes(app, db);
  markRoutes(app, db);
  usersRoutes(app, db);
};