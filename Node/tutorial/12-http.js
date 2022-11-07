const http = require("http");
const { rawListeners } = require("process");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("you are on the home page");
  }
  if (req.url === "/lol") {
    res.end("Lool");
  }
  res.end(
    '<h1>Oops !</h1>\
    <p>The page you are looking for does not exist</p>\
    <a href="/">Go back to the home page</a>'
  );
});

server.listen(8989);
