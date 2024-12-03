import { request, Request, Response } from "express";
import { getUser } from "../constants";
import { supabase } from "../utils/supabaseClient";
import { aboutSong, Song } from "../models/playlist.model";

export const createPlaylist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);

	if (!user) {
		return response.status(401).json({ message: "Unauthorized" });
	}

	try {
		const { error } = await supabase
			.from("playlist")
			.insert([{ user_id: user }]);
		if (error) throw error;

		return response.status(201).json({ message: "Playlist created" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating playlist:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error creating playlist:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};

export const deletePlaylist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	const { id } = request.query;
	try {
		const { error } = await supabase
			.from("playlist")
			.delete()
			.match({ id, user_id: user });
		if (error) throw error;

		return response.status(200).json({ message: "Playlist deleted" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error deleting playlist:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error deleting playlist:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};

export const getUserPlaylists = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	try {
		const { data, error } = await supabase
			.from("playlist")
			.select("name, cover")
			.eq("user_id", user);
		if (error) throw error;

		return response.status(200).json(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching playlists:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error fetching playlists:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};

export const addSongToPlaylist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	const { song, playlist_id } = request.body as Song;

	try {
		const { data, error } = await supabase
			.from("playlist")
			.select("songs")
			.match({ id: playlist_id, user_id: user });
		if (error) throw error;

		const currSongs = data[0].songs;
		const songExists = currSongs.find(
			(s: aboutSong) => s.song_id === song.song_id
		);
		if (songExists)
			return response
				.status(400)
				.json({ message: "Song already exists in playlist" });

		const updatedSongs = [...currSongs, song];
		const { error: updateError } = await supabase
			.from("playlist")
			.update({ songs: updatedSongs })
			.match({ id: playlist_id, user_id: user });
		if (updateError) throw updateError;

		return response.status(200).json({ message: "Song added to playlist" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error adding song to playlist:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error adding song to playlist:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};

export const removeSongFromPlaylist = async (
	request: Request,
	response: Response
): Promise<any> => {
	const user = await getUser(request);
	if (!user) return response.status(401).json({ message: "Unauthorized" });

	const { song_id, playlist_id } = request.body;

	try {
		const { data, error } = await supabase
			.from("playlist")
			.select("songs")
			.match({ id: playlist_id, user_id: user });
		if (error) throw error;

		const currSongs = data[0].songs;
		const updatedSongs = currSongs.filter(
			(song: aboutSong) => song.song_id !== song_id
		);

		const { error: updateError } = await supabase
			.from("playlist")
			.update({ songs: updatedSongs })
			.match({ id: playlist_id, user_id: user });
		if (updateError) throw updateError;

		return response
			.status(200)
			.json({ message: "Song removed from playlist" });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error removing song from playlist:", error);
			return response.status(500).json({ message: error.message });
		} else {
			console.error("Unknown error removing song from playlist:", error);
			return response.status(500).json({ message: "Unknown error" });
		}
	}
};
