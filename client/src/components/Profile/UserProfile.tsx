import React, { useEffect, useState } from "react";
import { User } from "../../pages/Profile";
import axios from "axios";

interface UserProfileProps {
  isCurrentUser: boolean;
  details: User;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isCurrentUser,
  details,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [count, setCount] = useState({ followers: 0, following: 0 });

  useEffect(() => {
    fetchUserDetails();
  }, [])
  
  const fetchUserDetails = async () => {
    try {
      const { data: followers } = await axios.get("http://localhost:8080/api/follow/getFollowers", { withCredentials: true });
      const { data: following } = await axios.get("http://localhost:8080/api/follow/getfollowing", { withCredentials: true });

      setCount({ followers: followers.followers.length, following: following.following.length });
    } catch (error) {
      console.error(error);
    }
  }

  const handleFollowToggle = () => {
    // setIsFollowing(!isFollowing);
    // setFollowerCount((prevCount) =>
    //   isFollowing ? prevCount - 1 : prevCount + 1,
    // );
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={details.image}
        alt="Profile Picture"
        className="mb-4 h-[200px] w-[200px] rounded-full bg-gray-300"
      />
      <h1 className="text-center text-xl font-bold">{details.username}</h1>
      <div className="mt-4 flex w-full justify-center gap-x-12 text-center">
        <div>
          <p className="font-bold">{count.followers}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <p className="font-bold">{count.following}</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>
      {!isCurrentUser && (
        <button
          onClick={handleFollowToggle}
          className={`mt-6 rounded px-6 py-2 ${isFollowing ? "bg-black text-white" : "bg-black text-white"
            }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
