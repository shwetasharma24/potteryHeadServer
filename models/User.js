const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
        profilePicture: {
            type: String, 
        }
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);