const { Router } = require("express");

const userRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const sessionsRoutes = require("./sessions.routes");
const tagsRoutes = require("./tags.routes");



const routes = Router();

routes.use("/sessions", sessionsRoutes);
routes.use("/users", userRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);




module.exports = routes;
