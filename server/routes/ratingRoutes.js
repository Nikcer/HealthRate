const express = require("express");
const router = express.Router("router");
const rating = require("../controllers/RatingController");
const autMiddleware = require("../middlewares/authMiddleware");

router.get("/healtcenter/:id", rating.getRatingsByHealthCenter);

router.use(autMiddleware);
router.get("/user/:id", rating.getRatingsByUser);
router.post("/", rating.addRating);
router.delete("/:id", rating.deleteRating);

module.exports = router;
