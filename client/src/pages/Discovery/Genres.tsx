import axios from "axios";
import React, { useEffect, useState } from "react";
import Genre from "../../components/Genres/Genre";

const Genres = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [genres, setGenres] = useState([]);
  const randGenre = Math.floor(Math.random() * genres.length);

  const fetchGenres = async () => {
    setIsLoading(true);
    const { data } = await axios.get("http://localhost:8080/api/spotify/genre");
    console.log(data.genres);
    setGenres(data.genres);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSearchGenre = (e: HTMLInputElement) => {
    setSearchInput(e.value);
  };

  return (
    <div className="mx-20 my-20">
      <div className="flex gap-5">
        <h1 className="text-4xl font-bold">Music Genres</h1>

        <input
          type="text"
          placeholder={`${genres[randGenre]}`}
          className="rounded-lg border-2 border-gray-300 px-2 py-1 outline-none"
          onChange={(e) => handleSearchGenre(e.target as HTMLInputElement)}
        />
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          genres
            .filter((genre: string) =>
              genre.toLowerCase().includes(searchInput.toLowerCase()),
            )
            .map((genre: string, idx: number) => (
              <Genre key={idx} genre={genre} />
            ))
        )}
      </div>
    </div>
  );
};

export default Genres;
