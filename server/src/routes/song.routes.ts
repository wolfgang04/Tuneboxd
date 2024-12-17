import { Router } from "express";
import { getLikedSongs, likeSong, unlikeSong } from "../controllers/song.controller";

const router = Router();

router.post("/like", likeSong);
router.post("/unlike", unlikeSong);
router.get("/likes", getLikedSongs); 

export default router;
