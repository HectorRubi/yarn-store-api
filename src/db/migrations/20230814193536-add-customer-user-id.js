'use strict';
const {
  CUSTOMER_TABLE,
  CustomerSchema,
} = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const table = await queryInterface.describeTable(CUSTOMER_TABLE);
    if (!table.user_id) {
      await queryInterface.addColumn(
        CUSTOMER_TABLE,
        'user_id',
        CustomerSchema.userId,
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  },
};
