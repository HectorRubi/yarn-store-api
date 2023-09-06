'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'recovery_token', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      field: 'recovery_token',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'recovery_token');
  },
};
