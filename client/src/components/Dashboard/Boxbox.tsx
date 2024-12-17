import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../SERVER";

interface CarouselItemProps {
  src: string;
  alt: string;
}

interface topAlbums {
  id: string;
  cover: { url: string; width: number; height: number }[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({ src, alt }) => {
  return (
    <div className="w-full h-full bg-gray-300 rounded-3xl overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover" // Ensures image covers the space without distortion
      />
    </div>
  );
};

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topAlbums, setTopAlbums] = useState<topAlbums[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Carousel items (image URLs)
  const visibleItems = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleItems >= topAlbums!.length ? 0 : prevIndex + visibleItems
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleItems < 0
        ? topAlbums!.length - visibleItems
        : prevIndex - visibleItems
    );
  };

  // Auto-slide effect
  useEffect(() => {
    fetchTopAlbums();

    const intervalId = setInterval(handleNext, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchTopAlbums = async () => {
    try {
      const { ids, covers } = (await axios.get(`${server}lastfm/topArtistsAndAlbums`)).data;

      const combined = ids.map((id: number, index: number) => ({ id, cover: covers[index] }));
      const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 10);

      setTopAlbums(shuffled);
    } catch (error) {
      if (error instanceof Error)
        console.error("Error in fetchTopAlbums: ", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4"
        style={{
          transform: `translateX(-${(currentIndex / topAlbums!.length) * 100}%)`,
          width: "100%",
        }}
      >
        {isLoading === false ? topAlbums?.map((album, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `calc(${100 / visibleItems}% - 16px)` }}
          >
            <div className="aspect-w-16 aspect-h-9 cursor-pointer" onClick={() => navigate(`album/${album.id}`)}>
              {/* Maintain consistent aspect ratio */}
              <CarouselItem src={album.cover[0].url} alt={album.id} />
            </div>
          </div>
        )) : <div>Loading...</div>}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4 z-10">
        <button
          onClick={handlePrev}
          className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Previous"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Next"
        >
          Next
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {Array.from({ length: Math.ceil(topAlbums.length / visibleItems) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleItems)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${currentIndex === index * visibleItems ? "bg-blue-500" : "bg-gray-300"
                }`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
