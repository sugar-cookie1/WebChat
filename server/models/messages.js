const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    room: String,
    author: String,
    message: String,
    hour: Number,
    minute: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message',messageSchema);//exporting a constructor named message that creates a new object of the format specififed above
