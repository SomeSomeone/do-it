const ObjectID = require('mongodb').ObjectID;
const fetch  = require('node-fetch');
const path  = require('path');
VIEWS=path.join(__dirname, './../../app/views');


module.exports = function(app, db) {
	const userHelper  = require('../user_routes_helper.js')(db);


  	app.get('/marks', (req, res) => {
  		//maybe we need page of marks
	    userHelper.current_user(req ,function(err, item){
	    	
		    db.collection('marks').find({author:item._id}).toArray((err, marks) => {
		      if (err) {
		        res.send({'error':'An error has occurred'});
		      } else {
		      	console.log(marks)
		        res.send(marks);
		      }
		    });
		 });
	});
  	app.post('/marks/new', (req, res) => {
	    userHelper.current_user(req ,function (err,item) {
		    const mark = { latlng: req.body.latlng, bindPopup: req.body.bindPopup , author:item._id};
		    db.collection('marks').insert(mark, (err, result) => {
		      if (err) { 
		        res.send({ 'error': 'An error has occurred' }); 
		      } else {
		        res.send(result.ops[0]);
		      }
		    });
	    })

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
	app.post('/marks/here',(req, res)  => {
		var latlng=JSON.parse(req.body.latlng);
	    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        const key = 'AIzaSyC4hFpKX1HQzIsBQlux8RQB1gK1FOimDu4';
        const location = `${latlng.lat},${latlng.lng}`;
        const rankby = "distance";
        const type = req.body.type
        const finalUrl = `${url}?key=${key}&location=${location}&rankby=${rankby}&type=${type}`;

	    console.log(finalUrl);
	    fetch( finalUrl, {
	        method: 'get'
	    }).then( response => {
	        if(response.status === 200){
	            response.json().then( data => {
	                res.send(data);
	                console.log(1)
	            });
	        } else {
	        	console.log(2)
	            res.status(500).end();
	        }
	    });
  });
};