let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card', (res) => {
  let data = '';
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    let result = JSON.parse(data);
    console.log(`result: ${result.msg}`);
  });
});
/*
JSON 通常用于与服务端交换数据。

在接收服务器数据时一般是字符串。

我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象
*/
