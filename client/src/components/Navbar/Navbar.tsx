import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ProfileBtn from "./ProfileBtn";
import server from "../../SERVER";

const Navbar = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getUserImage = async () => {
    try {
      const res = await axios.get(`${server}user/image`, {
        withCredentials: true,
      });

      setUser(res.data[0].username);
      setUserImage(res.data[0].image);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserImage();
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
        <div className="flex items-center space-x-4">
          <span className="font-jersey text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Tuneboxd</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden space-x-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link underline" : "navbar-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/discovery"
            className={({ isActive }) =>
              isActive ? "navbar-link underline" : "navbar-link"
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "navbar-link underline" : "navbar-link"
            }
          >
            Community
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">

          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cabc297cbddaed741a7d0683949e38f49f3c127e9c8499c49bb38b12aa7f1dea?placeholderIfAbsent=true&apiKey=73641803e2624e9f9f9030f4043fd88e"
            className="my-auto aspect-[0.86] w-6 shrink-0 self-stretch object-contain"
            alt=""
          />
          <NavLink to="/Settings">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3861a12c399e50de32d67eb366c059b6c08c18b92c6f8039e484ab09bf099a8e?placeholderIfAbsent=true&apiKey=73641803e2624e9f9f9030f4043fd88e"
              className="my-auto aspect-[0.86] w-6 shrink-0 self-stretch object-contain"
              alt=""
            />
          </NavLink>
          {!isLoading && (
            <>
              <button onClick={() => toggleDropdown()}>
                <img
                  loading="lazy"
                  src={userImage || ""}
                  className="z-0 aspect-square w-[50px] shrink-0 self-stretch rounded-full object-contain"
                  alt=""
                />
              </button>

              {(isOpen && user !== null) && <ProfileBtn isOpen={isOpen} user={user!} />}
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
