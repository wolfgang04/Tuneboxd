import React from "react";
import { useParams } from "react-router-dom";

const PlaylistPage: React.FC = () => {
  const { id } = useParams(); // Playlist ID from the route

  // Mock playlist data
  const playlist = {
    title: `Playlist ${id}`,
    songs: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Song Title ${index + 1}`,
      artist: `Artist Name`,
      album: `Album`,
      time: "3:20",
    })),
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Playlist Header */}
      <div className="p-6 bg-gray-200">
        <h1 className="text-3xl font-bold text-center">{playlist.title}</h1>
      </div>

      {/* Song Table */}
      <div className="p-8">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="text-left text-gray-500 uppercase text-sm border-b">
              <th className="pb-3">Song</th>
              <th className="pb-3">Artist</th>
              <th className="pb-3">Album</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {playlist.songs.map((song) => (
              <tr
                key={song.id}
                className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 border-b"
              >
                <td className="py-3 px-4 flex items-center gap-4">
                  {/* Song Image Placeholder */}
                  <div className="w-12 h-12 bg-gray-400 rounded-md"></div>
                  <span className="font-semibold">{song.title}</span>
                </td>
                <td className="py-3 px-4">{song.artist}</td>
                <td className="py-3 px-4">{song.album}</td>
                <td className="py-3 px-4">{song.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistPage;
