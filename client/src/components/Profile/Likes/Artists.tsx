import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import server from "../../../SERVER";

interface Artists {
  artist_id: string;
  name: string;
  cover: string;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artists[]>([])
  const username = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, [])

  const fetchArtists = async () => {
    try {
      const res = await axios.get(`${server}artist/usersFollowed`, { params: { user: username} });

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
          className="flex flex-col items-center text-xl font-semibold text-stone-900 max-md:mt-10 cursor-pointer hover:bg-gray-300 rounded-lg px-4 py-2 transition-colors duration-200"
          onClick={() => navigate(`/artist/${artist.artist_id}`, { state: artist.name })}
        >
          <div className="shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px] flex justify-center items-center"
            style={{ backgroundImage: `url(${artist.cover})`, backgroundSize: "cover" }}
          ></div>
          <div className="mt-6 text-center">{artist.name}</div>
        </div>
      )) : <p>No liked artists</p>}
    </div>
  </div>
};

export default Artists;
