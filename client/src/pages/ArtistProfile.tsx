import React, { useState } from "react";

const ArtistProfile: React.FC = () => {
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

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(artistData.followers);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      setFollowerCount((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
  };

  return (
    <div className="mx-auto max-w-5xl p-8 bg-white rounded-lg mt-10">

      <div className="flex flex-col md:flex-row md:items-center md:gap-8">

        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={artistData.imageUrl}
            alt={`${artistData.name} Profile`}
            className="w-48 h-48 bg-gray-300 rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{artistData.name}</h1>
          <p className="text-sm text-gray-600 mt-2 max-w-lg">{artistData.bio}</p>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            
            <div className="flex gap-12">
              <div className="text-center">
                <p className="font-bold text-xl">{followerCount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">160</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>

            <button
              onClick={handleFollowToggle}
              className={`mt-2 sm:mt-0 py-2 px-6 rounded transition-colors duration-200 ${
                isFollowing
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Songs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artistData.songs.map((song, index) => (
            <div
              key={index}
              className="flex flex-col justify-end p-5 bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
              style={{ height: "230px" }}
            >
              <div className="text-2xl font-bold truncate">{song.title}</div>
              <div className="text-base text-gray-300">{song.duration}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Albums</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artistData.albums.map((album, index) => (
            <div
              key={index}
              className="flex flex-col justify-end p-5 bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
              style={{ height: "230px" }}
            >
              <div className="text-2xl font-bold truncate">{album.title}</div>
              <div className="text-base text-gray-300">{album.artist}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistProfile;
