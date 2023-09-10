const express = require("express");
const router = express.Router("router");
const rating = require("../controllers/RatingController");
const autMiddleware = require("../middleware/authMiddleware");

router.get("/:id", rating.getRatingsByHealthCenter);
router.use(autMiddleware);

router.post("/", rating.addRating);
router.delete("/:id", rating.deleteRating);
router.get("/user/:id", rating.getRatingsByUser);

module.exports = router;
