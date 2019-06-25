const express = require("express");
const knex = require("../db/client");
const router = express.Router();
router.get("/index", (request, response) => {
        response.redirect("/");
});

router.get("/new", (request, response) => {
    response.render("./posts/new");
});

router.post("/", (request, response) => {
    knex("posts")
      .insert({
        title: request.body.title,
        imageUrl: request.body.imageUrl,
        content: request.body.content,
        username: request.cookies.username
      })
      .returning("*")
      .then(posts => {
        const [post] = posts;
        response.redirect(`/posts/`);
      });
  });

  router.get("/", (request, response) => {
    knex("posts")
      .orderBy("created_at", "desc")
      .then(posts => {
        response.render("posts/index", { posts: posts });
      });
  });
  

  

module.exports = router;