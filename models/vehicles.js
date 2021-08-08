"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PassengerCarCompanies, Seats }) {
      // define association here
      // Relation to PassengerCarCompanies
      this.belongsTo(PassengerCarCompanies, {
        foreignKey: "passengerCarCompony_id",
      });
      // Relation to Seats
      this.hasMany(Seats, { foreignKey: "vehicle_id" });
    }
  }
  Vehicles.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicles",
    }
  );
  return Vehicles;
};
