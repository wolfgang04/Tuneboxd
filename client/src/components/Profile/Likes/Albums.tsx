import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Album {
  album_id: string,
  title: string,
  artist: string,
  artist_id: string,
  cover: string
}

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const user = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();
  

  useEffect(() => {
    getLikedAlbums()
  }, []);

  const getLikedAlbums = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/album/liked", { params: { user } });
      setAlbums(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error getting liked albums:", error.message);
      }
    }
  }

  return <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-2">Liked Albums</h3>
    <div className="flex gap-5 flex-wrap">
      {albums.length > 0 ? albums.map((album, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${album.cover})`, backgroundSize: "cover" }}
          className="flex flex-col items-start justify-end w-[230px] cursor-pointer h-[230px] p-5 text-white rounded-3xl bg-stone-900"
        >
          <div className="text-2xl font-bold cursor-pointer hover:underline"
            onClick={() => navigate(`/album/${album.album_id}`)}
          >{album.title}</div>
          <div className="text-base cursor-pointer hover:underline"
            onClick={() => navigate(`/artist/${album.artist_id}`, { state: album.artist })}
          >{album.artist}</div>
        </div>
      )) : <p>No liked albums</p>}
    </div>
  </div>
};

export default Albums;
