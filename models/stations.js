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
      });
      this.hasMany(Trips, { foreignKey: "toStation", as: "toStation_Info" });
    }
  }
  Stations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 100],
            msg: "Tên bến xe phải từ 5-100 ký tự",
          },
          notEmpty: true,
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
