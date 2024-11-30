import { Router } from "express";
import {
	addSongToPlaylist,
	createPlaylist,
	deletePlaylist,
	getUserPlaylists,
	removeSongFromPlaylist,
} from "../controllers/playlist.controller";

const router = Router();

router.post("/create", createPlaylist);
router.get("/delete", deletePlaylist);
router.get("/user-playlists", getUserPlaylists);
router.post("/add-song", addSongToPlaylist);
router.get("/delete-song", removeSongFromPlaylist);

export default router;
