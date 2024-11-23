import { Router } from "express";
import {
	getAlbum,
	getArtist,
	getGenres,
	getRelatedArtists,
	getSongs,
	getTopTracks,
	getTrack,
	recommendSongs,
	search,
} from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);
router.get("/song", getSongs);
router.get("/genre", getGenres);
router.get("/artist", getArtist);
router.get("/album", getAlbum);
router.get("/track", getTrack);
router.get("/recommendSongs", recommendSongs);
router.get("/topTracks", getTopTracks);
router.get("/relatedArtists", getRelatedArtists);

export default router;
