const express = require("express");
const router = express.Router("router");
const usersController = require("../controllers/UsersController");
const autMiddleware = require("../middleware/authMiddleware");

router.post("/signup", usersController.signupUser);
router.post("/login", usersController.loginUser);
router.use(autMiddleware);
router.patch("/:id", usersController.updateUserProfile);
router.patch("/:id/changepassword", usersController.updateUserPassword);
router.delete("/:id", usersController.deleteUser);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserProfile);

module.exports = router;
