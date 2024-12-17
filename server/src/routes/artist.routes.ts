import { Router } from "express";
import { followArtist, getFollowedArtists, getUsersFollowedArtists, isFollowingArtist, unfollowArtist } from "../controllers/artist.controller";

const router = Router();

router.post("/follow", followArtist);
router.post("/unfollow", unfollowArtist);
router.get("/followed", getFollowedArtists);
router.get("/usersFollowed", getUsersFollowedArtists);
router.post("/isFollowing", isFollowingArtist);

export default router;
