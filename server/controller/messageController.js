const { getIO, getReceiverSocketId } = require('../socket/socketUtils');
const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");

module.exports.sendMessage = async(req, res) =>{

    try{
        const { message } = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            content:message,
        })

        if(newMessage){
            conversation.messages.push(newMessage)
        }else {
            res.status(400).json({error: "Message data error"});
        }

        await newMessage.save()
        await conversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            const ioInstance = getIO();
            ioInstance.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)


    }
    catch(error){
        console.log("Error in messageController at sendMessage method", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports.getMessages = async (req, res) =>{
    try{

        const {id: receiverId} = req.params
        const senderId = req.user._id

        const convo = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        }).populate("messages")

        if(!convo){
            return res.status(200).json([])  
        }
        res.status(200).json(convo.messages)
    }
    catch(error){
        console.log("Error in messageController at getMessages method", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}