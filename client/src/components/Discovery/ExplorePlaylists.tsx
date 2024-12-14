import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExplorePlaylists: React.FC = () => {
  const navigate = useNavigate();
  
  const playlists = Array.from({ length: 10 }, (_, index) => ({
    title: "Playlist Title",
    username: "Username",
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
      <h2 className="text-xl font-semibold mb-4 cursor-pointer hover:underline" onClick={() => navigate("explore-playlists")}>Explore Playlists</h2>
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-xl px-2 py-1 rounded-full z-10 bg-black shadow-md ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
          disabled={currentIndex === 0}
        >
          ←
        </button>

        {/* Playlists with Animation */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            width: `${playlists.length * (100 / itemsPerPage)}%`,
          }}
        >
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
              style={{ flex: `0 0 calc(100% / ${itemsPerPage} - 0.5rem)` }} // Smaller gap
            >
              {/* Playlist Box */}
              <div className="relative w-36 h-36 bg-stone-900 rounded-2xl shadow-md hover:shadow-lg">
                {/* Title and Username */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-sm font-semibold">{playlist.title}</p>
                  <p className="text-xs text-gray-300">{playlist.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-xl px-2 py-1 rounded-full z-10 bg-black shadow-md ${
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
