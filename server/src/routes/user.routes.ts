import { Router } from "express";
import {
	changeCreds,
	fetchUserDetails,
	forgotPassword,
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
router.get("/details", fetchUserDetails);
router.post("/resetPassword", forgotPassword);

export default router;
