class LogController {
    //[GET] /
    interface(req, res, next) {
        res.render('log', {
            title: "Login/Register",
        });
    }
}

module.exports = new LogController();