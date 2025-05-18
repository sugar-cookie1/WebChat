const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    },
});


io.on("connection", (socket)=>{
    console.log(socket.id);

    
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with Id: ${socket.id} joined room: ${data}`);
    })
    
    socket.on("send_message", (data) =>{
        io.to(data.room).emit("receive_message", data);
        console.log(data)
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
 
})

const port = process.env.PORT || 3001;
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});