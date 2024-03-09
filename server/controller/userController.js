const bcrypt = require('bcrypt')
const User = require("../model/userModel");
const { generateTokenSetCookie } = require('../utils/tokengenerator');

module.exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already taken! "});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        delete password;
        const newUser = new User(
            { username,
             password: encryptedPassword
             });
        
        if(newUser){
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
            })

        }else {
            res.status(400).json({message: "User data error"});
        }
    }
    catch(error){
        console.log("Error in userController at register method", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const doPasswordsMatch = await bcrypt.compare(password, user?.password || "");

        if(!user || !doPasswordsMatch){
            return res.status(400).json({ message: "Username or password are not valid"});
        }

        generateTokenSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username
        });
    }
    catch(error){
        console.log("Error in userController at login method", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Succesfully logged out"})
    }
    catch(error){
        console.log("Error in userController at logout method", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getUsers = async(req, res) => {
    try{
        const loggedUserId = req.user._id

        const users = await User.find({
            _id: { $ne: loggedUserId}
        })

        res.status(200).json(users);
    }
    catch(error){
        console.log("Error in userController at getUsers method", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}