const Sequelize = require('sequelize');
const connection = require('../database/database');
// Mudar atributos do usuario, incluir mais atributos
// Colocar validação de email
// trabalhar com foto de perfil

const  User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
         type: Sequelize.STRING,
         allowNull: false
     }
});

// User.sync({force: true});

module.exports = User;