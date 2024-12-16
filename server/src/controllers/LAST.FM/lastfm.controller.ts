import axios from "axios";
import { request, Request, Response } from "express";
import { LASTFM_API_KEY } from "../../constants";
import { getHeaders } from "../../utils/spotifyToken";
import { delay } from "../../utils/delay";

export const baseUrl = "http://ws.audioscrobbler.com/2.0/";

export const search = async (request: Request, response: Response): Promise<any> => {
	const { query } = request.query;

	try {
		const artistRes = await axios.get(`${baseUrl}?method=artist.search&artist=${query}&api_key=${LASTFM_API_KEY}&format=json`);
		const albumRes = await axios.get(`${baseUrl}?method=album.search&album=${query}&api_key=${LASTFM_API_KEY}&format=json`);
		const trackRes = await axios.get(`${baseUrl}?method=track.search&track=${query}&api_key=${LASTFM_API_KEY}&format=json`);

		return response.status(200).send({
			artist: artistRes.data,
			album: albumRes.data,
			track: trackRes.data
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in search: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in search: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const topArtistAndTheirAlbums = async (request: Request, response: Response): Promise<any> => {
	try {
		const topArtistRes = await axios.get(`${baseUrl}?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`);
		const topArtist = topArtistRes.data.artists.artist;

		const topArtistAndAlbums = await Promise.all(topArtist.map(async (artist: any, index: number) => {
			await delay(index * 30);
			const artistRes = await axios.get(`${baseUrl}?method=artist.gettopalbums&artist=${artist.name}&api_key=${LASTFM_API_KEY}&format=json`);
			const albums = artistRes.data.topalbums.album[0];

			return albums;
		}));

		const albumsInfo = await Promise.all(topArtistAndAlbums.map(async (albums: any, index: number) => {
			await delay(index * 30);
			const albumInfo = await axios.get(`https://api.spotify.com/v1/search?q=${albums.name}&type=album`, { headers: await getHeaders() })

			return albumInfo.data.albums.items[0];
		}))

		const ids = albumsInfo.map((album: any) => album.id);
		const covers = albumsInfo.map((album: any) => album.images);

		return response.status(200).send({
			ids, covers
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in topArtistAndTheirAlbums: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in topArtistAndTheirAlbums: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}