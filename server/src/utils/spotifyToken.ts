import axios, { AxiosResponse } from "axios";
import { SpotifyTokenResponse } from "../models/spotify.model";
import { clientID, clientSecret } from "../constants";

let cachedToken: SpotifyTokenResponse | null = null;

const getSpotifyToken = async (): Promise<SpotifyTokenResponse> => {
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
						`${clientID}:${clientSecret}`
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
	if (
		cachedToken &&
		cachedToken.expires_in &&
		cachedToken.expires_in > Date.now()
	)
		return cachedToken;

	const token = await getSpotifyToken();
	cachedToken = token;
	cachedToken.expires_in = Date.now() + token.expires_in * 1000;

	return cachedToken.access_token;
};

export const getHeaders = async (): Promise<{ [key: string]: string }> => {
	const token = await getToken();

	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
};
