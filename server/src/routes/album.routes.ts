import { Router } from "express";
import { likeAlbum, unlikeAlbum } from "../controllers/album.controller";

const router = Router();

router.post("/like", likeAlbum);
router.post("/unlike", unlikeAlbum);

export default router;
