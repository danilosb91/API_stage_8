const { Router } = require("express");

const UserController = require("../Controllers/UserController");
const ensureAuthenticated = require("../middlewares/middleware");

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);

module.exports = userRoutes;
