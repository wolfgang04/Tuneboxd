import { useCallback, useEffect, useState } from "react";
import UserProfile from "../components/Profile/UserProfile";
import Playlists from "../components/Profile/Playlists";
import Reviews from "../components/Profile/Reviews";
import axios from "axios";
import Navigation from "../components/Profile/Navigation";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Songs from "../components/Profile/Likes/Songs";
import Albums from "../components/Profile/Likes/Albums";
import Artists from "../components/Profile/Likes/Artists";
import server from "../SERVER";

export interface User {
  username: string;
  email: string;
  created_at: Date;
  image: string;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User[] | null>(null);
  const [isUser, setIsUser] = useState<string>("");
  const username = useLocation().pathname.split("/")[1];

  const fetchUserDetails = useCallback(async () => {
    try {
      const res = await axios.post(`${server}user/details`, { user: username }, {
        withCredentials: true,
      });
      const { data: user } = await axios.get(`${server}user/status`, { withCredentials: true });

      setUser(res.data);
      setIsUser(user.user);
    } catch (error) {
      console.error(error);
      setUser(null)
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserDetails();
  }, [username]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return <p>No User Found</p>;
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-0 px-4 lg:grid-cols-4">
          <div className="border-gray border-r border-solid bg-white p-8">
            <UserProfile currUser={isUser} details={user![0]} />
            <hr className="my-6 border-t border-gray-300" />
          </div>
          <div className="lg:col-span-3">
            <div className="ml-3 rounded-lg bg-white p-6">
              <Navigation />

              <Routes>
                <Route path="/" element={<Navigate to="reviews" />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="/likes/songs" element={<Songs />} />
                <Route path="/likes/albums" element={<Albums />} />
                <Route path="/likes/artists" element={<Artists />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
