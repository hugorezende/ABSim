var express = require("express");
var router = express.Router();
var auth = require("../auth/auth");
const MQService = require("../core/MQService/MQService");
const Simulation = require("../models/Simulation");
const User = require("../models/User");

/* POST create simulation. */
router.post(
  "/create",
  auth.verifyJWT,
  async function (req, httpResponse, next) {
    const userId = req.userId;

    // Get last sequentialId from current user simulation list
    const lastId = await Simulation.findOne({
      where: {
        owner: req.userId,
      },
      order: [["sequentialId", "DESC"]],
    });

    Simulation.create({
      createdDatetime: new Date(),
      owner: userId,
      status: 1,
      sequentialId: lastId ? lastId.sequentialId + 1 : 1,
    })
      .then((response) => {
        const simulationId = response.getDataValue("id");
        MQService.publishSimulation({
          simulationId: simulationId,
          payload: { lorem: "lorem" },
        });
        return httpResponse.status(200).send({
          message: "Simulation created",
        });
      })
      .catch((error) => {
        console.error(error);
        return httpResponse.status(500).send({
          message: "Error",
        });
      });
  }
);

/* GET list of Simulations of user */
router.get("/list", auth.verifyJWT, function (req, httpResponse, next) {
  Simulation.findAll({
    where: {
      owner: req.userId,
    },
    order: [["createdDatetime", "DESC"]],
  })
    .then((response) => {
      return httpResponse.status(200).send({ simulations: response });
    })
    .catch((error) => {
      console.error(error);
      return httpResponse.status(500).send({
        message: "Error",
      });
    });
});

/* UPDATE list of Simulations of user */
router.put(
  "/:simulationId",
  auth.verifyJWT,
  checkSimulationAccess,
  function (req, httpResponse, next) {
    Simulation.update(
      {
        finishedPercentage: req.body.finishedPercentage,
        status: req.body.status,
      },
      {
        where: { id: parseInt(req.params.simulationId) },
      }
    )

      .then((response) => {
        return httpResponse.status(200).send({ response });
      })
      .catch((error) => {
        console.error(error);
        return httpResponse.status(500).send({
          message: error,
        });
      });
  }
);

async function checkSimulationAccess(req, res, next) {
  const userId = req.userId;
  const simulationId = req.params.simulationId;

  // Check if user is role ADMIN
  const currentUser = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (currentUser.getDataValue("role") === 1) {
    return next();
  }

  Simulation.findOne({
    where: {
      owner: userId,
      id: simulationId,
    },
  })
    .then((responseQuery) => {
      // If ownerId is same as userId of this simulation
      if (responseQuery) {
        next();
      } else {
        res.status(403).send({ error: "Forbiden" });
      }
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = router;
