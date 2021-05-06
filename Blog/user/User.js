const Sequelize = require('sequelize');
const connection = require('../database/database');


const  User = connection.define('users', {
    profile_pic: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
         type: Sequelize.STRING,
         allowNull: false
     }
});

//User.sync({force: true});

module.exports = User;