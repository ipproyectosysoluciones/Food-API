const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://pixabay.com/photos/food-breakfast-dish-meal-toast-5981232/',
      validate: {
        isUrl: true,
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    steps: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },{ 
    timestamp: false,
  });
};
