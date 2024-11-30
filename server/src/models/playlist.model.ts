export interface aboutSong {
	song_id: number;
	song_name: string;
	song_cover: string;
	album_name: string;
	album_id: number;
	time: Date;
}

export interface Song {
	song: aboutSong;
	playlist_id: number;
}
