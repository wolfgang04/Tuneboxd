import axios from "axios";
import { request, Request, Response } from "express";
import { getHeaders } from "../utils/spotifyToken";
import { supabase } from "../utils/supabaseClient";
import { getRandomGenres } from "../utils/randomGenres";
import { getUser } from "../constants";
import { genres } from "../models/genre.model";
import { delay } from "../utils/delay";
import util from "util";

export const search = async (
	request: Request,
	response: Response
): Promise<any> => {
	const searchQuery = request.query.searchQuery as string;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
			{ headers: await getHeaders() }
		);

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching search");
	}
};

export const getSongs = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { song } = request.query;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${song}&type=track`,
			{ headers: await getHeaders() }
		);

		return response.json(res.data);
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching songs");
	}
};

export const recommendBasedOnSong = async (request: Request, response: Response): Promise<any> => {
	const songs = request.query.song as string[];
	if (!Array.isArray(songs))
		return response.status(400).send({ message: 'Invalid songs parameter' });

	const songss = songs.join(",");

	try {
		const res = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songss)}&type=track`, { headers: await getHeaders() });
		return response.json(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in recommendBasedOnSong: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in recommendBasedOnSong: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getFeaturedSong = async (request: Request, response: Response): Promise<any> => {
	const featured = request.query.featured as string[];

	try {
		const ids = await Promise.all(
			featured.map(async (song: string) => {
				const res = await axios.get(
					`https://api.spotify.com/v1/search?q=${song}&type=track`,
					{ headers: await getHeaders() }
				);
				return res.data.tracks.items[0].id;
			}
			))

		const res = await axios.get(`https://api.spotify.com/v1/tracks?ids=${ids.join(",")}`, { headers: await getHeaders() });
		return response.json(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getFeatured: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getFeatured: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getGenres = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		return response.json({ genres });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching genres");
	}
};

export const getArtist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { artist, id } = request.query;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/artists/${id}`,
			{
				headers: await getHeaders(),
			}
		);

		return response.json({
			about: res.data
		});
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching artist");
	}
};

export const getAlbum = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { id } = request.query;

	try {
		const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
			headers: await getHeaders(),
		});

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching album");
	}
};

export const getTrack = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { id } = request.query;

	try {
		const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
			headers: await getHeaders(),
		});

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching song");
	}
};

export const recommendSongsByGenre = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { seed_genres } = request.query;
	const genre = seed_genres as string;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${genre}&type=track&offset=${Math.floor(
				Math.random() * 100
			)}`,
			{ headers: await getHeaders() }
		);

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching recommendations");
	}
};

export const recommendSongs = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const user = await getUser(request);
		if (!user) return response.status(401).send("Unauthorized");

		let res;

		const { data: songData, error: songError } = await supabase.rpc(
			"get_random_songs",
			{ user_name: user, count: 5 }
		);
		if (songError) throw songError;

		const { data: artistData, error: artistError } = await supabase.rpc(
			"get_random_artists",
			{ user_name: user, count: 5 }
		);
		if (artistError) throw artistError;

		const songQueries = songData
			.map((song: string) => `track:${song}`)
			.join(" OR ");
		const artistQueries = artistData
			.map((artist: string) => `artist:${artist}`)
			.join(" OR ");

		if (songData.length > 0 || artistData.length > 0) {
			const query = `${songQueries}${artistQueries ? ` OR ${artistQueries}` : ""
				}`;
			res = await axios.get(
				`https://api.spotify.com/v1/search?q=${encodeURIComponent(
					query
				)}&type=track`,
				{ headers: await getHeaders() }
			);
		} else {
			const { data: genresData } = await axios.get(
				"https://api.spotify.com/v1/recommendations/available-genre-seeds",
				{ headers: await getHeaders() }
			);
			const genres = getRandomGenres(genresData.genres, 5).join(" OR ");

			res = await axios.get(
				`https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
					genres
				)}&type=track`,
				{ headers: await getHeaders() }
			);
		}

		// const songIds = songData.map((song: string) => song).join(",");
		// const artistIds = artistData.map((artist: string) => artist).join(",");

		// if (songData.length > 0 || artistData.length > 0) {
		// 	res = await axios.get(
		// 		`https://api.spotify.com/v1/recommendations?${
		// 			songData.length > 0 ? `seed_tracks=${songIds}` : ""
		// 		}${artistData.length > 0 ? `&seed_artists=${artistIds}` : ""}`,
		// 		{ headers: await getHeaders() }
		// 	);
		// } else {
		// 	const { data: genresData } = await axios.get(
		// 		"https://api.spotify.com/v1/recommendations/available-genre-seeds",
		// 		{ headers: await getHeaders() }
		// 	);
		// 	const genres = getRandomGenres(genresData.genres, 5).join(",");

		// 	res = await axios.get(
		// 		`https://api.spotify.com/v1/recommendations?seed_genres=${genres}`,
		// 		{ headers: await getHeaders() }
		// 	);
		// }

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching recommendations");
	}
};

export const getTopTracks = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { id } = request.query;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/artists/${id}/top-tracks`,
			{
				headers: await getHeaders(),
			}
		);

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching top tracks");
	}
};

export const getRelatedArtists = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { id } = request.query;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${id}&type=artist`,
			{ headers: await getHeaders() }
		);

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching related artists");
	}
};

export const getArtistTopAlbums = async (request: Request, response: Response): Promise<any> => {
	const { artistId } = request.query;

	try {
		const res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers: await getHeaders(), });
		return response.json(res.data);

	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getArtistTopTracks: ", error.message);
			console.error(util.inspect(error, { depth: null }));
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getArtistTopTracks: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}