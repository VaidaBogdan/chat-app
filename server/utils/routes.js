const { sendMessage, getMessages } = require('../controller/messageController.js');
const { register, login, logout, getUsers } = require('../controller/userController.js');
const { protectRoute } = require('../middleware/protector.js');

const router = require('express').Router();

router.post("/register",register).post("/login",login).post("/logout",logout).get("/users", protectRoute, getUsers)
router.post("/messages/send/:id", protectRoute, sendMessage).get("/messages/:id",protectRoute, getMessages)

module.exports = router;