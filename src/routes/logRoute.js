const express = require("express");
const route = express.Router();

const logController = require('../app/controllers/LogController');

route.post("/register", logController.register);
route.post("/login", logController.login);
route.get("/", logController.interface);

module.exports = route;

