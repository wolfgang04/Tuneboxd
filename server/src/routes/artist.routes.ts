import { Router } from "express";
import { followArtist, getFollowedArtists, getUsersFollowedArtists, unfollowArtist } from "../controllers/artist.controller";

const router = Router();

router.post("/follow", followArtist);
router.post("/unfollow", unfollowArtist);
router.get("/followed", getFollowedArtists);
router.get("/usersFollowed", getUsersFollowedArtists);

export default router;
