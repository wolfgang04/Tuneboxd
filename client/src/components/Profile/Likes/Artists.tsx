import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Artists {
  artist_id: string;
  name: string;
  cover: string;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artists[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, [])

  const fetchArtists = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/artist/usersFollowed");

      setArtists(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return <div>
    <h3 className="text-2xl font-semibold mb-2">Liked Artists</h3>
    <div className="flex gap-5 flex-wrap">
      {artists.length > 0 ? artists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-xl font-semibold text-stone-900 max-md:mt-10"
          onClick={() => navigate(`/artist/${artist.artist_id}`, {state: artist.name})}
        >
          <div className="shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px] flex justify-center items-center"
            style={{ backgroundImage: `url(${artist.cover})` }}
          ></div>
          <div className="mt-6 text-center">{artist.name}</div>
        </div>
      )) : <p>No liked artists</p>}
    </div>
  </div>
};

export default Artists;
