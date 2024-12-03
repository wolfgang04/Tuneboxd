import React from "react";

const Featured = () => {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Featured</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start pt-44 pr-12 pb-4 pl-5 w-full text-white rounded-3xl bg-stone-900 shadow-md hover:shadow-lg max-md:pt-24 max-md:pr-5 max-md:mt-2.5"
          >
            {/* Title */}
            <div
              data-layername="songTitle"
              className="text-2xl font-bold mb-2"
            >
              Title
            </div>
            {/* Artist Name */}
            <div
              data-layername="artistName"
              className="text-base text-right"
            >
              Artist Name
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
