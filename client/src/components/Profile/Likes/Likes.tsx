import React, { useEffect, useState } from "react";
import Songs from "./Songs";
import Albums from "./Albums";
import Artists from "./Artists";

const Likes: React.FC = () => {
  const [songs, setSongs] = useState<{ title: string; Artist: string }[]>([]);
  const [albums, setAlbums] = useState<{ title: string; artist: string }[]>([]);
  const [artists, setArtists] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const songData = [
      { title: "Song 1", Artist: "Artist 1" },
      { title: "Song 2", Artist: "Artist 2" },
      { title: "Song 3", Artist: "Artist 3" },
      { title: "Song 4", Artist: "Artist 4" },
      { title: "Song 5", Artist: "Artist 5" },
    ];
    const albumData = [
      { title: "Album 1", artist: "Artist 1" },
      { title: "Album 2", artist: "Artist 2" },
      { title: "Album 3", artist: "Artist 3" },
      { title: "Album 4", artist: "Artist 4" },
    ];
    const artistData = [
      { name: "Artist 1" },
      { name: "Artist 2" },
      { name: "Artist 3" },
    ];

    setSongs(songData);
    setAlbums(albumData);
    setArtists(artistData);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-4">Likes</h2>
      <Songs songs={songs} />
      <Albums albums={albums} />
      <Artists artists={artists} />
    </div>
  );
};

export default Likes;
