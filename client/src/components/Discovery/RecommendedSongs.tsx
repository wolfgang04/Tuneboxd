import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../../SERVER';

interface Props {
  rec: string[];
}

const RecommendedSongs: React.FC<Props> = ({ rec }) => {
  const [songs, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getRec = async () => {
    try {
      const res = await axios.get(`${server}spotify/recommend`, { params: { song: rec } });
      setRecommended(res.data.tracks.items.slice(0, 8));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch recommended songs');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rec.length > 0) {
      getRec();
    }
  }, [rec]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 cursor-pointer hover:underline" onClick={() => navigate("recommended-songs")}>Recommended Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-gray-200 rounded-md shadow-md hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-black rounded-md mr-4"
                style={{ backgroundImage: `url(${song.album.images[0].url})`, backgroundSize: "cover" }}
              ></div>
              <div className="flex-1">
                <p className="font-medium cursor-pointer hover:underline" onClick={() => navigate(`/track/${song.id}`, { state: song.name })}>{song.name}</p>
                <p className="text-sm text-gray-500 cursor-pointer hover:underline"
                  onClick={() => navigate(`/artist/${song.artists[0].id}`, { state: song.artists[0].name })}>{song.artists[0].name}</p>
              </div>
              <button className="text-gray-500 hover:text-black">&hellip;</button>
            </div>
          ))
        ) : (
          <p>No recommended songs available</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedSongs;
