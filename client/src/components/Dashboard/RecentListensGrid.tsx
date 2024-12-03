import React from 'react';

interface ListenItem {
  title: string;
  artist: string;
  imageUrl: string; // New prop for image
}

const ListenItem: React.FC<ListenItem> = ({ title, artist, imageUrl }) => (
  <div 
    className="flex flex-col grow items-start pt-44 pr-12 pb-4 pl-5 w-full text-white rounded-3xl bg-cover bg-center bg-no-repeat max-md:pt-24 max-md:pr-5 max-md:mt-2.5" // Added border classes
    style={{ backgroundImage: `url(${imageUrl})` }} // Dynamic background image
  >
    <div data-layername="songTitle" className="text-2xl font-bold bg-black/50 p-2 rounded-md">
      {title}
    </div>
    <div data-layername="artistName" className="text-base text-right bg-black/50 p-1 rounded-md">
      {artist}
    </div>
  </div>
);

const RecentListensGrid: React.FC = () => {
  const recentListens: ListenItem[] = [
    { title: "Francesca", artist: "Hozier", imageUrl: "https://images.squarespace-cdn.com/content/v1/5b0dd7581aef1d319395b854/982a6fa3-8c2f-4a0b-b504-2d24e185b162/unnamed-10.jpg?format=1500w" },
    { title: "Locking in", artist: "Harat0x", imageUrl: "https://themoodguide.com/wp-content/uploads/2022/03/antique-dark-academia-books-aesthetic.jpg" },
    { title: "Cherry Wine", artist: "Hozier", imageUrl: "https://e-cdns-images.dzcdn.net/images/cover/8442e9ac0227a07b00c9dfd0ec00032d/500x500-000000-80-0-0.jpg" },
  ];

  return (
    <div data-layername="column" className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {recentListens.map((item, index) => (
            <div key={index} data-layername="column" className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ListenItem title={item.title} artist={item.artist} imageUrl={item.imageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListensGrid;
