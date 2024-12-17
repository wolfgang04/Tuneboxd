import React from "react";

interface Song {
  title: string;
  Artist: string;
}

interface SongsProps {
  songs: Song[];
}

const Songs: React.FC<SongsProps> = ({ songs }) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2">Liked Songs</h3>
      <div className="flex gap-5 flex-wrap">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-end w-[230px] h-[230px] p-5 text-white rounded-3xl bg-stone-900"
          >
            <div className="text-2xl font-bold">{song.title}</div>
            <div className="text-base">{song.Artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Songs;
