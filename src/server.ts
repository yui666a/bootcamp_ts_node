import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const server = http.createServer((req, res) =>{
  const url =
    "public" + (req.url?.endsWith("/") ? req.url + "index.html" : req.url);
    
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.on("listening", () => {
  console.log("start listening!");
});

// Start listening 12345 port of localhost (127.0.0.1).
const port = process.env.PORT || 12345;
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
console.log("run server.ts");

function getType(_url: string): string {
  const types: Record<string, string> = {
    ".html": "text/html",
    ".jpg": "image/jpeg",
    ".json": "text/json",
    ".png": "image/png",
    ".ico": "image/x-icon",
  };
  for (const key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
