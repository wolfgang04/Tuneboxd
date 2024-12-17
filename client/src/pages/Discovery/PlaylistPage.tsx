import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SongHeader from "../../components/Song/SongHeader";
import Song from "../../components/Song/Song";

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Playlist ID from the route

  // Mock playlist data
  const playlist = {
    title: `Playlist ${id}`,
    songs: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Song Title ${index + 1}`,
      artist: `Artist Name`,
      album: `Album`,
      time: 200, // Assuming time is in seconds
    })),
  };

  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="items mx-auto my-10 w-[90%]">
      <div className="flex h-[350px] items-center justify-center rounded-2xl bg-[#A7A7A7]">
        {playlist.title}
      </div>

      <div className="flex gap-5 items-center mt-10">
        <h1 className="text-4xl font-bold">Songs</h1>
        <input
          type="text"
          placeholder="Search songs"
          className="rounded-lg border-2 border-gray-300 px-2 py-1 outline-none"
          onChange={handleSearchSong}
        />
      </div>

      <table className="mt-10 w-full">
        <SongHeader />
        <tbody>
          {playlist.songs
            .filter((song) =>
              song.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((song) => (
              <Song
                key={song.id}
                album={song.album}
                artist={song.artist}
                cover="https://via.placeholder.com/150" // Placeholder image
                time={Number(song.time)}
                title={song.title}
                albumID={song.id.toString()}
                artistID={song.id.toString()}
                titleID={song.id.toString()}
              />
            ))}
        </tbody>
      </table>

      <button className="relative left-1/2 -translate-x-1/2 rounded-md bg-[#A7A7A7] px-5 py-3 text-white hover:bg-[#7e7e7e] mt-10">
        Next
      </button>
    </div>
  );
};

export default PlaylistPage;