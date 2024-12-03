import { Router } from "express";
import {
	changeCreds,
	login,
	logout,
	signup,
	status,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/status", status);
router.post("/changeCreds", changeCreds);

export default router;
