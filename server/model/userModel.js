const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        min: 4,
        max: 20
    },
    password: {
        type:String,
        required:true,
        unique: false,
        min: 8,
    }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)