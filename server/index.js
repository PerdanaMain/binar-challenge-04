// call modules
const fs = require("fs");
const http = require("http");

const port = 3000;

http
  .createServer((req, res) => {
    const url = req.url;
    switch (url) {
      case "/search-car":
        fs.readFile("../public/search-car.html", (err, html) => {
          res.writeHead(200, {
            "Content-type": "text/html",
          });
        });
        break;
      default:
        fs.readFile("../public/index.html", (err, html) => {
          res.writeHead(200, {
            "Content-type": "text/html",
          });
        });
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is Listening On http://localhost:${port}`);
  });
