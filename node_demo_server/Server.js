let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');


let server = http.createServer((req,res) => {
  //res.status = 200;
  //res.setHeader("Content-Type","text/plain;charset=utf-8");
  let pathname = url.parse(req.url).pathname;
  //用substring(1)去掉文件名前的 “/”
  fs.readFile(pathname.substring(1),(err,data) => {
    if(err) {
      res.writeHead(404,{
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200,{
        'Content-Type': 'text/html'
      });
      res.write(data.toString());
    }
      res.end();
  });

});
server.listen(3000,'127.0.0.1',() => {
  console.log("server start at 3000 port...");
})
