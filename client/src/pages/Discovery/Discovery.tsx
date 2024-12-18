import { useEffect, useState } from "react";
import MusicGenres from '../../components/Discovery/MusicGenres';
import Featured from '../../components/Discovery/Featured';
import RecommendedSongs from '../../components/Discovery/RecommendedSongs';
import axios from "axios";

const Discovery = () => {
  const [topNames, setTopNames] = useState<any[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<string[]>([]);

  useEffect(() => {
    fetchTopSongs();
  }, []);

  const fetchTopSongs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/lastfm/topSongs");
      if (data.song && data.song.tracks && Array.isArray(data.song.tracks.track)) {
        const songs = data.song.tracks.track.slice(0, 5);
        const songNames = songs.map((song: any) => song.name);
        setRecommendedSongs(songNames);

        const { data: topData } = await axios.get("http://localhost:8080/api/spotify/featuredSongs", { params: { featured: songNames } });
        setTopNames(topData.tracks);
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="px-6 py-4 w-full overflow-x-hidden"> {/* Prevent horizontal scrolling */}
      {/* Featured Section */}
      <section className="mb-12">
        <Featured songs={topNames} />
      </section>

      {/* Music Genres Section */}
      <section className="mb-12">
        <MusicGenres />
      </section>

      {/* Recommended Songs Section */}
      <section className="mb-12">
        <RecommendedSongs rec={recommendedSongs} />
      </section>
    </div>
  );
};

export default Discovery;