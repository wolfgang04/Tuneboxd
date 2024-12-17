import { Request, Response } from "express";
import { getUser } from "../constants";
import { supabase } from "../utils/supabaseClient";
import { Artist } from "../models/artist.model";
import { request } from "http";

export const getFollowedArtists = async (request: Request, response: Response): Promise<any> => {
	const user = await getUser(request);

	try {
		if (!user) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { data, error } = await supabase
			.from("artist")
			.select("artist_id, name, cover")
			.match({ user_id: user })
			.limit(3);
		if (error) throw error;

		return response.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error getting followed artists:", error.message);
			return response
				.status(500)
				.json({ message: "Error getting followed artists" });
		} else {
			console.error("Unknown error occured", error);
			return response
				.status(500)
				.json({ message: "Unknown error occured" });
		}
	}
}

export const getUsersFollowedArtists = async (request: Request, response: Response): Promise<any> => {
	const { user } = request.query;

	try {
		const { data, error } = await supabase
			.from("artist")
			.select("artist_id, name, cover")
			.match({ user_id: user })
		if (error) throw error;

		return response.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error getting followed artists:", error.message);
			return response
				.status(500)
				.json({ message: "Error getting followed artists" });
		} else {
			console.error("Unknown error occured", error);
			return response
				.status(500)
				.json({ message: "Unknown error occured" });
		}
	}
}

export const followArtist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const artistData: Artist = request.body;
	const user_id = await getUser(request);

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("artist")
			.insert([{ ...artistData, user_id }]);
		if (error) throw error;

		return response.status(200).json({ message: "Artist followed" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error following artist:", error.message);
			return response
				.status(500)
				.json({ message: "Error following artist" });
		} else {
			console.error("Unknown error occured", error);
			return response
				.status(500)
				.json({ message: "Unknown error occured" });
		}
	}
};

export const unfollowArtist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const artistData: Artist = request.body;
	const user_id = await getUser(request);

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("artist")
			.delete()
			.match({ ...artistData, user_id });
		if (error) throw error;

		return response.status(200).json({ message: "Artist unfollowed" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error unfollowing artist:", error.message);
			return response
				.status(500)
				.json({ message: "Error unfollowing artist" });
		} else {
			console.error("Unknown error occured", error);
			return response
				.status(500)
				.json({ message: "Unknown error occured" });
		}
	}
};

export const isFollowingArtist = async (request: Request, response: Response): Promise<any> => {
	const { artist_id } = request.body;
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	try {
		const { data, error } = await supabase
			.from("artist")
			.select("artist_id")
			.match({ artist_id, user_id: user });
		if (error) throw error;

		return response.status(200).json(data.length > 0);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error checking if user is following artist:", error.message);
			return response
				.status(500)
				.json({ message: "Error checking if user is following artist" });
		} else {
			console.error("Unknown error occured", error);
			return response
				.status(500)
				.json({ message: "Unknown error occured" });
		}
	}
}
