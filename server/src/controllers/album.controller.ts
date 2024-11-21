import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import { getUser } from "../constants";

export const likeAlbum = async (
	request: Request,
	response: Response
): Promise<any> => {
	const albumData = request.body;
	const user_id = getUser(request);

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
