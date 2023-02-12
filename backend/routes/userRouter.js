import { Router } from "express";
import controller from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", controller.login);
router.post("/logout", isAuthenticated, controller.logout);
router.post("/create", controller.createUser);

export default router;
