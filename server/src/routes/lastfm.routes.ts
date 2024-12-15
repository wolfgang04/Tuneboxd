import { Router } from "express";
import { getTopArtistsNearYou, getTopArtists, getArtistInfo, getSimilarArtists, getArtistTopTracks, getArtistTopAlbums } from "../controllers/LAST.FM/artist.controller";
import { getGenres, getTopArtistsPerGenre, randomizeTenGenres } from "../controllers/LAST.FM/genre.controller";
import { search, topArtistAndTheirAlbums } from "../controllers/LAST.FM/lastfm.controller";
import { getSimilarSongs, getSongInfo, getTopSongs } from "../controllers/LAST.FM/songs.controller";
import { getAlbumInfo } from "../controllers/LAST.FM/album.controller";

const router = Router();

router.get("/search", search);

router.get("/songInfo", getSongInfo);
router.get("/similarSongs", getSimilarSongs);
router.get("/topSongs", getTopSongs);

router.get("/topGenreArtists", getTopArtistsPerGenre);
router.get("/genres", getGenres);
router.get("/randomGenres", randomizeTenGenres);

router.get("/albumInfo", getAlbumInfo);
router.get("/topArtistsAndAlbums", topArtistAndTheirAlbums);

router.get("/artistInfo", getArtistInfo);
router.get("/similarArtists", getSimilarArtists);
router.get("/artistTopTracks", getArtistTopTracks);
router.get("/artistTopAlbums", getArtistTopAlbums)
router.get("/topArtistsNearYou", getTopArtistsNearYou);
router.get("/topArtists", getTopArtists);

export default router;
