var ObjectID = require('mongodb').ObjectID;
const path  = require('path');
VIEWS=path.join(__dirname, './../../app/views');


module.exports = function(app, db) {
  	app.get('/marks', (req, res) => {
  		//maybe we need page of marks
	    db.collection('marks').find({}).toArray((err, marks) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	      	console.log(marks)
	        res.send(marks);
	      }
	    });
	});
  	app.post('/marks/new', (req, res) => {
  		console.log(req.body)
	    const mark = { latlng: req.body.latlng, bindPopup: req.body.bindPopup };
	    db.collection('marks').insert(mark, (err, result) => {
	      if (err) { 
	        res.send({ 'error': 'An error has occurred' }); 
	      } else {
	        res.send(result.ops[0]);
	      }
	    });
	});
	app.delete('/marks/:id', (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': new ObjectID(id) };
	    db.collection('marks').remove(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send('Mark ' + id + ' deleted!');
	      } 
	    });
	});
};