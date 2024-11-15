import React from 'react';

interface ArtistItem {
  name: string;
}

const ArtistItem: React.FC<ArtistItem> = ({ name }) => (
  <div className="flex flex-col grow text-xl font-semibold text-right text-stone-900 max-md:mt-10">
    <div className="flex shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px]" />
    <div data-layername="artistName" className="self-center mt-7">
      {name}
    </div>
  </div>
);

const TopArtistsGrid: React.FC = () => {
  const topArtists: ArtistItem[] = [
    { name: "Artist Name" },
    { name: "Artist Name" },
    { name: "Artist Name" },
  ];

  return (
    <div data-layername="column" className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {topArtists.map((artist, index) => (
            <div key={index} data-layername="column" className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ArtistItem name={artist.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsGrid;