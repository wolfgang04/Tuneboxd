import React from "react";

const CurrentlyListening = () => {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">Currently Listening to</p>
      <div className="flex items-center bg-gray-200 p-4 rounded">
        <div className="w-10 h-10 mr-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/26/26276.png"
            alt="Currently Listening"
          />
        </div>
        <div>
          <p className="text-sm font-bold">Song Title</p>
          <p className="text-sm text-gray-600">Artist Name</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyListening;