var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Bear = require('./app/models/bear')

var mongoose = require('mongoose');

mongoose.connect('mongodb://username:username@proximus.modulusmongo.net:27017/Q9ydenij')

var port = process.env.PORT || 8080;

var router = express.Router();


router.use(function(req, res, next){
	
	console.log('Something is happening here.');
	next();
});

router.get('/', function(req, res){
	res.json({message: 'hello! we are in the api!'});
});

router.route('/bears')

//creates a new bear object
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err){
			if(err)
				res.send(err);

			res.json({message: 'Bear created!'});
		});
	})

//show all the bear objects created
	.get(function(req, res){
		Bear.find(function(err, bears){
			if(err)
				res.send(err);

			res.json(bears);
		});
	});

router.route('/bears/:bear_id')

//returns a single bear object from it's id
	.get(function(req, res){
		Bear.findById(req.params.bear_id,function(err,bear){
			if(err)
				res.send(err);
			res.json(bear);
		});
	})

//update the bear that was created
	.put(function(req, res){
		Bear.findById(req.params.bear_id, function(err,bear){
			if(err)
				res.send(err);

			bear.name = req.body.name;  //this is how you update the bears name

			bear.save(function(err, res){
				if(err)
					res.send(err);

				res.json({message: "You updated your bear!"})
			});
		});
	})

// delete a bear that was created

	.delete(function(req, res){
		Bear.remove({
			_id: req.params.bear_id
		}, function(err,bear){
			if(err)
				res.send(err);

			res.json({message:"successfully deleted bear"});
		});
	});


app.use('/api', router);

app.listen(port);
console.log("Magic happens on port" + port)