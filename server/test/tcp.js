const net = require('net')

const server = net.createServer((Socket) => {
    socket.end('hello test');
}).on('error', (err) => {
    throw err;
});
server.listen(() => {
    console.log('oppned server on' ,server.address())
})