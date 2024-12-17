import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import { getUser } from "../constants";
import { Album } from "../models/album.model";

export const likeAlbum = async (
	request: Request,
	response: Response
): Promise<any> => {
	const albumData: Album = request.body;
	const user_id = await getUser(request);

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("album")
			.insert([{ ...albumData, user_id }]);
		if (error) throw error;

		return response.status(201).json({ message: "Album liked" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error liking album:", error.message);
			return response.status(500).send("Error liking album");
		} else {
			console.error("Unknown error occurred while liking album:", error);
			return response
				.status(500)
				.send("Unknown error occurred while liking album");
		}
	}
};

export const unlikeAlbum = async (
	request: Request,
	response: Response
): Promise<any> => {
	const albumData: Album = request.body;
	const user_id = await getUser(request);

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("album")
			.delete()
			.match({ ...albumData, user_id });
		if (error) throw error;

		return response.status(200).json({ message: "Album unliked" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error unliking album:", error.message);
			return response.status(500).send("Error unliking album");
		} else {
			console.error(
				"Unknown error occurred while unliking album:",
				error
			);
			return response
				.status(500)
				.send("Unknown error occurred while unliking album");
		}
	}
};

export const getLikedAlbums = async (request: Request, response: Response): Promise<any> => {
	const { user } = request.query

	try {
		const { data: likedAlbums, error } = await supabase
			.from("album")
			.select("album_id, title, artist, artist_id, cover")
			.match({ user_id: user });
		if (error) throw error;

		return response.status(200).json(likedAlbums);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error getting liked albums:", error.message);
			return response.status(500).send("Error getting liked albums");
		} else {
			console.error("Unknown error occurred while getting liked albums:", error);
			return response.status(500).send("Unknown error occurred while getting liked albums");
		}
	}
}

export const isLiked = async (request: Request, response: Response): Promise<any> => {
	const { album_id } = request.body;
	const user_id = await getUser(request);
	if (!user_id) return response.status(401).json({ message: "Unauthorized" });

	try {
		const { data: likedAlbums, error } = await supabase
			.from("album")
			.select("album_id")
			.match({ album_id, user_id });
		if (error) throw error;

		return response.status(200).json(likedAlbums.length > 0);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error checking if album is liked:", error.message);
			return response.status(500).send("Error checking if album is liked");
		} else {
			console.error(
				"Unknown error occurred while checking if album is liked:",
				error
			);
			return response
				.status(500)
				.send("Unknown error occurred while checking if album is liked");
		}
	}
}