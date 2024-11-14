import axios from "axios";
import { Request, Response } from "express";
import { getHeaders } from "../utils/spotifyToken";

export const search = async (
	request: Request,
	response: Response
): Promise<any> => {
	const searchQuery = request.query.searchQuery as string;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist%2Ctrack%2Calbum`,
			{ headers: await getHeaders() }
		);

		return response.json({ ...res.data });
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching search");
	}
};
