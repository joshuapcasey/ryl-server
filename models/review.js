const {DataTypes} = require("sequelize");    
const db = require("../db");

const Review = db.define("review", {            

    // UserID:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    landlordID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    propertyAddress:{
        type: DataTypes.STRING,
        allowNull: true
    },
    // propertyManagement:{
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    comment:{
        type: DataTypes.STRING,
        allowNull: true
    },
    rent:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reviewerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Review   