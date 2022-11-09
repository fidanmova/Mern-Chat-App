const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// for sending the messages
router.route("/").post(protect, sendMessage);
// // fetch all the messages for one single chat
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
