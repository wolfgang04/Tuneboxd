import React from "react";

const AlbumPage = () => {
  // Example album data
  const album = {
    title: "1989",
    artist: "Taylor Swift",
    coverImage:
      "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png", // HTTPS image link
    releaseDate: "October 27, 2014",
    songs: [
      { title: "Welcome to New York", duration: "3:32" },
      { title: "Blank Space", duration: "3:51" },
      { title: "Style", duration: "3:51" },
      { title: "Out of the Woods", duration: "3:55" },
      { title: "All You Had to Do Was Stay", duration: "3:13" },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-start p-10 bg-gradient-to-b from-gray-800 to-black shadow-lg">
        <img
          src={album.coverImage}
          alt="Album Cover"
          className="w-64 h-64 object-cover rounded-lg shadow-2xl border-4 border-gray-700"
        />
        <div className="ml-8">
          <h1 className="text-6xl font-bold mb-4 text-white">{album.title}</h1>
          <p className="text-2xl text-gray-400 mb-2">{album.artist}</p>
          <p className="text-sm text-gray-500">Released on {album.releaseDate}</p>
        </div>
      </div>

      {/* Song List */}
      <div className="max-w-5xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-semibold mb-4 text-gray-100">Songs</h2>
        <ul className="divide-y divide-gray-700">
          {album.songs.map((song, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-4 px-6 hover:bg-gray-800 rounded-md transition duration-300"
            >
              <div>
                <p className="text-lg font-medium text-gray-200">{song.title}</p>
                <p className="text-sm text-gray-500">{song.duration}</p>
              </div>
              <button
                className="bg-gray-700 text-gray-200 px-5 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => alert(`Playing ${song.title}`)}
              >
                Play
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumPage;