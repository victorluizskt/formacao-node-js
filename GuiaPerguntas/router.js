const express = require('express');
const router = express.Router();

const About = require('./database/repository/About');
const Responses = require('./database/repository/Response');
const Questions = require('./database/repository/Question');
const SaveQuestion = require('./database/repository/SaveQuestion');
const Index = require('./database/repository/Index');
const QuestionsPag = require('./database/repository/Questions');

router.get('/', Index);

router.get('/questions', QuestionsPag);

router.post('/savequestion', SaveQuestion);

router.get("/question/:id", Questions );

router.post("/response", Responses);

router.get('/about', About);

module.exports = router;

/*
    yarn init
    yarn add express --save
    yarn add ejs --save
    yarn add sequelize --save
    yarn add mysql2 --save
*/