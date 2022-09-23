// * Call Modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const cars = require("../data/cars.min.json");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      const renderHTML = fs.readFile("./public/index.html", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write(
            "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
          );
        } else {
          res.write(data);
        }
        res.end();
      });
    } else if (req.url === "/search-car") {
      const renderHTML = fs.readFile(
        "./public/search-car.html",
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
      const renderCSS = fs.readFile(cssPath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write(
            "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
          );
        } else {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.write(data);
        }
        res.end();
      });
    } else if (req.url.match(".js$")) {
      const jsPath = path.join("./public", req.url);
      const renderJS = fs.readFile(jsPath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write(
            "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
          );
        } else {
          res.writeHead(200, { "Content-Type": "application/javascript" });
          res.write(data);
        }
        res.end();
      });
    } else if (req.url.match(".png$")) {
      const imagePath = path.join("./public", req.url);
      const renderPNG = fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write(
            "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
          );
        } else {
          res.writeHead(200, { "Content-Type": "image/png" });
          res.write(data);
        }
        res.end();
      });
    } else if (req.url.match(".jpg$")) {
      const imagePath = path.join(__dirname, "../public", req.url);
      const renderJPG = fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.write(
            "<center style='margin-top: 100px ' ><h2>404: File Not Found</h2></center>"
          );
        } else {
          res.writeHead(200, { "Content-Type": "image/jpg" });
          res.write(data);
        }
        res.end();
      });
    } else if (req.url === "/cars") {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(cars));
    } else {
      const renderHTML = fs.readFile(
        "./public/404-handling.html",
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
    }
  })
  .listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
