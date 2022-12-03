const express = require("express");
const handlebars = require("express-handlebars").create({
    defaultLayout: "main",
    extname: ".hbs",
});
const path = require("path");
const routes = require("./routes");

const session = require('express-session');

// declare app
const app = express();
const port = 20468;

// setup resources for client
// all images,... are provided from the file "public"
app.use(express.static(path.join(__dirname, "public")));

//setup handlebars
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "view"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: "key that will sign cookies",
        resave: true,
        saveUninitialized: false,
        store: "",
    })
)

app.use(express.json());

routes(app);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
