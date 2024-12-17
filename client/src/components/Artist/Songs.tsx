import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../Song/Song";

const Songs: React.FC<{ topSongs: any }> = ({ topSongs }) => {
  const navigate = useNavigate();
  
  return <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">Popular Songs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {topSongs.map((song: any, index: number) => (
        <div
          key={index}
          className="flex flex-col justify-end bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
          style={{ height: "230px", backgroundImage: `url(${song.album.images[0].url})`, backgroundSize: "cover" }}
        >
          <div className="bg-black bg-opacity-50 p-3 w-full rounded-bl-3xl rounded-br-3xl">
            <div className="text-2xl font-bold truncate cursor-pointer hover:underline"
              onClick={() => navigate(`/track/${song.id}`)}
            >{song.name}</div>
            <div className="text-base text-gray-300"
            >{formatDuration(song.duration_ms)}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
}

export default Songs;