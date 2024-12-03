import React, { useState } from "react";

interface UserProfileProps {
  isCurrentUser: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ isCurrentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(234);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prevCount) => (isFollowing ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"
        alt="Profile Picture"
        className="w-[200px] h-[200px] bg-gray-300 rounded-full mb-4"
      />
      <h1 className="text-xl font-bold text-center">Username</h1>
      <div className="flex justify-center mt-4 w-full text-center gap-x-12">
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
          className={mt-6 py-2 px-6 rounded ${
            isFollowing ? "bg-black text-white" : "bg-black text-white"
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;