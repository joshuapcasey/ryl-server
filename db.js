require('dotenv').config();   

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING ||
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/ryl`,
    {
        dialect: 'postgres',
    }
);

module.exports = sequelize;