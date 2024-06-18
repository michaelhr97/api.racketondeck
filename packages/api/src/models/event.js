import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';

const event = dbPostgres.define(
  'event',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'application',
        key: 'id',
        onDelete: 'CASCADE',
      },
      field: 'application_id',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'location',
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      field: 'enabled',
    },
  },
  {
    timestamps: true,
    tableName: 'events',
  },
);

export default event;
