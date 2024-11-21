import { Router } from "express";
import { likeSong } from "../controllers/song.controller";

const router = Router();

router.post("/like", likeSong);

export default router;
