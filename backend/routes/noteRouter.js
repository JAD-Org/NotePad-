import { Router } from "express";
import controller from "../controllers/noteController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", isAuthenticated, controller.listNotes);
router.post("/", isAuthenticated, controller.saveNote);
router.delete("/:id", isAuthenticated, controller.deleteNote);
router.put("/:id", isAuthenticated, controller.updateNote);

export default router;
