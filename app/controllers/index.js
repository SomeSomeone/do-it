const pagesController = require('./pages_controller');
const usersController = require('./users_controller');



module.exports = function(app) {
  pagesController(app);
  usersController(app);
};