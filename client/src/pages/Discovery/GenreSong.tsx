import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongHeader from "../../components/Song/SongHeader";
import Song from "../../components/Song/Song";

const GenreSong = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<any[]>([]);
  const location = useLocation();
  const genre = location.pathname.slice(18);

  const fetchSongs = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/spotify/recommendSongs",
      {
        params: { seed_genres: genre },
      },
    );

    console.log(res);

    // setSongs((prevSongs) => [...prevSongs, ...res.data.tracks]);
    setSongs(res.data.tracks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, [genre]);

  return (
    <div className="mx-auto my-10 w-[90%]">
      <div className="flex h-[350px] items-center justify-center rounded-2xl bg-[#A7A7A7]">
        {genre}
      </div>

      <table className="mt-10 w-full">
        <SongHeader />
        {!isLoading && (
          <tbody>
            {songs.map((song) => (
              <Song
                key={song.id}
                album={song.album.name}
                artist={song.album.artists[0].name}
                cover={song.album.images[0].url}
                time={song.duration_ms}
                title={song.name}
                albumID={song.album.id}
                artistID={song.album.artists[0].id}
                titleID={song.id}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default GenreSong;
