import React from 'react';
import Boxbox from './Boxbox';
import TopArtists from './TopArtists';
import TopArtistsGrid from './TopArtistsGrid';
import RecentListensGrid from './RecentListensGrid';

const MainContent: React.FC = () => {
  return (
    <section className="self-center mt-9 w-full max-w-[1521px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <Boxbox />
       <TopArtists/>
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-24 ml-10 max-w-full text-4xl font-bold text-black w-[1104px] max-md:mt-10">
        <h2 data-layername="recentListens">Recent Listens</h2>
        <h2 data-layername="yourTopArtists">Your Top Artists</h2>
      </div>
      <div className="mt-5 ml-10 w-full max-w-[1450px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <RecentListensGrid />
          <TopArtistsGrid />
        </div>
      </div>
    </section>
  );
};

export default MainContent;