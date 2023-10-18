const express = require("express");
const router = express.Router("router");
const usersController = require("../controllers/UsersController");
const autMiddleware = require("../middlewares/authMiddleware");
const checkAuthorization = require("../middlewares/checkUserAuth");

router.post("/signup", usersController.signupUser);
router.post("/login", usersController.loginUser);
router.use(autMiddleware);

router.patch("/:id", checkAuthorization, usersController.updateUserProfile);
router.patch(
  "/:id/password",
  checkAuthorization,
  usersController.updateUserPassword
);

router.delete("/:id", checkAuthorization, usersController.deleteUser);
router.get("/", usersController.getAllUsers);
router.get("/:id", checkAuthorization, usersController.getUserProfile);

module.exports = router;
