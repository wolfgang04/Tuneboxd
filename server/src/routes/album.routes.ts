import { Router } from "express";
import { getLikedAlbums, isLiked, likeAlbum, unlikeAlbum } from "../controllers/album.controller";

const router = Router();

router.post("/like", likeAlbum);
router.post("/unlike", unlikeAlbum);
router.get("/liked", getLikedAlbums);
router.post("/isLiked", isLiked);

export default router;
