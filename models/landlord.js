const { DataTypes } = require('sequelize');
const db = require("../db");

const Landlord = db.define("landlord", {            
    // ID:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // UserID:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    propertyManagement:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = Landlord   