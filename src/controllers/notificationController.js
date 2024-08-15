const sendEmail = require("../utils/email");

exports.sendNotification = async (req, res) => {
  const { email, subject, message, html } = req.body;
  try {
    await sendEmail({ to: email, subject, text: message, html });
    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to send notification" });
  }
};
