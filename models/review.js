const {DataTypes} = require("sequelize");    
const db = require("../db");

const Review = db.define("review", {            
    ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LandlordID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PropertyAddress:{
        type: DataTypes.STRING,
        allowNull: true
    },
    // PropertyManagement:{
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    Comment:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Rent:{
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Review   