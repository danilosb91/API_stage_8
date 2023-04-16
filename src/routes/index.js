const { Router } = require("express");

const userRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const sessionsRoutes = require("./sessions.routes");



const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", userRoutes);
routes.use("/notes", notesRoutes);




module.exports = routes;
