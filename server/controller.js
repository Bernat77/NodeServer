const http = require("http");
const url = require("url");
const fs = require("fs");
const util = require("util");

module.exports = http.createServer((req, res) => {
  //var service = require('./service.js');
  const reqUrl = url.parse(req.url, true);

  requestLog(req);

  //routes
  if (req.url == "/") {
    returnPage()
      .then(data => {
        //  console.log(data);
        res.writeHead(200, "OK", { "content-type": "text/html" });
        res.write(data);
        res.end();
      })
      .catch(() => {
        console.log("Error!");
      });
  } else if (req.url == "/pagina1") {
    res.writeHead(200, "Error!", { "content-type": "text/html" });
    res.write("<html><head></head><body><h2></h2>Página 1!</body></html>");
    res.end();
  } else {
    //other files
    var indexExt = req.url.lastIndexOf(".");
    var ext = indexExt == -1 ? "raw" : req.url.substring(indexExt + 1);
    console.log(indexExt);
    console.log(ext);
    switch (ext) {
      case "css":
        returnCSS()
          .then(data => {
            res.writeHead(200, "OK", { "content-type": "text/css" });
            res.write(data);
            res.end();
            console.log("CSS enviado.");
          })
          .catch(() => {
            console.log("Error!");
          });
        break;
      case "js":
        break;
      default:
        res.writeHead(404, "Error!", { "content-type": "text/html" });
        res.write(
          '<html><head></head><body><h1 style="text-align:center">404</h1></br><h2>jaja! nada que mostrar, capullo</h2></body></html>'
        );
        res.end();
        break;
    }
  }
});

async function returnPage() {
  return new Promise((resolve, reject) => {
    fs.readFile("../client/index.html", "utf-8", async (error, data) => {
      if (error) {
        console.log("Error with Index.html: ", error);
        reject(error);
      }
      resolve(data);
    });
  });
}

async function returnCSS() {
  return new Promise((resolve, reject) => {
    fs.readFile("../client/css/index.css", "utf-8", async (error, data) => {
      if (error) {
        console.log("Error with Index.css: ", error);
        reject(error);
      }
      resolve(data);
    });
  });
}

function requestLog(req) {
  var date = new Date();
  console.log("========== REQUEST LOG ==========");
  console.log(
    "Date: ",
    date.getUTCDate(),
    "/",
    date.getUTCMonth(),
    "/",
    date.getUTCFullYear()
  );
  console.log("Time: ", date.getHours(), ":", date.getMinutes());
  console.log("Connection from: ", req.connection.remoteAddress);
  console.log("Requested URL: ", req.url);
  console.log("Method: ", req.method);
  console.log("=================================");
}
