const express = require('express');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

connection.authenticate().then(() => {
    console.log('Connection success.');
}).catch((err) => {
    console.log(err);
});

// A view engine que quero utilizar é a EJS.
app.set('view engine', 'ejs');

// Arquivos estáticos.
app.use(express.static('public'));

// Configuração do body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(router);

app.listen(8080, () => {
    console.log('Application running in the port htttp://localhost:8080.')
})