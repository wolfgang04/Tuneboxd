import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../components/Song/Song";

const Artist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [relatedArtists, setRelatedArtists] = useState<any>([]);
  const [artist, setArtist] = useState<any>({});
  const [topSongs, setTopSongs] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const location = useLocation();
  const artistID = location.pathname.slice(8);
  const artistName = location.state.artist;
  const navigate = useNavigate();

  const artistData = {
    name: "Artist",
    bio: "Artist is an indie musician from Canada.",
    imageUrl:
      "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg",
    followers: 12345,
    songs: [
      { title: "Song Title", duration: "3:51" },
      { title: "Song Title", duration: "3:39" },
      { title: "Song Title", duration: "3:41" },
    ],
    albums: [
      { title: "Album Title", artist: "Artist" },
      { title: "Album Title", artist: "Artist" },
      { title: "Album Title", artist: "Artist" },
    ],
  };

  const fetchArtist = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/spotify/artist",
        {
          params: { artist: artistName, id: artistID },
        },
      );
      const { data: relatedArtists } = await axios.get(
        "http://localhost:8080/api/spotify/relatedArtists",
        { params: { id: artistID } },
      );
      setArtist(data);

      const { data: popSongs } = await axios.get("http://localhost:8080/api/spotify/search", { params: { searchQuery: data.about.name } });
      setTopSongs(popSongs.tracks.items);
      const { data: topAlbums } = await axios.get("http://localhost:8080/api/spotify/artistTopAlbums", { params: { artistId: artistID } })
      console.log(artist);

      setAlbums(topAlbums.items);
      setRelatedArtists(relatedArtists);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [artistID, artistName]);

  useEffect(() => {
    fetchArtist();
  }, [artistID, fetchArtist]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div className=""><div className="mx-auto max-w-5xl p-8 bg-white rounded-lg mt-10">
    <div className="flex flex-col md:flex-row md:items-center md:gap-8">
      <div className="flex-shrink-0 mb-6 md:mb-0">
        <img
          src={artist.about.images[0].url}
          alt={`${artistData.name} Profile`}
          className="w-48 h-48 bg-gray-300 rounded-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">{artist.about.name}</h1>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">

          <div className="flex gap-12">
            <div className="text-center">
              <p className="font-bold text-xl">{artist.about.followers.total}</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
          </div>

          {/* <button
            onClick={handleFollowToggle}
            className={`mt-2 sm:mt-0 py-2 px-6 rounded transition-colors duration-200 ${isFollowing
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button> */}
        </div>
      </div>
    </div>

    <hr className="my-10 border-gray-200" />

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Popular Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topSongs.map((song: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-end bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
            style={{ height: "230px", backgroundImage: `url(${song.album.images[0].url})`, backgroundSize: "cover" }}
          >
            <div className="bg-black bg-opacity-50 p-3 w-full rounded-bl-3xl rounded-br-3xl">
              <div className="text-2xl font-bold truncate cursor-pointer hover:underline"
                onClick={() => navigate(`/track/${song.id}`)}
              >{song.name}</div>
              <div className="text-base text-gray-300"
              >{formatDuration(song.duration_ms)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-6">Albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album: any, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-end bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
            style={{ height: "230px", backgroundImage: `url(${album.images[0].url})`, backgroundSize: "cover" }}
          ><div className="bg-black bg-opacity-50 p-3 w-full rounded-bl-3xl rounded-br-3xl">
              <div className="text-base text-gray-300 text-white font-bold cursor-pointer hover:underline"
                onClick={() => navigate(`/album/${album.id}`, { state: { album: album.name } })}
              >{album.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div></div>;
};

export default Artist;
