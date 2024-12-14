import axios from "axios";
import { LASTFM_API_KEY } from "../../constants";
import { baseUrl } from "./lastfm.controller";
import { Request, Response } from "express";
import { genres } from "../../models/genre.model";
import { getTenRandomGenres } from "../../utils/randomGenres";

export const getGenres = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const res = await axios.get(
			`${baseUrl}?method=tag.getTopTags&api_key=${LASTFM_API_KEY}&format=json`
		);

		console.log(res.data);
		return response.status(200).send(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getGenres: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getGenres: ", error);
			return response
				.status(500)
				.send({ message: "Internal server error" });
		}
	}
};

export const getTopArtistsPerGenre = async (
	request: Request,
	response: Response
): Promise<any> => {
	try {
		const { genre } = request.query;
		const res = await axios.get(
			`${baseUrl}?method=tag.gettopartists&tag=${genre}&api_key=${LASTFM_API_KEY}&format=json`
		);

		console.log(res.data);
		return response.status(200).send(res.data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getTopArtistsPerGenre: ", error.message);
			return response.status(500).send({ message: error.message });
		} else {
			console.error("Error in getTopArtistsPerGenre: ", error);
			return response
				.status(500)
				.send({ message: "Internal server error" });
		}
	}
};

export const randomizeTenGenres = async (request: Request, response: Response): Promise<any> => {
  const shuffled: string[] = getTenRandomGenres(genres);
  return response.status(200).send(shuffled);
};