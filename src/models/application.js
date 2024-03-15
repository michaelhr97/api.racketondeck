const { DataTypes } = require('sequelize');
const db = require('../lib/db');
const account = require('./account');

const application = db.define(
  'application',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
    accountId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: account,
        key: 'id',
      },
      field: 'account_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'description',
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'logo',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'enabled',
    },
  },
  {
    timestamps: true,
    underscored: false,
    tableName: 'applications',
  }
);

application.belongsTo(account, { foreignKey: 'accountId' });

module.exports = application;
