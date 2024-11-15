import React from 'react';

interface ListenItem {
  title: string;
  artist: string;
}

const ListenItem: React.FC<ListenItem> = ({ title, artist }) => (
  <div className="flex flex-col grow items-start pt-44 pr-12 pb-4 pl-5 w-full text-white rounded-3xl bg-stone-900 max-md:pt-24 max-md:pr-5 max-md:mt-2.5">
    <div data-layername="songTitle" className="text-2xl font-bold">
      {title}
    </div>
    <div data-layername="artistName" className="text-base text-right">
      {artist}
    </div>
  </div>
);

const RecentListensGrid: React.FC = () => {
  const recentListens: ListenItem[] = [
    { title: "Song Title", artist: "Artist Name" },
    { title: "Playlist Title", artist: "Username" },
    { title: "Song Title", artist: "Artist Name" },
  ];

  return (
    <div data-layername="column" className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {recentListens.map((item, index) => (
            <div key={index} data-layername="column" className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ListenItem title={item.title} artist={item.artist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListensGrid;