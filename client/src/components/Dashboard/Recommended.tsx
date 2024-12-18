import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RecommendedItem {
  song: string;
  artist: string;
  image: string; // Add imageUrl prop
  song_id: string;
}

interface Props {
  rec: string[];
}

const RecommendedItem: React.FC<RecommendedItem> = ({ song, artist, image, song_id }) => {
  const navigate = useNavigate();

  return <div
    className="flex flex-col flex-1 items-start pt-44 pr-12 pb-4 pl-5 rounded-3xl bg-cover bg-center bg-no-repeat max-md:pt-24 max-md:pr-5"
    style={{ backgroundImage: `url(${image})` }} // Set background image dynamically
  // Pass song_id and song as state
  >
    <div data-layername="title" className="text-20 font-bold text-white bg-black/50 p-2 rounded-md cursor-pointer hover:underline"
      onClick={() => navigate(`track/${song_id}`, { state: song })}>{song}</div>
    <div data-layername="subtitle" className="text-base text-white bg-black/50 p-2 rounded-md"
    >{artist}</div>
  </div>
};

const Recommended: React.FC<Props> = ({ rec }) => {
  const [recommended, setRecommended] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRec = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/spotify/recommend", { params: { song: rec } });
      console.log(data);
      setRecommended(data.tracks.items.slice(0, 6));
    } catch (error) {
      console.error(error);
      setError('Failed to fetch recommended songs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRec();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="mt-16 max-md:mt-10">
      <h2 data-layername="recommendedForYou" className="self-start ml-11 text-4xl font-bold text-black max-md:ml-2.5">
        Recommended For You
      </h2>
      <div className="flex flex-wrap gap-2.5 self-center mt-5 w-full text-white max-w-[1520px] max-md:max-w-full">
        {recommended.map((item, index) => (
          <RecommendedItem
            key={index} song={item.name}
            artist={item.artists[0].name}
            image={item.album.images[0].url}
            song_id={item.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Recommended;
