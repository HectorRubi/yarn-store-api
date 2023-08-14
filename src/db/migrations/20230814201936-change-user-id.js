'use strict';
const { CUSTOMER_TABLE } = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint(CUSTOMER_TABLE, {
      type: 'unique',
      fields: ['user_id'],
      name: 'customers_user_id_uk',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      CUSTOMER_TABLE,
      'customers_user_id_uk',
    );
  },
};
