import { Router } from "express";
import { getGenres, getSongs, search } from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);
router.get("/song", getSongs);
router.get("/genre", getGenres);

export default router;
