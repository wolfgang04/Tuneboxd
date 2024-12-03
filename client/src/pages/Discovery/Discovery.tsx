import React from "react";
import MusicGenres from '../../components/Discovery/MusicGenres';
import Featured from '../../components/Discovery/Featured';
import RecommendedSongs from '../../components/Discovery/RecommendedSongs';
import ExplorePlaylists from '../../components/Discovery/ExplorePlaylists';

const Discovery = () => {
  return (
    <div className="px-6 py-4 w-full overflow-x-hidden"> {/* Prevent horizontal scrolling */}
      {/* Featured Section */}
      <section className="mb-12">
        <Featured />
      </section>

      {/* Music Genres Section */}
      <section className="mb-12">
        <MusicGenres />
      </section>

      {/* Recommended Songs Section */}
      <section className="mb-12">
        <RecommendedSongs />
      </section>

      {/* Explore Playlists Section */}
      <section>
        <ExplorePlaylists />
      </section>
    </div>
  );
};

export default Discovery;
