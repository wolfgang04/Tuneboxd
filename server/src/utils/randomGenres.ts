export const getRandomGenres = (genres: string[], count: number): string[] => {
	const shuffled = genres.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};
