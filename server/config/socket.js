const {Server} = require("socket.io");
const SocketFunctions  = require('../services/socketFunctions');

//plug to io into the server.
function connectSocket(server){
    this.io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"]
        },
    });
    io.on('connection',(socket)=>{
        console.log("new socket connection", socket.id);
        new SocketFunctions(io, socket);
    })
}
module.exports = {connectSocket}