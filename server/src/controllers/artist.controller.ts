import { Request, Response } from "express";
import { getUser } from "../constants";
import { supabase } from "../utils/supabaseClient";

export const followArtist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const artistData = request.body;
	const user_id = getUser(request);

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
