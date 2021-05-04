const express = require("express");
const router = express.Router();
const User = require("./User");
const bcryptjs = require("bcryptjs");

// fazer edição de users também
router.get("/admin/users", (request, response) => {
    User.findAll().then(users => {
        response.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", (request, response) => {
    response.render("admin/users/create");
});

router.post("/users/create", (request, response) => {
    // fazer validações e etc
    const email = request.body.email;
    const password = request.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined){
             // hash para salvamento de senhas.
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => response.redirect("/")).catch((err) => response.redirect("/err"));
        } else {
            // colocar uma ideia de email já existente.
            response.redirect("/admin/users/create")
        }
    })

   
});

module.exports = router;