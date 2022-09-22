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
            res.write(
              "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
            );
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
            res.write(
              "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
            );
          } else {
            res.write(data);
          }
          res.end();
        }
      );
    } else if (req.url.match(".css$")) {
      const cssPath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(cssPath);
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match(".js$")) {
      const jsPath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(jsPath);
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fileStream.pipe(res);
    } else if (req.url.match(".png$")) {
      const imagePath = path.join("./public", req.url);
      const fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, { "Content-Type": "image/png" });
      fileStream.pipe(res);
    } else if (req.url === "/getcars") {
      const dataPath = path.join(__dirname, "../data", "/cars.json");
      const fileStream = fs.createReadStream(dataPath, "UTF-8");
      res.writeHead(200, { "Content-Type": "application/json" });
      fileStream.pipe(res);
    } else if (req.url === "/api/cars") {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(cars));
    } else {
      res.writeHead(404);
      res.write("<h1>404: File Not Found</h1>");
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
