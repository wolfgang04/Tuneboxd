import { Router } from "express";
import { likeAlbum } from "../controllers/album.controller";

const router = Router();

router.post("/like", likeAlbum);

export default router;
