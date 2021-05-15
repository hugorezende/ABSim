var sequelize = require("./index");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.NUMBER,
    },
    role: {
      type: DataTypes.NUMBER,
      field: "role_id",
    },
    avatarURL: {
      type: DataTypes.STRING,
      field: "avatar_URL",
    },
  },
  { sequelize, tableName: "user", timestamps: false }
);

module.exports = User;
