const CryptoJS = require("crypto-js");
const hashLength = 64;

const userM = require('../../config/db');
const { randomInt } = require('crypto');

class LogController {
    //[GET] /
    interface(req, res, next) {
        if (!req.session.uid) {
            return res.render('log', {
                title: "Login/Register",
            });
        }
        res.redirect(`/home/${req.session.uid}`);
    }

    //[POST /register
    async login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const uDb = await userM.SearchUserByUsername(username);
            const pwDb = uDb.password;
            const salt = pwDb.slice(hashLength);
            const pwSalt = password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);

            if (pwDb === (pwHashed + salt)) {
                req.session.uid = uDb.id;
                res.redirect(`/home/${uDb.id}`);
            }
            else {
                return res.render("log", {
                    notification: "Nhập sai mật khẩu!",
                })
            }
        }
        catch (err) {
            return res.render("log", {
                notification: "Nhập sai tài khoản!",
            })
            //next(err);
        }
    }

    //[POST /login
    async register(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const uDb = await userM.SearchUserByUsername(username);
            res.render("log", {
                notification: "Tài khoản này đã tồn tại!",
            })
        }
        catch (err) {
            try {
                let count = await userM.getNumberOfUsers();
                console.log(count);
                const salt = Date.now().toString(16);
                const pwSalt = password + salt;
                const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
                const u = {
                    id: parseInt(count.count++),
                    username: username,
                    password: pwHashed + salt
                }
                const create = await userM.addUser(u);
                res.render("log", {
                    notification: "Đăng ký thành công, vui lòng đăng nhập!",
                })
            }
            catch (err) {
                next(err);
            }
        }

    }
}

module.exports = new LogController();