const express = require("express");
const route = express.Router();

const homeController = require('../app/controllers/HomeController');

route.get("/:id", homeController.interface);

module.exports = route;

