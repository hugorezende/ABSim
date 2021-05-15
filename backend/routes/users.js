var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET Simulation list
router.get("/simulations/:userId/", (req, res, next) => {});
// GET Simulation Details
router.get("/simulation/:simulationId/", (req, res, next) => {});
// DELETE Simulation
router.delete("/simulation/:simulationId/", (req, res, next) => {});
// POST Simulation
router.post("/simulation/", (req, res, next) => {});

module.exports = router;
