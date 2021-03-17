const http = require("http");

http.createServer((request, response) => {
    response.end("Bem vindo ao meu site")
}).listen(8181);

console.log("My server is running!")