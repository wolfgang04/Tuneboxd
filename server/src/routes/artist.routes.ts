import { Router } from "express";
import { followArtist } from "../controllers/artist.controller";

const router = Router();

router.post("/follow", followArtist);

export default router;
