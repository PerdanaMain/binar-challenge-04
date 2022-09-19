// console.log("Implement servermu disini yak 😝!");

// call modules
const fs = require("fs");
const http = require("http");

const port = 3000;

const renderHtml = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const url = req.url;
    switch (url) {
      case "/search-car":
        renderHtml("../public/search-car.html", res);
        break;
      default:
        renderHtml("../public/index.html", res);
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is Listening On Port ${port}`);
  });
