const CryptoJS = require("crypto-js");
const hashLength = 64;

const userM = require('../../config/db');
const { randomInt } = require('crypto');

class LogController {
    //[GET] /
    interface(req, res, next) {
        res.render('log', {
            title: "Login/Register",
        });
    }

    //[POST /register
    async register(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const uDb = await userM.SearchUserByUsername(username);
            const pwDb = uDb.password;
            const salt = pwDb.slice(hashLength);
            const pwSalt = password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);

            if (pwDb === (pwHashed + salt)) {
                req.session.uid = uDb.password;
                res.redirect('/home');
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
    async login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const uDb = await userM.SearchUserByUsername(username);
            res.render("register", {
                notification: "Tài khoản này đã tồn tại!",
            })
        }
        catch (err) {
            try {
                const salt = Date.now().toString(16);
                const pwSalt = password + salt;
                const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
                const u = {
                    username: username,
                    password: pwHashed + salt
                }
                const create = await userM.addUser(u);
                res.render("register", {
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