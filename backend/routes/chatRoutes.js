const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
// // rename particular group
router.route("/rename").put(protect, renameGroup);
// // remove someone from group or leave the group
router.route("/groupRemove").put(protect, removeFromGroup);
// // add someone to group
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
