import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MusicGenres = () => {
  const [genres, setGenres] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 6; // Number of items visible at a time
  const maxIndex = genres.length - itemsPerPage;
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    getGenres()
  }, [])
  
  const getGenres = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/lastfm/randomGenres");
      setGenres(res.data);
      console.log(res.data);
    } catch (error) {
      if (error instanceof Error)
      console.error("Error in getGenres: ", error.message);
    }
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 cursor-pointer hover:underline" onClick={() => navigate("genres")}>Music Genres</h2>
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

        {/* Genres with Animation */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out cursor-pointer"
          style={{
            transform: `translateX(-${currentIndex * 100 / itemsPerPage}%)`,
            width: `${genres.length * (100 / itemsPerPage)}%`,
          }}
        >
          {genres.map((genre, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-20 flex items-center justify-center text-white font-semibold rounded-xl bg-stone-900 shadow-md hover:shadow-lg"
              style={{ flex: `0 0 calc(100% / ${itemsPerPage} - 1rem)` }}
              onClick={() => navigate(`genres/${genre}`)}
            >
              {genre}
            </div>
          ))}
        </div>

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

export default MusicGenres;
