const express = require("express");
const { sendNotification } = require("../controllers/notificationController");
const router = express.Router();

router.route("/send").post(sendNotification);

module.exports = router;
