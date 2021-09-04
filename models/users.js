"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Tickets }) {
      // define association here
      this.belongsToMany(Users, { through: Tickets, as: "ticket_info" });
      // Many to Main
      this.hasMany(Tickets);
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      numberPhone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
