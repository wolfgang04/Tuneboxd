import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../components/Song/Song";

interface Song {
  name: string;
  duration_ms: number;
  id: string;
}

const Album = () => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<any>({});
  const location = useLocation();
  const albumID = location.pathname.slice(7);
  const navigate = useNavigate();

  const fetchAlbum = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/spotify/album",
        {
          params: { id: albumID },
        },
      );

      setAlbum(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [albumID]);

  useEffect(() => {
    fetchAlbum();
    fetchIsLiked();
  }, [albumID, fetchAlbum]);

  const handleLike = async () => {
    const Album = {
      title: album.name,
      artist: album.artists[0].name,
      artist_id: album.artists[0].id,
      cover: album.images[0].url,
      album_id: albumID,
      release_date: album.release_date,
    };

    if (!isLiked) {
      try {
        await axios.post(
          "http://localhost:8080/api/album/like",
          { ...Album },
          { withCredentials: true }
        );

        setIsLiked(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(
          "http://localhost:8080/api/album/unlike",
          { album_id: albumID },
          { withCredentials: true }
        );

        setIsLiked(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const fetchIsLiked = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/album/isLiked",
        { album_id: albumID },
        { withCredentials: true }
      );

      setIsLiked(data);
    } catch (error) {
      console.error(error);
    }
  },[])

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!album) {
    return <p>No album data available</p>;
  }

  return <> <div></div>
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex items-center justify-start p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg">
        <img
          src={album.images[0].url}
          alt="Album Cover"
          className="w-64 h-64 object-cover rounded-lg shadow-2xl border-4 border-gray-700"
        />
        <div className="ml-8">
          <h1 className="text-6xl font-bold mb-4 text-white">{album.name}</h1>
          <p className="text-2xl text-gray-400 mb-2 cursor-pointer hover:underline"
            onClick={() => navigate(`/artist/${album.artists[0].id}`, {state: album.artists[0].name})}
          >{album.artists[0].name}</p>
          <p className="text-sm mb-5 text-gray-500">Released on {album.release_date}</p>
            <button
            onClick={() => handleLike()}
            className={`mt-2 sm:mt-0 py-2 px-6 rounded transition-colors duration-200 ${isLiked
              ? "bg-gray-300 text-black hover:bg-gray-400"
              : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
            {isLiked !== null && (isLiked ? "Unlike" : "Like")}
            </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-semibold mb-4 text-gray-100">Songs</h2>
        <ul className="divide-y divide-gray-700">
          {album.tracks.items.map((song: Song, index: number) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between py-4 px-6 hover:bg-gray-800 rounded-md transition duration-300 cursor-pointer"
                onClick={() => navigate(`/track/${song.id}`)}
              >
                <div>
                  <p className="text-lg font-medium text-gray-200">{song.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatDuration(song.duration_ms)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </>
};

export default Album;
