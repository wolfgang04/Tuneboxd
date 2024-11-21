export interface Song {
	title: string;
	song_id: string;
	artist: string;
	artist_id: string;
	album: string | undefined;
	album_id: string | undefined;
	cover: string;
}
