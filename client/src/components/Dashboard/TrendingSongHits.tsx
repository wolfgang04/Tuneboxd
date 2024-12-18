import React from 'react';
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
      navigate(`/artist/${artistId}`, {state: artist});
    }}>{artist}</div>
  </div>
};

const TrendingSongHits: React.FC<{ trendingSongs: TrendingSong[] }> = ({ trendingSongs }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-16 max-md:mt-10">
      <h2 data-layername="trendingSongHits" className="self-start ml-10 text-4xl font-bold text-black max-md:ml-2.5">
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
