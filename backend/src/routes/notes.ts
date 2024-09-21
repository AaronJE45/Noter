import express from "express";
import * as notesController from "../controllers/notes";

const router = express.Router();

router.get("/", notesController.getNotes);

router.post("/", notesController.createNotes);

router.get("/:noteID", notesController.getNote);

router.patch("/:noteID", notesController.updateNote);

export default router;
