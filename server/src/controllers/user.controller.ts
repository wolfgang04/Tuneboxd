import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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
			.insert([{ loweredUsername, email, password: hash }]);
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

		console.log(userData[0]);

		const isMatch = await bcrypt.compare(password, userData[0].password);
		if (isMatch) {
			request.session.user = loweredUsername;
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
		: response.status(200).json({ msg: "Authorized" });
};
