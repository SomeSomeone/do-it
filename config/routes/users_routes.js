const path  = require('path');
VIEWS=path.join(__dirname, './../../app/views');


module.exports = function(app, db) {
	app.get('/users', (req, res) => {
    	res.sendFile('/index.html', { root : VIEWS })
  	});
};