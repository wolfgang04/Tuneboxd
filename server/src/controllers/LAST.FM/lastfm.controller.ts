import axios from "axios";
import { request, Request, Response } from "express";
import { LASTFM_API_KEY } from "../../constants";

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
