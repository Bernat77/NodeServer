const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  //var service = require('./service.js');
  const reqUrl = url.parse(req.url, true);

  console.log("Connection from: ", req.connection.remoteAddress);
  console.log("Requested url: ",req.url);
  

  if (req.url == "/") {
    res.writeHead(200, "Error!", { "content-type": "text/html" });
    res.write("<html><head><meta charset=\"UTF-8\"></head><body><h2>Página principal</h2></body></html>");
    res.end();
  } else if (req.url == "/pagina1") {
    res.writeHead(200, "Error!", { "content-type": "text/html" });
    res.write("<html><head></head><body><h2></h2>Página 1!</body></html>");
    res.end();
  } else {
    res.writeHead(404, "Error!", { "content-type": "text/html" });
    res.write("<html><head></head><body><h1 style=\"text-align:center\">404</h1></br><h2>jaja! nada que mostrar, capullo</h2></body></html>");
    res.end();
  }
});
