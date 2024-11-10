import React from 'react';

interface RecommendedItem {
  title: string;
  subtitle: string;
}

const RecommendedItem: React.FC<RecommendedItem> = ({ title, subtitle }) => (
  <div className="flex flex-col flex-1 items-start pt-44 pr-12 pb-4 pl-5 rounded-3xl bg-stone-900 max-md:pt-24 max-md:pr-5">
    <div data-layername="title" className="text-2xl font-bold">{title}</div>
    <div data-layername="subtitle" className="text-base text-right">{subtitle}</div>
  </div>
);

const Recommended: React.FC = () => {
  const recommendedItems: RecommendedItem[] = [
    { title: "Song Title", subtitle: "Artist Name" },
    { title: "Album Name", subtitle: "Artist Name" },
    { title: "Playlist Title", subtitle: "Username" },
    { title: "Playlist Title", subtitle: "Username" },
    { title: "Title", subtitle: "Artist Name" },
    { title: "Title", subtitle: "Artist Name" },
  ];

  return (
    <section className="mt-16 max-md:mt-10">
      <h2 data-layername="recommendedForYou" className="self-start ml-11 text-4xl font-bold text-black max-md:ml-2.5">
        Recommended For You
      </h2>
      <div className="flex flex-wrap gap-2.5 self-center mt-5 w-full text-white max-w-[1520px] max-md:max-w-full">
        {recommendedItems.map((item, index) => (
          <RecommendedItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Recommended;