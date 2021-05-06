const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticlesController');
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const usersController = require("./user/UsersController");
const User = require("./user/User");
const session = require('express-session');
// adicionar middlewares no restante dos admins
// refatorar melhor o código para que assim, o mesmo fique bem organizado e de fácil entendimento
// nomes mais bacanas p as variaveis
// comentar cada trecho do codigo
// separar back e front end

// view engine
app.set('view engine', 'ejs');


//sessions
// redis -> muda o storage para outro banco, para que assim n estoure a memoria do server
app.use(session({
    // texto que o express session pede para aumentar a segurança das sessões, cooke: {maxAge: tempo de exp do cookie}
    secret: "siadbasudbasiuduasdfasuidyfasdpasdn", cookie: {maxAge: 30000000}
}));

// static
app.use(express.static('public'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// database
connection.authenticate().then(console.log('connection success')).catch(err => console.log(err));

// routes
app.use('/', categoriesController);
app.use('/', articleController);
app.use('/', usersController);

// Usando o session
// // dados sendo salvos na aplicação da minha sessão
// app.get('/session', (request, response) => {
//     request.session.treinamento = "Formação node.js";
//     request.session.ano = 2019;
//     request.session.email = "victorluiz@cefetmg.br";
//     response.send("Sessão gerada.")
// });

// // acessando os dados
// app.get('/read', (request, response) => {
//     return response.json({
//         treinamento: request.session.treinamento,
//         ano: request.session.ano,
//         email: request.session.email
//     });
// });

// rota principal limitando a quantidade de item por pagina, mudar futuramente p 4
app.get('/', (request, response) => {
    Article.findAll({order: [['id', 'DESC']], limit: 2}).then(articles => {
        Category.findAll().then(categories => {
            response.render('index', {articles: articles, categories: categories});
        })
    });
});

// rota principal q é usada para pegar o paramêtro p construir a url da pagina
app.get("/:slug", (request, response) => {
    const slug = request.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                response.render('article', {article: article, categories: categories});
            });
        } else {
            response.redirect("/");
        }
    }).catch(err => { response.redirect("/") });
});

// responsavel por mostrar uma categoria especifica
app.get("/category/:slug", (request, response) => {
    const slug = request.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                response.render('index', {articles: category.articles, categories: categories});
            })
        } else {
            response.redirect('/');
        }
    }).catch(err => {
        response.redirect('/');
    })
});

app.listen(8080, () => {
    console.log("Server is running localhost:8080");
});

/* 

yarn init
yarn add express --save
yarn add sequelize --save
yarn add mysql2 --save
yarn add sequelize --save
yarn add body-parser --save
yarn add ejs --save
https://www.tiny.cloud/get-tiny/self-hosted/

*/