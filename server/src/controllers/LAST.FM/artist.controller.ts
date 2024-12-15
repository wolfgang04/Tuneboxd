import axios from "axios";
import { LASTFM_API_KEY } from "../../constants";
import { baseUrl } from "./lastfm.controller";
import { request, Request, Response } from "express";

export const getArtistInfo = async (request: Request, response: Response): Promise<any> => {
	const { artist } = request.query;

	try {
		const artistRes = await axios.get(`${baseUrl}?method=artist.getInfo&artist=${artist}&api_key=${LASTFM_API_KEY}&format=json`);

		return response.status(200).send({
			artist: artistRes.data
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getArtistInfo: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getArtistInfo: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getSimilarArtists = async (request: Request, response: Response): Promise<any> => {
	const { artist } = request.query;

	try {
		const artistRes = await axios.get(`${baseUrl}?method=artist.getSimilar&artist=${artist}&api_key=${LASTFM_API_KEY}&format=json`);

		return response.status(200).send({
			artist: artistRes.data
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getSimilarArtists: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getSimilarArtists: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getArtistTopTracks = async (request: Request, response: Response): Promise<any> => {
	const { artist } = request.query;

	try {
		const artistRes = await axios.get(`${baseUrl}?method=artist.getTopTracks&artist=${artist}&api_key=${LASTFM_API_KEY}&format=json`);

		return response.status(200).send({
			artist: artistRes.data
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getArtistTopTracks: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getArtistTopTracks: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getArtistTopAlbums = async (request: Request, response: Response): Promise<any> => {
	const { artist } = request.query;

	try {
		const artistRes = await axios.get(`${baseUrl}?method=artist.getTopAlbums&artist=${artist}&api_key=${LASTFM_API_KEY}&format=json`);

		return response.status(200).send({
			artist: artistRes.data
		})
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getArtistTopAlbums: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getArtistTopAlbums: ", error);
			return response.status(500).send({ message: "Internal server error" });
		}
	}
}

export const getTopArtistsNearYou = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const res = await axios.get(
			`${baseUrl}?method=geo.gettopartists&country=philippines&api_key=${LASTFM_API_KEY}&format=json`
		);

		console.log(res.data);
		return response.status(200).send(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getTopArtistsNearYou: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getTopArtistsNearYou: ", error);
			return response
				.status(500)
				.send({ message: "Internal server error" });
		}
	}
};

export const getTopArtists = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const res = await axios.get(
			`${baseUrl}?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json`
		);

		console.log(res.data);
		return response.status(200).send(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getTopArtists: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getTopArtists: ", error);
			return response
				.status(500)
				.send({ message: "Internal server error" });
		}
	}
};