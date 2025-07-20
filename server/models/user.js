const mongoose = require('mongoose');

module.exports = mongoose.model("User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },
        rooms: [String]
    })
);
