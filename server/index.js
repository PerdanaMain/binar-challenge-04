// * Call Modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const cars = require("../data/cars.min.json");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      const renderHTML = fs.readFile(
        "./public/index.html",
        "utf8",
        (err, data) => {
          if (err) {
            res.writeHead(404);
            res.write("Error: File Not Found");
          } else {
            res.write(data);
          }
          res.end();
        }
      );
    } else if (req.url === "/search-car") {
      const renderHTML = fs.readFile(
        "./public/search-car.html",
        "utf-8",
        (err, data) => {
          if (err) {
            res.writeHead(404);
            res.write("Error: File Not Found");
          } else {
            res.write(data);
          }
          res.end();
        }
      );
    } else if (req.url.match(".css$")) {
      const cssPath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(cssPath, "UTF-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match(".js$")) {
      const jsPath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(jsPath, "UTF-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match(".png$")) {
      const imagePath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, { "Content-Type": "image/png" });
      fileStream.pipe(res);
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
