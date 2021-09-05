"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // Hàm này sẽ chịu trách nhiệm liên kết các bảng lại với nhau
    static associate({ Trips }) {
      // define association here
      this.hasMany(Trips, {
        foreignKey: "fromStation",
        as: "fromStation_Info",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.hasMany(Trips, {
        foreignKey: "toStation",
        as: "toStation_Info",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Stations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: false,
            msg: "Name Station not null",
          },
          len: {
            args: [5, 100],
            msg: "Name Station has length 5-100 characters ",
          },
        },
      },
      address: DataTypes.STRING,
      province: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Stations",
    }
  );
  return Stations;
};
