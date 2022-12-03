const express = require("express");
const route = express.Router();

const logController = require('../app/controllers/LogController');

route.get("/", logController.interface);

module.exports = route;

