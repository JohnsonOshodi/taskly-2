const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  addComment,
  getComments,
  uploadAttachment
} = require("../controllers/taskController");
const router = express.Router();

router.route("/boards/:boardId/tasks").get(getTasks).post(createTask);
router.route("/tasks/:id").get(getTask).put(updateTask).delete(deleteTask);
router.route("/tasks/:id/assign").put(assignTask);
router.route("/tasks/:id/comments").post(addComment).get(getComments);
router.route("/tasks/:id/attachments").post(uploadAttachment);

module.exports = router;
