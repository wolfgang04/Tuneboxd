import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  titleID: string;
  artist: string;
  artistID: string;
  album: string;
  albumID: string;
  time: number;
  cover: string;
}

const Song: React.FC<Props> = ({
  title,
  artist,
  album,
  time,
  cover,
  artistID,
  titleID,
  albumID,
}) => {
  const navigate = useNavigate();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleViewArtist = async () => {
    navigate(`/artist/${artistID}`, { state: { artist } });
  };

  const handleViewAlbum = async () => {
    navigate(`/album/${albumID}`, { state: album });
  };

  const handleViewSong = async () => {
    navigate(`/track/${titleID}`, { state: title });
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
          <div className="hover:underline" onClick={() => handleViewSong()}>
            {title}
          </div>
        </div>
      </td>
      <td scope="row" className="font-normal">
        <div className="hover:underline" onClick={() => handleViewArtist()}>
          {artist}
        </div>
      </td>
      <td scope="row" className="font-normal">
        <div className="hover:underline" onClick={() => handleViewAlbum()}>
          {album}
        </div>
      </td>
      <td scope="row" className="font-normal">
        {formatDuration(time)}
      </td>
    </tr>
  );
};

export default Song;
