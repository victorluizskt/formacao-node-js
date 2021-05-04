const express = require("express");
const router = express.Router();
const User = require("./User");
const bcryptjs = require("bcryptjs");

router.get("/admin/users", (request, response) => {
    response.send("Listagem de usuários")
});

router.get("/admin/users/create", (request, response) => {
    response.render("admin/users/create");
});

router.post("/users/create", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    // hash para salvamento de senhas.
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    User.create({
        email: email,
        password: hash
    }).then(() => response.redirect("/")).catch((err) => response.redirect("/err"));
});

module.exports = router;