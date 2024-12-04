import React, { useState } from "react";
import { User } from "../../pages/Profile";

interface UserProfileProps {
  isCurrentUser: boolean;
  details: User;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isCurrentUser,
  details,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(234);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1,
    );
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"
        alt="Profile Picture"
        className="mb-4 h-[200px] w-[200px] rounded-full bg-gray-300"
      />
      <h1 className="text-center text-xl font-bold">{details.username}</h1>
      <div className="mt-4 flex w-full justify-center gap-x-12 text-center">
        <div>
          <p className="font-bold">{followerCount}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <p className="font-bold">160</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>
      {!isCurrentUser && (
        <button
          onClick={handleFollowToggle}
          className={`mt-6 rounded px-6 py-2 ${
            isFollowing ? "bg-black text-white" : "bg-black text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
