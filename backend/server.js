const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require("dotenv");
// const connectDB = require("./config/db");
dotenv.config();
const PORT = process.env.PORT || 5002;
const mongoose = require("mongoose");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// Connect to the DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`My Database is connected...`.cyan.underline);
  })
  .catch((error) =>
    console.log("Database is not connected".red.underline, error)
  );

// Routing
app.get("/", (req, res) => {
  res.send("API is running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// For sending messages
app.use("/api/message", messageRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// Non existing pages
app.use(notFound);
app.use(errorHandler);

// setup Socket.io
const server = app.listen(
  PORT,
  console.log(`Server is running on Port ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// create connection to socket io
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  //  for user connecting their own socket. Take userData from frontend
  socket.on("setup", (userData) => {
    // create new room with the id of the new user, and that room will be exclusive that user only
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
    // got to frontend SingleChat fetchMessages func
  });
  // for typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // send message notification
  socket.on("new message", (newMessageReceived) => {
    // check which chat it belongs
    // console.log("Incoming Message", newMessageReceived);
    let chat = newMessageReceived.chat;

    // is that chat hasn't have a user than return
    if (!chat.users) return console.log("chat.users not defined");

    // if there is 5 ppl in the chat room, when u send message make sure 4 ppl receive it but not you
    console.log("Users: ", chat.users);
    chat.users.forEach((user) => {
      // dont send t myself
      if (user._id != newMessageReceived.sender._id) {
        socket.to(user._id).emit("message received", newMessageReceived);
      }

      // socket.in(user._id).emit("message received", newMessageReceived);

      // to check newMessageReceived object belongs which chat (current active or not), we do it on frontend. SingleChat create another useEffect under selectedChat
    });
  });

  // clean up the socket after closing, otherwise it's gonna consume lots of bandwidth
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
