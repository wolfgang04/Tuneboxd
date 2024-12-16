import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExplorePlaylists: React.FC = () => {
  const playlists = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1, // Adding an ID for navigation
    title: `Playlist ${index + 1}`,
    username: `User ${index + 1}`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 5; // Number of playlists visible at a time
  const maxIndex = playlists.length - itemsPerPage;

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Explore Playlists</h2>
      <div className="relative flex items-center justify-between">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          className={`text-white text-xl px-2 py-1 rounded-full z-10 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
          disabled={currentIndex === 0}
        >
          ←
        </button>

        {/* Playlists with Animation */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            width: `${playlists.length * (100 / itemsPerPage)}%`,
          }}
        >
          {playlists.map((playlist) => (
            <Link
              to={`/playlists/${playlist.id}`} // Navigation to a dynamic route
              key={playlist.id}
              className="flex-shrink-0 w-full"
              style={{ flex: `0 0 calc(100% / ${itemsPerPage} - 1rem)` }}
            >
              {/* Playlist Box */}
              <div className="relative w-full h-36 bg-stone-900 rounded-2xl shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer">
                <div className="absolute bottom-2 left-2 right-2 text-white text-center">
                  <p className="text-sm font-semibold">{playlist.title}</p>
                  <p className="text-xs text-gray-300">{playlist.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className={`text-white text-xl px-2 py-1 rounded-full z-10 ${
            currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
          disabled={currentIndex === maxIndex}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ExplorePlaylists;
