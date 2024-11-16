import React from "react";

interface Props {
  title: string;
  artist: string;
  album: string;
  time: number;
  cover: string;
}

const Song: React.FC<Props> = ({ title, artist, album, time, cover }) => {
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <tr className="mb-4 cursor-pointer bg-[#D9D9D9] text-left hover:bg-[#b9b9b9]">
      <td scope="row">
        <div className="flex items-center gap-5 p-3 font-bold">
          <img
            src={cover}
            alt="album cover"
            className="h-20 w-auto rounded-lg"
          />
          {title}
        </div>
      </td>
      <td scope="row" className="font-normal">
        {artist}
      </td>
      <td scope="row" className="font-normal">
        {album}
      </td>
      <td scope="row" className="font-normal">
        {formatDuration(time)}
      </td>
    </tr>
  );
};

export default Song;
