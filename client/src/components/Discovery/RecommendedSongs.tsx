
import React from 'react';

const RecommendedSongs: React.FC = () => {
  const songs = Array.from({ length: 8 }, (_, index) => ({
    title: 'Song Title',
    artist: 'Artist Name',
  }));

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Recommended Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-200 rounded-md shadow-md hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-black rounded-md mr-4"></div>
            <div className="flex-1">
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
            <button className="text-gray-500 hover:text-black">&hellip;</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSongs;
