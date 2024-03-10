const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./utils/routes')
const cookieParser = require('cookie-parser')
const http = require('http');
const sv = require('socket.io');
const { setIO, setUserSocketId, deleteUserSocketId, userSocketMap } = require('./socket/socketUtils');


const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB works fine...");})
.catch((error) => { console.log(error); })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)



const server = http.createServer(app);

const io = sv(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

setIO(io);

io.on('connection', (socket) => {
    console.log("user connected ", socket.id, "using", socket.conn.transport.name);

    const userId = socket.handshake.query.userId;
    if(userId !== undefined){
        setUserSocketId(userId, socket.id);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);
        deleteUserSocketId(userId);
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

});


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

