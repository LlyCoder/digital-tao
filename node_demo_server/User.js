//默认输出，相当于export default
module.exports = {
  userName: "jack",
  sayHello: function() {
    return "Hello";
  }
}

//等同于：指定名字的输出
exports.userName = "jack";
exports.sayHello = function() {
  return "Hello";
}
