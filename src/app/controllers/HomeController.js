class LogController {
    //[GET] /
    interface(req, res, next) {
        res.render('home', {
            title: "Homepage",
        });
    }
}

module.exports = new LogController();