"use strict";

var express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

var router = express.Router();

router.use(
  cors({
    origin: [`${process.env.FRONT_URL}`, "http://localhost:3000"],
    credentials: true,
  })
);

router.use(cookieParser());

var jwt = require("jsonwebtoken");
var auth = require("../auth/auth");

var producer = require("../producer/producer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST New Simulation. */
// router.post("/simulation/new", auth.verifyJWT, function (req, res, next) {
//   let payload = req.body;
//   //TO-DO: validate payload
//   producer
//     .createSimulation(payload)
//     .then(function () {
//       res.sendStatus(200);
//     })
//     .catch(function (e) {
//       console.log(e);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
