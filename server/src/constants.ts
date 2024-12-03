import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

export const PORT = process.env.PORT;
export const saltRounds = Number(process.env.SALT_ROUNDS!);
export const SUPABASE_URL = process.env.DATABASE_URL as string;
export const SUPABASE_KEY = process.env.DATABASE_KEY as string;
export const clientID = process.env.SPOTIFY_CLIENT_ID;
export const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getUser = async (request: Request): Promise<string | undefined> =>
	request.session.user;
