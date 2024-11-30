import { Router } from "express";
import {
	follow,
	getFollowers,
	getFollowing,
	getFollowStatus,
} from "../controllers/follow.controller";

const router = Router();

router.post("/follow", follow);
router.get("/status", getFollowStatus);
router.get("/getFollowers", getFollowers);
router.get("/getFollowing", getFollowing);

export default router;
