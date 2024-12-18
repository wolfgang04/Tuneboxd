import { request, Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { getUser, saltRounds } from "../constants";

dotenv.config();

declare module "express-session" {
	interface SessionData {
		user: string;
	}
}

interface CustomError extends Error {
	code?: string;
}

export const signup = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { username, email, password, confirmPassword } = request.body;
	const loweredUsername = username.toLowerCase();
	const saltRounds = Number(process.env.SALT_ROUNDS!);

	if (!username || !email || !password || !confirmPassword)
		return response.status(400).json({ msg: "All fields are required" });
	if (password.length < 8)
		return response
			.status(400)
			.json({ msg: "Password must be at least 8 characters" });
	if (password !== confirmPassword)
		return response.status(400).json({ msg: "Passwords do not match" });

	try {
		const hash: string = await bcrypt.hash(password, saltRounds);

		const { data: signupData, error: signupError } = await supabase
			.from("user")
			.insert([{ username: loweredUsername, email, password: hash }]);
		if (signupError) throw signupError;

		request.session.user = username;
		console.log(signupData);
		return response.status(201).json({ msg: "Successfully created user" });
	} catch (error) {
		if (error instanceof Error) {
			const customError = error as CustomError;
			if (customError.code === "23505") {
				console.error("username already in use", error);
				return response
					.status(400)
					.json({ msg: "username already used" });
			}

			console.error("Error in signup", error);
			return response.status(500).json({ msg: "Error creating user" });
		}
		console.log("Error in signup", error);
		return response.status(500).json({ msg: "Unidentified error occured" });
	}
};

export const login = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { username, password } = request.body;
	const loweredUsername = username.toLowerCase();

	if (!username || !password) {
		return response.status(400).json({ msg: "All fields are required" });
	}

	try {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.select("password")
			.eq("username", loweredUsername);
		if (userError) throw userError;

		if (!userData || userData?.length === 0)
			return response.status(401).json({ msg: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, userData[0].password);
		if (isMatch) {
			request.session.user = loweredUsername;
			console.log(request.session.user);
			return response.status(200).json({ msg: "Successfully logged in" });
		} else {
			return response.status(401).json({ msg: "Invalid credentials" });
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in login", error);
			return response.status(500).json({ msg: "Error logging in" });
		} else {
			console.error("Error in login", error);
			return response
				.status(500)
				.json({ msg: "Unidentified error occured" });
		}
	}
};

export const logout = async (request: Request, response: Response) => {
	request.session.destroy((error) => {
		if (error) {
			console.error("Error in logout", error);
			return response.status(500).json({ msg: "Error logging out" });
		}
		return response.status(200).json({ msg: "Successfully logged out" });
	});
};

export const status = async (
	request: Request,
	response: Response
): Promise<any> => {
	return !request.session.user
		? response.status(401).json({ msg: "Unauthorized" })
		: response.status(200).json({ msg: "Authorized", user: request.session.user });
};

export const fetchUserDetails = async (
	request: Request,
	response: Response
): Promise<any> => {
	const { user } = request.body;
	const username = await getUser(request);
	if (!username) return response.status(401).send("Unauthorized");

	try {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.select("username, email, created_at, image")
			.eq("username", user);
		if (userError) throw userError;

		return response.json(userData);
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching user details");
	}
};

export const fetchUserImage = async (request: Request, response: Response): Promise<any> => {
	const username = await getUser(request);
	if (!username) return response.status(401).send("Unauthorized");

	try {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.select("image")
			.eq("username", username);
		if (userError) throw userError;

		return response.json(userData);
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error fetching user image");
	}
}

export const changeCreds = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).send("Unauthorized");

	const { username, email, password, prevPassword } = request.body;

	try {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.select("username, email, password")
			.match({ username: user });
		if (userError) throw userError;

		const isMatch = await bcrypt.compare(
			prevPassword,
			userData[0].password
		);
		if (!isMatch) return response.status(401).send("Invalid credentials");

		const updates: { [key: string]: string } = {};
		if (username != userData[0].username) updates.username = username;
		if (email != userData[0].email) updates.email = email;
		if (password)
			updates.password = await bcrypt.hash(password, saltRounds);

		console.log("updates to be made:", updates);

		const { data: updateData, error: updateError } = await supabase
			.from("user")
			.update(updates)
			.match({ username: user });
		if (updateError) throw updateError;

		request.session.user = username;

		return response.status(200).send("Successfully changed credentials");
	} catch (error) {
		console.error(error);
		return response.status(500).send("Error changing credentials");
	}
};

export const forgotPassword = async (request: Request, response: Response): Promise<any> => {
	const { email, username, password, confirmPassword } = request.body;
	if (password !== confirmPassword) return response.status(400).json({ msg: "Passwords do not match" });

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const { error } = await supabase.from("user")
			.update({ password: hashedPassword })
			.match({ email, username });
		if (error) throw error;

		return response.status(200).json({ msg: "Successfully changed password" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error in forgot password", error);
			return response.status(500).json({ msg: "Error changing password" });
		} else {
			console.error("Error in forgot password", error);
			return response.status(500).json({ msg: "Unidentified error occured" });
		}
	}
}