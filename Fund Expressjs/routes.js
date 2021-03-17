const express = require('express');
const router = express.Router();
/*
    request.query, parâmetros opcionais => /main?email=victorluizcefet@gmail.com
*/
router.get('/main', (request, response) => {
    const email = request.query["email"];
    return response.json({dado: `success ${email}`})
});

/*  
    param obrigatorio, para o paramêtro ser opcional colocamos uma interrogação.
    ex: /server/:name? 
*/
router.get('/server/:name', (request, response) => {
    console.log(request.params.name);
    return response.json({dado: `success ${request.params.name}`});
});


module.exports = router;