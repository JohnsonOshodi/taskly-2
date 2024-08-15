const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

router.post("/organizations", organizationController.createOrganization);
router.post(
  "/:organizationId/addUser",

  organizationController.addUserToOrganization
);

module.exports = router;
