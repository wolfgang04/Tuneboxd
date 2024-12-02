import React, { useState, useEffect } from "react";

interface CarouselItemProps {
  src: string;
  alt: string;
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

  // Carousel items (image URLs)
  const items = [
    { src: "https://images.squarespace-cdn.com/content/v1/5b0dd7581aef1d319395b854/982a6fa3-8c2f-4a0b-b504-2d24e185b162/unnamed-10.jpg?format=1500w", alt: "Image 1" },
    { src: "https://media.pitchfork.com/photos/64c03880f653299579f89e96/1:1/w_320,c_limit/mitski-TheLandIsInhospitableAndSoAreWe.jpg", alt: "Image 2" },
    { src: "https://upload.wikimedia.org/wikipedia/en/d/dc/Clairo_-_Charm.png", alt: "Image 3" },
    { src: "https://upload.wikimedia.org/wikipedia/en/b/b1/Oasis_-_%28What%27s_The_Story%29_Morning_Glory_album_cover.jpg", alt: "Image 4" },
    { src: "https://upload.wikimedia.org/wikipedia/en/1/1a/Lana_Del_Rey_-_Lust_for_Life.png", alt: "Image 5" },
    { src: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png", alt: "Image 6" },
    { src: "https://upload.wikimedia.org/wikipedia/en/d/dc/Clairo_-_Charm.png", alt: "Image 7" },
    { src: "https://upload.wikimedia.org/wikipedia/en/d/dc/Clairo_-_Charm.png", alt: "Image 8" }
  ];

  const visibleItems = 3; 

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleItems >= items.length ? 0 : prevIndex + visibleItems
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleItems < 0
        ? items.length - visibleItems
        : prevIndex - visibleItems
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const intervalId = setInterval(handleNext, 10000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4"
        style={{
          transform: `translateX(-${(currentIndex / items.length) * 100}%)`,
          width: "100%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `calc(${100 / visibleItems}% - 16px)` }}
          >
            <div className="aspect-w-16 aspect-h-9">
              {/* Maintain consistent aspect ratio */}
              <CarouselItem src={item.src} alt={item.alt} />
            </div>
          </div>
        ))}
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
        {Array.from({ length: Math.ceil(items.length / visibleItems) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleItems)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index * visibleItems ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
