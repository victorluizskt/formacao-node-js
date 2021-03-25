const Question = require('../models/Question');

function Index (request, response) {
    Question.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then(questions => {
        response.render("index", {
            questions: questions,
        })
    });
}

module.exports = Index;