import { Router } from "express";
import { likeSong, unlikeSong } from "../controllers/song.controller";

const router = Router();

router.post("/like", likeSong);
router.post("/unlike", unlikeSong);

export default router;
