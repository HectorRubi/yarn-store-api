const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';
const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'update_at',
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
