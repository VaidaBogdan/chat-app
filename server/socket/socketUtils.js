let io = null;
const userSocketMap = {};

function setIO(ioInstance) {
    io = ioInstance;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.IO instance not set");
    }
    return io;
}

function setUserSocketId(userId, socketId) {
    userSocketMap[userId] = socketId;
}

function getReceiverSocketId(receiverId) {
    return userSocketMap[receiverId];
}

function deleteUserSocketId(userId) {
    delete userSocketMap[userId];
}

module.exports = { setIO, getIO, setUserSocketId, getReceiverSocketId, deleteUserSocketId, userSocketMap };