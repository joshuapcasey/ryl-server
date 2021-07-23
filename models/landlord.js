const { DataTypes } = require('sequelize');
const db = require("../db");

const Landlord = db.define("landlord", {            
    ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PropertyManagement:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = Landlord   