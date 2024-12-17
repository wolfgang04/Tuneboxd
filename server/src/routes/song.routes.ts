import { Router } from "express";
import { getLikedSongs, isLiked, likeSong, unlikeSong } from "../controllers/song.controller";

const router = Router();

router.post("/like", likeSong);
router.post("/unlike", unlikeSong);
router.get("/likes", getLikedSongs); 
router.post("/isLiked", isLiked);

export default router;
