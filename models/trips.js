"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
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
        // onDelete: "CASCADE",
        // hooks: true,
      });
      this.belongsTo(Stations, {
        foreignKey: "toStation",
        as: "toStation_Info",
        // onDelete: "CASCADE",
        // hooks: true,
      });

      // Many to Main()Ralation to Tickets
      this.belongsToMany(Users, {
        through: Tickets,
        as: "ticket_info",
      });
      this.hasMany(Tickets, { onDelete: "CASCADE" });
      // Ralation to PassengerCarComponies
      this.hasMany(PassengerCarCompanies, { onDelete: "CASCADE" });
    }
  }
  Trips.init(
    {
      startTime: {
        type: DataTypes.DATE,
        get: function () {
          let time = this.getDataValue("startTime");
          if (moment(time, moment.ISO_8601, true).isValid()) {
            return moment(this.getDataValue("startTime")).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          } else {
            return time;
          }
        },
      },
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Trips",
    }
  );
  return Trips;
};
