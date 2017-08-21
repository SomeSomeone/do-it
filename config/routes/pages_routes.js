const path  = require('path');
VIEWS=path.join(__dirname, './../../app/views');


module.exports = function(app, db , express) {
	app.get('/', (req, res) => {
		//for test
  		res.sendFile('/index.html', { root : VIEWS })
	});
	app.get('/about', (req, res) => {
		//for test
	  	res.sendFile('/index.html', { root : VIEWS })
	});



  	app.use('/pages',express.static('./app/views/pages'));
  	
  
};