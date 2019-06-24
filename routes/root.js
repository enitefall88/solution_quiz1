const express = require("express");
const knex = require("../db/client");
const router = express.Router();

router.get("/sign_in", (request, response) => {

    const username = request.query.username;

    response.render("signIn",{
        username: username,
    });
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/sign_in", (request, response) => {

    const username = request.body.username;
    response.cookie("username", username, { maxAge: COOKIE_MAX_AGE});

    response.redirect("/posts");
});

//router.get("/loged_in",(request, response) => {
//    response.render("logedIn");
//});

router.post("/sign_out", (request, response) => {
    response.clearCookie("username");
    response.redirect("/");
});

router.get("/", (request, response) => {
    response.redirect("/posts");
});

module.exports = router;