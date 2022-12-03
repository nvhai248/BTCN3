const logRoute = require('./logRoute');

function routes(app) {
    app.use("/", logRoute);
}

module.exports = routes;