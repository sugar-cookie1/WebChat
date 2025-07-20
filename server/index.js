const express = require('express');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const roomsRoutes = require('./routes/rooms');
const {connectSocket} = require('./config/socket.js')
const connectDB = require('./config/db.js')

//connect to db
connectDB();
//setup env file
require("dotenv").config();
const port = process.env.PORT;

//setup server
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", roomsRoutes);

//create server
const server = http.createServer(app);

//plug socket into the server
connectSocket(server);

//start port
server.listen(port,()=>{
    console.log(`server running on port ${port}`);
});