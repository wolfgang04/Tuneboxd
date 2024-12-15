import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TrendingSong {
  rank: string;
  title: string;
  artist: string;
  imageUrl: string;
  artistId: string;
  songId: string;
  song: string;
}

const TrendingSongItem: React.FC<TrendingSong> = ({ rank, title, artist, imageUrl, artistId, songId, song }) => {
  const navigate = useNavigate();

  return <div
    className="flex flex-col flex-1 items-start py-3.5 pr-12 pl-5 rounded-3xl bg-cover bg-center bg-no-repeat max-md:pr-5 cursor-pointer"
    style={{ backgroundImage: `url(${imageUrl})` }}
    onClick={() => navigate(`/track/${songId}`, { state: song  })}
  >
    <div data-layername={rank} className="text-4xl text-white bg-black/50 p-2 rounded-md">{`#${rank}`}</div>
    <div data-layername="title" className="mt-28 text-20 font-bold text-white max-md:mt-10 bg-black/50 p-2 rounded-md">{title}</div>
    <div data-layername="artistName" className="text-base text-white bg-black/50 p-2 rounded-md hover:underline"
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/artist/${artistId}`);
    }}>{artist}</div>
  </div>
};

const TrendingSongHits: React.FC = () => {
  const [trendingSongs, setTrendingSongs] = React.useState<TrendingSong[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingSongs()
  }, []);

  const fetchTrendingSongs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/lastfm/topSongs");
      const songs = data.song.tracks.track.slice(0, 6);
      const songNames = songs.map((song: any) => song.name);

      const { data: topData } = await axios.get("http://localhost:8080/api/spotify/featuredSongs", { params: { featured: songNames } });
      setTrendingSongs(topData.tracks.map((track: any, index: number) => {
        return {
          rank: `${index + 1}`.padStart(2, '0'),
          title: track.name,
          artist: track.artists[0].name,
          imageUrl: track.album.images[0].url,
          artistId: track.artists[0].id,
          songId: track.id,
          song: track.name
        }
      }));

    } catch (error) {
      console.error("Error fetching trending songs: ", error);
    }
  }

  return (
    <section className="mt-16 max-md:mt-10">
      <h2 data-layername="trendingSongHits" className="self-start ml-10 text-4xl font-bold text-black max-md:ml-2.5 cursor-pointer hover:underline" onClick={() => navigate("/trending-songs")}>
        Trending Song Hits
      </h2>
      <div className="flex flex-wrap gap-2.5 self-center mt-5 w-full text-white max-w-[1520px] max-md:max-w-full">
        {trendingSongs.map((song) => (
          <TrendingSongItem key={song.rank} {...song} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSongHits;
