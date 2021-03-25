const Response = require('../models/Response');
const Question = require('../models/Question');

function Questions (request, response) {
    const id = request.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){

            Response.findAll({
                where: {questionId: question.id},
                order: [ ['id', 'DESC'] ]
            }).then(responses => {
                response.render("question", {
                    question: question,
                    responses: responses
                });
            });

            
        } else {
            response.render("error");
        }
    });
}

module.exports = Questions;