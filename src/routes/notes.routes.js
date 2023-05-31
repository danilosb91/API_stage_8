const { Router } = require("express");

const NotesController = require("../Controllers/NoteController");
const ensureAuthenticated = require("../middlewares/middleware");

const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated);

const notesController = new NotesController();

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

module.exports = notesRoutes;
