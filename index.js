var http 	=	require('http'),
	url 	=	require('url'),
	path 	=	require('path'),
	fs 		=	require('fs');

var mimeType = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"png": "image/png"
}


http.createServer(function(request, response){
	console.log('request ', request.url);

	var headers = request.headers;
	var method = request.method;

	var parseObject = url.parse(request.url, true);
	var queryData = parseObject.query;

	console.log(queryData);

	response.writeHead(200, {"Content-Type": "text/html"});
	if (request.method === 'GET' && parseObject.pathname === '/test') {
		response.write("Here is valid check \n");
		if ( queryData.name )
		{
			if (queryData.name === "mengmeng")
				var imageName = "xx.jpg";
			else
				var imageName = "yy.jpg";

			response.write(imageName + '\n');
			fs.readFile(imageName, function(err, content){
				if (err)  throw err;
				imagedata = new Buffer(content).toString('base64');
				response.write('<img src="data:image/jpg;base64,' + imagedata + '" height="640" width="480">');
				response.end();

			});
			
		} else
		{
			response.write("no valid name is given.");
			response.end();

		}
	} else {
		response.statusCode = 404;
		response.write("wrong path");
		response.end();
	  }


}).listen(8888);
console.log('server running at http://localhost:8888/');
