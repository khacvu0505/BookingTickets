"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "stations",
      [
        {
          name: "Bến xe quy nhơn",
          address: "Thành phố Quy Nhơn",
          province: "Bình Định",
          createdAt: "2120-10-07 22:48:00",
          updatedAt: "2120-11-07 20:00:00",
        },
        {
          name: "Bến xe Phan Thiết",
          address: "Thành phố Phan Thiết",
          province: "Bình Thuận",
          createdAt: "2120-10-07 22:48:00",
          updatedAt: "2120-11-07 20:00:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
