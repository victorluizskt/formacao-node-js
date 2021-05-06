const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
     slug: {
         type: Sequelize.STRING,
         allowNull: false
     },
     // Mudar para text, para que o banco de dados aceite valores maiores de texto e não 256
     body: {
         type: Sequelize.STRING,
         allowNull: false,
     }
});

Category.hasMany(Article); // Uma categoria tem muitos artigos.
Article.belongsTo(Category); // Um artigo pertence a uma categoria.

// Article.sync({force: true});

module.exports = Article;