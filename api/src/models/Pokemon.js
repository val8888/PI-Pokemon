const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('pokemon', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
};
