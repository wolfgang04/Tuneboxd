import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../Song/Song";

const Songs: React.FC<{ topSongs: any }> = ({ topSongs }) => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Popular Songs</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {topSongs.map((song: any) => {
          const imageUrl = song.album.images[0]?.url || "";
          return (
            <div
              key={song.id} // Ensure the key is unique
              className="flex flex-col justify-end rounded-3xl bg-stone-900 text-white transition-colors duration-200 hover:bg-stone-800"
              style={{
                height: "230px",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
              }}
            >
              <div className="w-full rounded-bl-3xl rounded-br-3xl bg-black bg-opacity-50 p-3">
                <div
                  className="cursor-pointer truncate text-2xl font-bold hover:underline"
                  onClick={() => navigate(`/track/${song.id}`)}
                >
                  {song.name}
                </div>
                <div className="text-base text-gray-300">
                  {formatDuration(song.duration_ms)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Songs;
