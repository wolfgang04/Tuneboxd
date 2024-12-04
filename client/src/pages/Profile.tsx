import React, { useEffect } from "react";
import UserProfile from "../components/Profile/UserProfile";
import Playlists from "../components/Profile/Playlists";
import Reviews from "../components/Profile/Reviews";
import CurrentlyListening from "../components/Profile/CurrentlyListening";
import axios from "axios";

export interface User {
  username: string;
  email: string;
  created_at: Date;
  image: string;
}

const Profile = () => {
  const [user, setUser] = React.useState<User>({
    username: "",
    email: "",
    created_at: new Date(),
    image: "",
  });

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/details", {
        withCredentials: true,
      });

      setUser(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-0 px-4 lg:grid-cols-4">
        <div className="border-gray border-r border-solid bg-white p-8">
          <UserProfile isCurrentUser={true} details={user} />
          <hr className="my-6 border-t border-gray-300" />
          <CurrentlyListening />
        </div>
        <div className="lg:col-span-3">
          <div className="ml-3 rounded-lg bg-white p-6">
            <Playlists />
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
