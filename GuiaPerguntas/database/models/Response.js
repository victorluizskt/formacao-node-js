const Sequelize = require('sequelize');
const connection = require('../database');

const Response = connection.define("response", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Response.sync({force: false});

module.exports = Response;