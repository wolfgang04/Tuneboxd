import { Request, Response } from "express";
import { getUser } from "../constants";
import { supabase } from "../utils/supabaseClient";

export const follow = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ msg: "Unauthorized" });

	const { username } = request.body;

	try {
		const { data: existingFollow, error: existingFollowError } =
			await supabase
				.from("following")
				.select()
				.match({ follower: user, following: username });
		if (existingFollowError) throw existingFollowError;

		if (existingFollow && existingFollow.length > 0) {
			const { error: unfollowError } = await supabase
				.from("following")
				.delete()
				.match({ follower: user, following: username });
			if (unfollowError) throw unfollowError;

			return response
				.status(200)
				.json({ msg: "Successfully unfollowed user" });
		} else {
			const { error: followError } = await supabase
				.from("following")
				.insert([{ follower: user, following: username }]);
			if (followError) throw followError;

			return response
				.status(200)
				.json({ msg: "Successfully followed user" });
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in follow", error);
			return response.status(500).json({ msg: "Error following user" });
		} else {
			console.error("Error in follow", error);
			return response
				.status(500)
				.json({ msg: "Unidentified error occured" });
		}
	}
};

export const getFollowStatus = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ msg: "Unauthorized" });

	const { username } = request.params;

	try {
		const { data: followData, error: followError } = await supabase
			.from("following")
			.select()
			.match({ follower: user, following: username });
		if (followError) throw followError;

		return response
			.status(200)
			.json({ isFollowing: followData.length > 0 });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getFollowStatus", error);
			return response
				.status(500)
				.json({ msg: "Error getting follow status" });
		} else {
			console.error("Error in getFollowStatus", error);
			return response
				.status(500)
				.json({ msg: "Unidentified error occured" });
		}
	}
};

export const getFollowers = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { user } = request.query;

	try {
		const { data: followers, error } = await supabase
			.from("following")
			.select("follower", { count: "exact" })
			.eq("following", user);
		if (error) throw error;

		return response.status(200).json({ followers });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getFollowers", error);
			return response
				.status(500)
				.json({ msg: "Error getting followers" });
		} else {
			console.error("Error in getFollowers", error);
			return response
				.status(500)
				.json({ msg: "Unidentified error occured" });
		}
	}
};

export const getFollowing = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { user } = request.query;

	try {
		const { data: following, error } = await supabase
			.from("following")
			.select("following", { count: "exact" })
			.eq("follower", user);
		if (error) throw error;

		return response.status(200).json({ following });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in getFollowing", error);
			return response
				.status(500)
				.json({ msg: "Error getting following" });
		} else {
			console.error("Error in getFollowing", error);
			return response
				.status(500)
				.json({ msg: "Unidentified error occured" });
		}
	}
};
