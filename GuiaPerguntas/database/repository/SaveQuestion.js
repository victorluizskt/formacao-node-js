const Question = require('../models/Question');

function SaveQuestion (request, response) {
    const name = request.body.name;
    const title = request.body.title;
    const description = request.body.description;

    Question.create({
        name: name,
        title: title,
        description: description
    }).then(() => {
        response.redirect('/');
    });
}

module.exports = SaveQuestion