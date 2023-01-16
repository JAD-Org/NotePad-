import { Router } from "express";
import controller from "../controllers/noteController.js";

const router = Router();

router.get("/", controller.listNotes);
router.post("/", controller.saveNote);
router.delete("/:id", controller.deleteNote);
router.put("/:id", controller.updateNote);

export default router;
