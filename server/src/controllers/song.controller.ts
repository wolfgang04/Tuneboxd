import axios from "axios";
import e, { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import { Song } from "../models/song.model";
import { getUser } from "../constants";

export const likeSong = async (
	request: Request,
	response: Response
): Promise<any> => {
	const songData: Song = request.body;
	const user_id = request.session.user;

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("song")
			.insert([{ ...songData, user_id }]);
		if (error) throw error;

		return response.status(201).json({ message: "Song liked" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error liking song:", error.message);
			return response.status(500).send("Error liking song");
		} else {
			console.error("Unknown error occurred while liking song:", error);
			return response
				.status(500)
				.send("Unknown error occurred while liking song");
		}
	}
};

export const unlikeSong = async (
	request: Request,
	response: Response
): Promise<any> => {
	const songData: Song = request.body;
	const user_id = request.session.user;

	try {
		if (!user_id) {
			return response.status(401).json({ message: "Unauthorized" });
		}

		const { error } = await supabase
			.from("song")
			.delete()
			.match({ ...songData, user_id });
		if (error) throw error;

		return response.status(200).json({ message: "Song unliked" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error unliking song:", error.message);
			return response.status(500).send("Error unliking song");
		} else {
			console.error("Unknown error occurred while unliking song:", error);
			return response
				.status(500)
				.send("Unknown error occurred while unliking song");
		}
	}
};

export const getLikedSongs = async (request: Request, response: Response): Promise<any> => {
	const { user } = request.query;

	try {
		const { data: songs, error } = await supabase
			.from("song")
			.select("title, song_id, artist, artist_id, cover")
			.match({ user_id: user });
		if (error) throw error;

		return response.status(200).json(songs);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error getting liked songs", error);
			return response.status(500).json({ msg: "Error getting liked songs" });
		} else {
			console.error("Error getting liked songs", error);
			return response.status(500).json({ msg: "Unidentified error occured" });
		}
	}
}