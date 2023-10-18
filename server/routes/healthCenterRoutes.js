const express = require("express");
const router = express.Router("router");
const healthCenterController = require("../controllers/HealthCenterController");
const autMiddleware = require("../middlewares/authMiddleware");

/* router.get("/search", healthCenterController.searchHealthCenters); */
router.get("/", healthCenterController.searchHealthCenters);

router.get("/:id", healthCenterController.getHealtCenterData);

router.use(autMiddleware);

router.post("/", healthCenterController.addHealthCenter);

router.patch("/:id", healthCenterController.updateHealthCenter);
router.delete("/:id", healthCenterController.deleteHealthCenter);

module.exports = router;
