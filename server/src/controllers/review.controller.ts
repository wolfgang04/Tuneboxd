import { request, Request, Response } from "express";
import { getUser } from "../constants";
import { supabase } from "../utils/supabaseClient";

export const createReview = async (
	req: Request,
	res: Response
): Promise<any> => {
	const user = await getUser(req);
	if (!user) return res.status(401).json({ message: "Unauthorized" });

	const { mediaType, content, rating } = req.body;
	if (!rating || !mediaType)
		return res.status(400).json({ message: "Missing required fields" });

	try {
		const { error } = await supabase
			.from("review")
			.insert([{ mediaType, content, rating, user_id: user }]);
		if (error) throw error;

		return res.status(201).json({ message: "Review created" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating review:", error);
			return res.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error creating review:", error);
			return res.status(500).json({ message: "Unknown error" });
		}
	}
};

export const getReviews = async (req: Request, res: Response): Promise<any> => {
	try {
		const { data, error } = await supabase.from("review").select();
		if (error) throw error;

		return res.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching reviews:", error);
			return res.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error fetching reviews:", error);
			return res.status(500).json({ message: "Unknown error" });
		}
	}
};

export const getUserReviews = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	try {
		const { data, error } = await supabase
			.from("review")
			.select()
			.match({ user_id: user });
		if (error) throw error;

		return response.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching user reviews:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error fetching user reviews:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};

export const deleteReview = async (
	req: Request,
	res: Response
): Promise<any> => {
	const user = await getUser(req);
	if (!user) return res.status(401).json({ message: "Unauthorized" });

	const { id } = req.params;
	if (!id)
		return res.status(400).json({ message: "Missing required fields" });

	try {
		const { error } = await supabase
			.from("review")
			.delete()
			.match({ id, user_id: user });
		if (error) throw error;

		return res.status(200).json({ message: "Review deleted" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error deleting review:", error);
			return res.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error deleting review:", error);
			return res.status(500).json({ message: "Unknown error" });
		}
	}
};

export const getSongRatings = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { song_id } = req.query;

	try {
		const { data, error } = await supabase
			.from("review")
			.select("rating", { count: "exact" })
			.match({ mediatype: "song", mediatype_id: song_id });
		if (error) throw error;

		return res.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching song ratings:", error);
			return res.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error fetching song ratings:", error);
			return res.status(500).json({ message: "Unknown error" });
		}
	}
};
