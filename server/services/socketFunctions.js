const User = require('../models/user.js');
const Message = require('../models/messages.js');

class SocketFunctions {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        this.registerEvents(); // auto-hook all events on init
    }

    registerEvents() {
        this.socket.on("join_room", this.joinRoom.bind(this));
        this.socket.on("send_message", this.sendMessage.bind(this));
        this.socket.on("disconnect", this.handleDisconnect.bind(this));
    }

    //connect a user with this username to this room
    async joinRoom({ username, room }) {
        try {
            //find a user with this username  
            const user = await User.findOne({ username });
            if (!user) {
                console.log(`user with this username not found in the database`)
                return;
            }

            //add to the list of recent rooms.
            user.recentRooms = user.recentRooms.filter(r => r !== room);
            user.recentRooms.unshift(room);
            await user.save();

            //join the room
            this.socket.join(room);

            //emit all the previous messages in this chat
            const allMessages = await Message.find({ room }).sort({ timestamp: 1 });
            this.socket.emit("previous_messages", allMessages);

            console.log(`🟢 ${username} joined room ${room}`);
        } catch (err) {
            console.error("join_room error:", err);
        }
    }

    //get a message
    async sendMessage(data) {
        //create this message 
        const newMessage = new Message(data);
        //send to the frontend
        this.io.in(data.room).emit("receive_message", data);
        //save to the db
        try {
            await newMessage.save();
            console.log("💾 Message saved");
        } catch (e) {
            console.error("send_message error:", e);
        }
    }

    handleDisconnect() {
        console.log("❌ Disconnected:", this.socket.id);
    }
}

module.exports = SocketFunctions;
