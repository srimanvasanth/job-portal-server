const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        uName: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true
        },
        userPwd: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.String,            
        }
    }, {
        collection: "user"
    })

module.exports = new mongoose.model("user", userSchema);