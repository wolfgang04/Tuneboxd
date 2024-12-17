import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface Song {
  title: string;
  song_id: string;
  artist: string;
  artist_id: string;
  cover: string;
}

const Songs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const user = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs()
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/song/likes", { params: { user } });
      setLikedSongs(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2">Liked Songs</h3>
      <div className="flex gap-5 flex-wrap">
        {likedSongs.length > 0 ? likedSongs.map((song: Song, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${song.cover})`, backgroundSize: "cover" }}
            className="flex flex-col items-start justify-end w-[230px] h-[230px] p-5 text-white rounded-3xl"
          >
            <div className="text-2xl font-bold cursor-pointer hover:underline"
            onClick={() => navigate(`/track/${song.song_id}`)}
            >{song.title}</div>
            <div className="text-base cursor-pointer hover:underline"
            onClick={() => navigate(`/artist/${song.artist_id}`, {state: song.artist})}
            >{song.artist}</div>
          </div>
        )): <p>No Liked Songs</p>}
      </div>
    </div>
  );
};

export default Songs;
