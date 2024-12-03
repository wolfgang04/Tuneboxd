import React from "react";
import UserProfile from "../components/Profile/UserProfile";
import CurrentlyListening from "../components/Profile/currentlyListening";
import Playlists from "../components/Profile/Playlists";
import Reviews from "../components/Profile/Reviews";

const Profile = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 px-4">
        <div className="bg-white p-8 border-r border-solid border-gray">
          <UserProfile isCurrentUser={true} />
          <hr className="my-6 border-t border-gray-300" />
          <CurrentlyListening />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg p-6 ml-3">
            <Playlists />
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;