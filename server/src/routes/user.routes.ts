import { Router } from "express";
import { login, logout, signup, status } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/status", status);

export default router;
