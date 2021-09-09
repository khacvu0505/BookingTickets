"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PassengerCarCompanies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trips, Vehicles }) {
      // define association here
      // Ralation to Trips
      this.belongsTo(Trips);
      // Relation to Vehicles
      this.hasMany(Vehicles, { onDelete: "CASCADE" });
    }
  }
  PassengerCarCompanies.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PassengerCarCompanies",
    }
  );
  return PassengerCarCompanies;
};
