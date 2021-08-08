"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stations, Users, Tickets, PassengerCarCompanies }) {
      // define association here
      this.belongsTo(Stations, {
        foreignKey: "fromStation",
        as: "fromStation_Info",
      });
      this.belongsTo(Stations, {
        foreignKey: "toStation",
        as: "toStation_Info",
      });

      // Many to Main()Ralation to Tickets
      this.belongsToMany(Users, { through: Tickets, as: "ticket_info" });
      this.hasMany(Tickets);
      // Ralation to PassengerCarComponies
      this.hasMany(PassengerCarCompanies);
    }
  }
  Trips.init(
    {
      startTime: DataTypes.DATE,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trips",
    }
  );
  return Trips;
};
