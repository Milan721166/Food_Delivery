const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobNum: {
        type: Number,
        required: true,
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;