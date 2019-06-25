//requiring needed packages
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require ("method-override"); 

const app = express();
app.set("view engine", "ejs"); //start ejs


//middleware
app.use(logger("dev")); //logger
app.use(express.static(path.join(__dirname, "public")));// static Assets
app.use(express.urlencoded({extended: true})); // URL Encoded
app.use(cookieParser()); //cookie parser

app.use( //override
    methodOverride((request, response) => {
      if (request.body && request.body._method) {
        const method = request.body._method;
        return method;
      }
    })
  );

  app.use((request, response, next) => {
    console.log("Cookies:", request.cookies);
    const username = request.cookies.username;
    response.locals.username = "";

    if (username) {
        response.locals.username = username;
        console.log(`Signed in as ${username}`);
    }
    next();
});  

//// Custom Middleware for cookies
// Making the usernames globally accessible in our views as "username"
app.use((request, response, next) => {
    console.log("Cookies:", request.cookies);
    const username = request.cookies.username;
    response.locals.username = "";

    if (username) {
        response.locals.username = username;
        console.log(`Signed in as ${username}`);
    }
    next();
});

//routes
const postsRouter = require("./routes/posts");
const rootRouter = require("./routes/root");


app.use("/posts", postsRouter);
app.use("/", rootRouter);

// server setup
const PORT = 7777;
const HOST = "localhost";
app.listen(PORT, HOST, () => {

console.log(`Server is running. Listening on http://${HOST}:${PORT}`);
});