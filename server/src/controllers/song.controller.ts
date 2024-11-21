import axios from "axios";
import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import { Song } from "../models/song.model";

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
