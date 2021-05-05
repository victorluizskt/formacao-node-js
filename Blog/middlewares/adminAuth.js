function adminAuth(request, response, next){
    if(request.session.user != undefined){
        // se não der o next a requisição fica presa no middleware
        next();
    } else {
        response.redirect("/login");
    }
}

module.exports = adminAuth;