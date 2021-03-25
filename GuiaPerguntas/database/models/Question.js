const Sequelize = require('sequelize');
const connection = require('../database');


const Question = connection.define('question', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    } , 
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {
    console.log('table create');
});

module.exports = Question;