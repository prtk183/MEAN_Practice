
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');

/**---to render new pages created view folder and added html pages*/
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('views'));

app.get('/q9client.html', function (req, res) {
	
   res.sendFile( __dirname + "/" + "q9client.html" );
})

app.get('/', function (req, res) {
   res.send('Hello Express World');
})

app.get('/AddStudent', function (req, res) {
   // Prepare output in JSON format
   response = {
	  StudentName:req.query.StudentName,
	  StudentRollNo:req.query.StudentRollNo,
	  StuentMark:req.query.StuentMark
 
   };
   
   MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("mydb");
  
		var myobj = {StudentName: req.query.StudentName, 
					StudentRollNo:req.query.StudentRollNo,
					StudentMark: req.query.StudentMark};
					
		dbo.collection("student").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
		});
   });
   console.log(response);
   //res.end(JSON.stringify(response));
   //String str = JSON.stringify(response);
   res.render('q9client.html');
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/UpdateStudent', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
     StudentName:req.body.StudentName,
	  StudentRollNo:req.body.StudentRollNo,
	  StuentMark:req.body.StuentMark
   };
   
   MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	var myquery = { StudentName: req.body.StudentName };
	var newvalues = { $set: {StudentName: req.body.StudentName, 
							 StudentRollNo:req.body.StudentRollNo,
							StuentMark:req.body.StuentMark}
					};
	
	dbo.collection("student").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
		});
	});

   console.log(response);
    res.render('q9client.html');
   //res.end(JSON.stringify(response));
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})