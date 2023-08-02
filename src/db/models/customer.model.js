const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    field: 'create_at',
    type: DataTypes.DATE,
    default: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    field: 'update_at',
    type: DataTypes.DATE,
    default: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
