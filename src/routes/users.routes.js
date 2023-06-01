const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../Controllers/UserController");
const UserAvatarController = require("../Controllers/UserAvatarController");

const ensureAuthenticated = require("../middlewares/middleware");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes;
