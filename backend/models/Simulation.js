var connection = require("../db/dbConnection");
var sequelize = require("./index");
const { DataTypes, Model } = require("sequelize");

class Simulation extends Model {}

Simulation.init(
  {
    sequentialId: {
      type: DataTypes.INTEGER,
    },
    createdDatetime: { type: DataTypes.DATE, field: "created_datetime" },
    endDatetime: { type: DataTypes.DATE, field: "end_datetime" },
    finishedPercentage: {
      type: DataTypes.INTEGER,
      field: "finished_percentage",
    },
    inputDataUrl: { type: DataTypes.STRING, field: "input_data_url" },
    outputDataUrl: { type: DataTypes.STRING, field: "output_data_url" },
    owner: { type: DataTypes.INTEGER },
    simulationBatchId: {
      type: DataTypes.INTEGER,
      field: "simulation_batch_id",
    },
    start_datetime: { type: DataTypes.DATE },
    status: { type: DataTypes.INTEGER, field: "status_simulation_id" },
  },
  {
    sequelize,
    modelName: "simulation",
    tableName: "simulation",
    timestamps: false,
  }
);

module.exports = Simulation;
