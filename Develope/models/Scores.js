const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Scores extends Model {}

Scores.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    correct_answers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },    
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'scores',
  }
);

module.exports = Scores;
