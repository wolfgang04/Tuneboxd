import { Router } from "express";
import { getLikedAlbums, likeAlbum, unlikeAlbum } from "../controllers/album.controller";

const router = Router();

router.post("/like", likeAlbum);
router.post("/unlike", unlikeAlbum);
router.get("/liked", getLikedAlbums);

export default router;
