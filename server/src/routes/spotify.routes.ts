import { Router } from "express";
import {
	getAlbum,
	getArtist,
	getGenres,
	getSongs,
	getTrack,
	search,
} from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);
router.get("/song", getSongs);
router.get("/genre", getGenres);
router.get("/artist", getArtist);
router.get("/album", getAlbum);
router.get("/track", getTrack);

export default router;
