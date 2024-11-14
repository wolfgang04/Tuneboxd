import axios, { AxiosResponse } from "axios";
import { SpotifyTokenResponse } from "../models/spotify.model";
import { Request, Response } from "express";

export const getSpotifyToken = async (): Promise<SpotifyTokenResponse> => {
	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

	try {
		const response: AxiosResponse<SpotifyTokenResponse> = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "client_credentials",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${Buffer.from(
						`${clientId}:${clientSecret}`
					).toString("base64")}`,
				},
			}
		);

		console.log(response);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getToken = async () => {
	const token = await getSpotifyToken();

	return token.access_token;
};

export const getHeaders = async (): Promise<{ [key: string]: string }> => {
	const token = await getToken();

	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
};

export const getArtist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const artist = request.query.artist as string;

	try {
		const res = await axios.get(
			`https://api.spotify.com/v1/search?q=${artist}&type=artist`,
			{
				headers: await getHeaders(),
			}
		);

		console.log(res.data);

		return response.json(res.data);
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching artist");
	}
};
