const {DataTypes} = require("sequelize");    
const db = require("../db");

const User = db.define("user", {            
    // id: {
    //     type: DataTypes.UUID,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4,
    //     allowNull: false,
    // },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {                               
        type: DataTypes.STRING,       
        allowNull: false,                   
        unique: true,                      
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
});

module.exports = User   