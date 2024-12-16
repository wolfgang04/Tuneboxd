import React from "react";

interface Artist {
  name: string;
}

interface ArtistsProps {
  artists: Artist[];
}

const Artists: React.FC<ArtistsProps> = ({ artists }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-2">Liked Artists</h3>
    <div className="flex gap-5 flex-wrap">
      {artists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-xl font-semibold text-stone-900 max-md:mt-10"
        >
          <div className="shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px] flex justify-center items-center"></div>
          <div className="mt-6 text-center">{artist.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Artists;
