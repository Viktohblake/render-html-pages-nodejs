const http = require("http");
const fs = require("fs");

const port = 4000;

// create a server with the HTTP variable
const server = http.createServer(function (request, response) {

  // create route map for html  and send back some information
  const routes = {
    'home': 'home.html',
    'about': 'about.html',
    'contact': 'contact.html',
  }

  // call render function
  render(response, routes[request.url.slice(1)]);

});

// render html file path function
function render(response, path) {
      fs.stat(`./${path}`, (err, stats) => {
      response.statusCode = 200;
      // header
      response.setHeader("Content-Type", "text/html");
      if (stats) {
        fs.createReadStream(path).pipe(response);
      } else {
        response.statusCode = 404;
        response.end("Sorry, page not found!");
        console.log(err);
      }
    });
  }

// create a port
server.listen(port, "127.0.0.1");

console.log(`Server is listening on port number: ${port}`);
console.log(`127.0.0.1:${port}/home`);
