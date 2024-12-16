import React from "react";

interface Album {
  title: string;
  artist: string;
}

interface AlbumsProps {
  albums: Album[];
}

const Albums: React.FC<AlbumsProps> = ({ albums }) => (
  <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-2">Liked Albums</h3>
    <div className="flex gap-5 flex-wrap">
      {albums.map((album, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-end w-[230px] h-[230px] p-5 text-white rounded-3xl bg-stone-900"
        >
          <div className="text-2xl font-bold">{album.title}</div>
          <div className="text-base">{album.artist}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Albums;
