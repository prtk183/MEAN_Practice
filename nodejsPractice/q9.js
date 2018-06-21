var http=require("http");
var qs=require("querystring");

var server=http.createServer(function(req,res){
res.writeHead(200,"content-type","text/html");
	/*if(req.method=="post")

	{
		//res.writeHead(200,"content-type","text");
	}
	var body="";
	req.on('data',function(chunk){

		body+=chunk;
	});
req.on('end', function(){
console.log('body  '+body);
console.log(req.url);
var data=qs.parse(req.url.split("?")[1]);
res.write(data.name);
//var jsonobj=JSON.parse(body);
//res.write(jsonobj.marks);
//console.log(jsonobj.$key);
//});
}*/


console.log(req.url);
var data=qs.parse(req.url.split("?")[1]);
res.write("name:" + data.name+"\n"+"rollno:"+data.rollno+"\n"+"msrks:"+data.marks);
if(data.marks<40)
{
	res.write("\n failed");
}
else
{
	res.write("\n passed");
}

res.end('..*..');

});

server.listen(3000,function(err,data){
	console.log("connected");
});