const { DataTypes } = require('sequelize');
const db = require('../lib/db');
const account = require('./account');

const user = db.define(
  'user',
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
      allowNull: true,
      field: 'name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
    roleType: {
      type: DataTypes.ENUM('ACCOUNT_OWNER', 'ACCOUNT_ADMIN', 'APPLICATION_USER'),
      allowNull: false,
      field: 'role_type',
      defaultValue: 'APPLICATION_USER',
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
    tableName: 'users',
  }
);

user.belongsTo(account, { foreignKey: 'accountId' });

module.exports = user;
