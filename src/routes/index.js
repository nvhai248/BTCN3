const logRoute = require('./logRoute');
const homeRoute = require('./homeRoute');

function routes(app) {
    app.use("/home", homeRoute);
    app.use("/", logRoute);
}

module.exports = routes;