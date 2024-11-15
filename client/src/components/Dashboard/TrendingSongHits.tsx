import React from 'react';

interface TrendingSong {
  rank: string;
  title: string;
  artist: string;
}

const TrendingSongItem: React.FC<TrendingSong> = ({ rank, title, artist }) => (
  <div className="flex flex-col flex-1 items-start py-3.5 pr-12 pl-5 text-right rounded-3xl bg-stone-900 max-md:pr-5">
    <div data-layername={rank} className="text-4xl">#{rank}</div>
    <div data-layername="title" className="mt-28 text-2xl font-bold max-md:mt-10">{title}</div>
    <div data-layername="artistName" className="text-base">{artist}</div>
  </div>
);

const TrendingSongHits: React.FC = () => {
  const trendingSongs: TrendingSong[] = [

    { rank: "01", title: "Title", artist: "Artist Name" },
    { rank: "02", title: "Title", artist: "Artist Name" },
    { rank: "03", title: "Title", artist: "Artist Name" },
    { rank: "04", title: "Title", artist: "Artist Name" },
    { rank: "05", title: "Title", artist: "Artist Name" },
    { rank: "06", title: "Title", artist: "Artist Name" },
  ];

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