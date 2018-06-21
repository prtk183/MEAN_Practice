
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.get('/q9client.html', function (req, res) {
   res.sendFile( __dirname + "/" + "q9client.html" );
})

app.get('/', function (req, res) {
   res.send('Hello Express World');
})

/**---------Insert into db------*/
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
   res.end(JSON.stringify(response));
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**----------update in db---*/
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
	var myquery = { StudentRollNo: req.body.StudentRollNo };
	var newvalues = { $set: {StudentRollNo:req.body.StuentMark } };
	
	dbo.collection("student").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
		});
	});

   console.log(response);
   res.end(JSON.stringify(response));
})



// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})



var server = app.listen(8082, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})