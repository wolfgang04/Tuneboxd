import { Router } from "express";
import { getArtist } from "../controllers/spotify.controller";

const router = Router();

router.get("/artist", getArtist);

export default router;
