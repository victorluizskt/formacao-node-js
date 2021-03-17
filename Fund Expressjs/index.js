const express = require("express")
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3333, (erro) => {
    if(erro){
        console.log("Err"+ erro);
    };

    console.log("Server is running port http://localhost:3333!");
});