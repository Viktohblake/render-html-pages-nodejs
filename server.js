const http = require('http');
const fs = require('fs');

const port = 4000;

// create a server with the HTTP variable
const server = http.createServer(function (request, response) {

  // create routes and send back some information
  let path = '';
  switch(request.url) {
    case '/home':
        path = 'home.html';
        break;
    case '/about':
        path = 'about.html';
        break;
    case '/contact':
        path = 'contact.html';
        break;
    default:
        break;    
  }

  // render html file
  if(path) {
    fs.stat(`./${path}`, (err, stats) => {
		response.statusCode = 200;
        // header
		response.setHeader('Content-Type', 'text/html');
  		if(stats) {
		  	fs.createReadStream(path).pipe(response);
  		} else {
  			response.statusCode = 404;
  			response.end('Sorry, page not found!');
            console.log(err);
  		}
  	});
  }
});

// create a port
server.listen(port, "127.0.0.1");

console.log(`Server is listening on port number: ${port}`);
console.log(`127.0.0.1:${port}/home`);