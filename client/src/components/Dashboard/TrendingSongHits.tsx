import React from "react";
import { useNavigate } from "react-router-dom";

interface TrendingSong {
  rank: string;
  title: string;
  artist: string;
  imageUrl: string;
  artistId: string;
  songId: string;
  song: string;
}

const TrendingSongItem: React.FC<TrendingSong> = ({
  rank,
  title,
  artist,
  imageUrl,
  artistId,
  songId,
  song,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-1 cursor-pointer flex-col items-start rounded-3xl bg-cover bg-center bg-no-repeat py-3.5 pl-5 pr-12 max-md:pr-5"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={() => navigate(`/track/${songId}`, { state: song })}
    >
      <div
        data-layername={rank}
        className="rounded-md bg-black/50 p-2 text-4xl text-white"
      >{`#${rank}`}</div>
      <div
        data-layername="title"
        className="text-20 mt-28 rounded-md bg-black/50 p-2 font-bold text-white max-md:mt-10"
      >
        {title}
      </div>
      <div
        data-layername="artistName"
        className="rounded-md bg-black/50 p-2 text-base text-white hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/artist/${artistId}`, { state: artist });
        }}
      >
        {artist}
      </div>
    </div>
  );
};

const TrendingSongHits: React.FC<{ trendingSongs: TrendingSong[] }> = ({
  trendingSongs,
}) => {
  return (
    <section className="mt-16 max-md:mt-10">
      <h2
        data-layername="trendingSongHits"
        className="ml-10 self-start text-4xl font-bold text-black max-md:ml-2.5"
      >
        Trending Song Hits
      </h2>
      <div className="mt-5 flex w-full max-w-[1520px] flex-wrap gap-2.5 self-center text-white max-md:max-w-full">
        {trendingSongs.map((song) => (
          <TrendingSongItem key={song.rank} {...song} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSongHits;
