import React from 'react';

interface ArtistItem {
  name: string;
  imageUrl: string; // New prop for image URL
}

const ArtistItem: React.FC<ArtistItem> = ({ name, imageUrl }) => (
  <div className=" flex-col grow text-xl font-semibold  text-stone-900 max-md:mt-10">
    <div className=" shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px] overflow-hidden justify-center ">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div data-layername="artistName" className=" mt-6 text-center">
      {name}
    </div>
  </div>
);

const TopArtistsGrid: React.FC = () => {
  const topArtists: ArtistItem[] = [
    { name: "Hozier", imageUrl: "https://yt3.googleusercontent.com/IgZ96dSARfh3BR49o9qcJ5xuNXKSZzCF7fmrKi-9TLdidEl1u13io-uM0oOyEVdSI1Ryt0Q_lA=s900-c-k-c0x00ffffff-no-rj" },
    { name: "Lana del Ray", imageUrl: "https://i.scdn.co/image/ab67616100005174b99cacf8acd5378206767261" },
    { name: "Mitski", imageUrl: "https://yt3.googleusercontent.com/w23P-nr7I2D7Qjb8UhGEQIl-TWJpxjXmuHuqOam8WjSHsFWn0TUe3CtUr3d-At4C0Eog5gUrIg=s900-c-k-c0x00ffffff-no-rj" },
  ];

  return (
    <div data-layername="column" className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col items-center">
          {topArtists.map((artist, index) => (
            <div key={index} data-layername="column" className="items-center flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ArtistItem name={artist.name} imageUrl={artist.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsGrid;
