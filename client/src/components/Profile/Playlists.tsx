import React, { useEffect, useState } from "react";

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<{ title: string; likes: number }[]>([]);

  // Simulate fetching data from backend
  useEffect(() => {
    // Placeholder data
    const data = [
      { title: "Playlist 1", likes: 60 },
      { title: "Playlist 2", likes: 86 },
      { title: "Playlist 3", likes: 14 },
      { title: "Playlist 4", likes: 7 },
    ];
    setPlaylists(data);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Playlists</h2>
      <div className="flex gap-5 flex-wrap">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="flex flex-col grow items-start pt-44 pr-12 pb-4 pl-5 w-[230px] text-white rounded-3xl bg-stone-900 max-md:pt-24 max-md:pr-5"
          >
            <div data-layername="playlistTitle" className="text-2xl font-bold">
              {playlist.title}
            </div>
            <div data-layername="playlistLikes" className="text-base text-right">
              {playlist.likes} Likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;