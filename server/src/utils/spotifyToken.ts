import axios, { AxiosResponse } from "axios";
import { SpotifyTokenResponse } from "../models/spotify.model";

const getSpotifyToken = async (): Promise<SpotifyTokenResponse> => {
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
