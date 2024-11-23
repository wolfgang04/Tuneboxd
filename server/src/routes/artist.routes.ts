import { Router } from "express";
import { followArtist, unfollowArtist } from "../controllers/artist.controller";

const router = Router();

router.post("/follow", followArtist);
router.post("/unfollow", unfollowArtist);

export default router;
