import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ProfileBtn from "./ProfileBtn";
import server from "../../SERVER";

const Navbar = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
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
          {/* Search Bar */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="16.5" y1="16.5" x2="22" y2="22"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="rounded-full bg-gray-100 py-1 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            />
          </div>

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

              {isOpen && <ProfileBtn isOpen={isOpen} />}
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
