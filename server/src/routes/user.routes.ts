import { Router } from "express";
import {
	changeCreds,
	fetchUserDetails,
	fetchUserEmail,
	fetchUserImage,
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
router.post("/details", fetchUserDetails);
router.get("/image", fetchUserImage);
router.post("/resetPassword", forgotPassword);
router.get("/userEmail", fetchUserEmail);

export default router;
