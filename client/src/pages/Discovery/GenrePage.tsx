import React from "react";
import { useParams } from "react-router-dom";

const GenrePage: React.FC = () => {
  const { genre } = useParams(); // Get genre from the URL parameter
  const genreName = genre?.replace("-", " "); // Format the genre name

  const songs = Array.from({ length: 10 }, (_, index) => ({
    title: `Song ${index + 1}`,
    artist: `Artist ${index + 1}`,
    album: `Album ${index + 1}`,
    time: "3:30",
  }));

  return (
    <section className="mb-12 px-6">
      <h2 className="text-2xl font-semibold mb-4">{genreName} Songs</h2>
      <div className="space-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-stone-900 p-4 rounded-xl shadow-md hover:shadow-lg"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-stone-700 rounded-md mr-4"></div>
              <div>
                <p className="text-white font-semibold">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">{song.album}</p>
              <p className="text-sm text-gray-400">{song.time}</p>
            </div>
            <button className="text-white">...</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenrePage;
