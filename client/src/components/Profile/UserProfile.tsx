import React, { useEffect, useState } from "react";
import { User } from "../../pages/Profile";
import axios from "axios";
import { useLocation } from "react-router-dom";
import server from "../../SERVER";

interface UserProfileProps {
  currUser: string;
  details: User;
}

const UserProfile: React.FC<UserProfileProps> = ({
  currUser,
  details,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const user = useLocation().pathname.split("/")[1];
  const ownProfile = currUser === details.username;

  useEffect(() => {
    fetchUserDetails();
    followingStatus();
  }, [])

  const followingStatus = async () => {
    try {
      const res = await axios.post(
        `${server}follow/status`,
        { username: details.username }, { withCredentials: true }
      );

      if (res.data.length > 0) setIsFollowing(true);
      else setIsFollowing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async () => {
    if (ownProfile) {
      console.log(currUser);
    } else {
      try {
        const res = await axios.post(
          `${server}follow/follow`,
          {
            username: details.username,
          },
          { withCredentials: true },
        );
        const userFollowers = res.data.data.filter(
          (user: { following: string, follower: string }) => user.following === details.username);

        setFollowers(userFollowers.length);
        setIsFollowing(() => {
          if (res.data.msg === "Followed user") {
            return true;
          } else {
            return false;
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchUserDetails = async () => {
    try {
      const { data: followers } = await axios.get(`${server}follow/getFollowers`, { params: { user } });
      const { data: following } = await axios.get(`${server}follow/getfollowing`, { params: { user } });

      setFollowers(followers.followers.length);
      setFollowing(following.following.length);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <img
        src={details.image}
        alt="Profile Picture"
        className="mb-4 h-[200px] w-[200px] rounded-full bg-gray-300"
      />
      <h1 className="text-center text-xl font-bold">{user}</h1>
      <div className="mt-4 flex w-full justify-center gap-x-12 text-center">
        <div>
          <p className="font-bold">{followers}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <p className="font-bold">{following}</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>
      {!ownProfile && (
        <button
          onClick={() => handleAction()}
          className={`mt-6 rounded px-6 py-2 ${isFollowing ? "bg-black text-white" : "bg-black text-white"
            }`}
        >
          {isFollowing != null && (isFollowing ? "Unfollow" : "Follow")}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
