const Response = require('../models/Response');

function response (request, response) {
    const name = request.body.name;
    const corpo = request.body.corpo;
    const question = request.body.question;
    Response.create({
        name: name,
        corpo: corpo,
        questionId: question
    }).then(() => {
        response.redirect(`/question/${question}`);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = response;