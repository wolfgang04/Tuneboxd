enum mediaType {
	song,
	album,
	playlist,
}

export interface Review {
	mediaType: mediaType;
	content: string;
	rating: number;
	userId: string;
	created_at: Date;
}
