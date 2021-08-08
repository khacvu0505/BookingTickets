"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trips, Users }) {
      // define association here
      // Đây là bảng được tạo ra từ n-n
      this.belongsTo(Trips);
      this.belongsTo(Users);
    }
  }
  Tickets.init(
    {},
    {
      sequelize,
      modelName: "Tickets",
    }
  );
  return Tickets;
};
