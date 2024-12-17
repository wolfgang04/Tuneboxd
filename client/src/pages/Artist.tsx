import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../components/Song/Song";
import Songs from "../components/Artist/Songs";
import Albums from "../components/Artist/Albums";

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
    <Songs topSongs={topSongs} />
    <Albums albums={albums} />
  </div></div>;
};

export default Artist;
