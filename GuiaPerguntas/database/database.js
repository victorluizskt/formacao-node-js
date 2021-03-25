const Sequelize = require('sequelize');

// Conexão com o banco de dados, Sequeliza(param1 -> banco de dados, param2 -> usuario do bd,
// param3 -> password, param4 -> {host:localhost, dialect: mysql})

// Antes de executar, precisamos rodar o seguinte codigo no bd para que n ocorra erro
// de senhas relacionadas a criptografia do mysql: ALTER USER 'root'@'localhost' IDENTIFIED mysql_native_password BY '123456'


const connection = new Sequelize('guiaperguntas', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;