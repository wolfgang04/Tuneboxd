import { Router } from "express";
import {
	getAlbum,
	getArtist,
	getFeaturedSong,
	getGenres,
	getRelatedArtists,
	getSongs,
	getTopTracks,
	getTrack,
	recommendBasedOnSong,
	recommendSongs,
	recommendSongsByGenre,
	search,
} from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);
router.get("/song", getSongs);
router.get("/genre", getGenres);
router.get("/artist", getArtist);
router.get("/album", getAlbum);
router.get("/track", getTrack);
router.get("/recommendSongs", recommendSongsByGenre);
router.get("/topTracks", getTopTracks);
router.get("/relatedArtists", getRelatedArtists);
router.get("/recommendation", recommendSongs);
router.get("/featuredSongs", getFeaturedSong);
router.get("/recommend", recommendBasedOnSong);

export default router;
