let user = require('./User');

console.log(`username: ${user.userName}`); // jack

//创建server
let http = require('http');
let server = http.createServer((req,res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain;charset=utf-8");
  res.end("Hello node.js！");
});
server.listen(3000,'127.0.0.1',() => {
  console.log("服务器已启动，start server at 3000 port");
})
