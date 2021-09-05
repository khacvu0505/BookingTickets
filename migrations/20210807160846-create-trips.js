"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      fromStation: {
        type: Sequelize.INTEGER,
        //***  Định nghĩa khóa phụ
        references: {
          // model: Tên bảng trong sql
          model: "Stations",
          // key chỗ này là key liên kết trong mysql
          key: "id",
        },
        onDelete: "CASCADE",
      },
      toStation: {
        type: Sequelize.INTEGER,
        references: {
          // model: Tên bảng trong sql
          model: "Stations",
          // key chỗ này là key liên kết trong mysql
          key: "id",
        },
        onDelete: "CASCADE",
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trips");
  },
};
