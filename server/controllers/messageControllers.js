const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  // 1. chatId: on which chat user supposed to send  the message
  // 2. the actual message itself
  // 3. who is the sender of the message
  const { content, chatId } = req.body;
  // if content or chatId doesn't exist
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // take them from Models folder (messageModel schema)
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    // Message come from messageModel( imported Message)
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");

    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Chat comes form ChatModel, update chatId and also update latest message.
    // import Chat from ChatModel
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// fetch all the messages for one single chat
const allMessages = asyncHandler(async (req, res) => {
  // fetch all the messages for one particular chat
  try {
    // from messageRoutes
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    // send the messages
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { sendMessage, allMessages };
