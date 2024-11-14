import { Router } from "express";
import { getGenres, search } from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);
router.get("/genre", getGenres);

export default router;
