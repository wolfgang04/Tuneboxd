import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const ProfileBtn: React.FC<Props> = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    // Handle profile click
    try {
      const res = await axios.get("http://localhost:8080/api/user/status", {
        withCredentials: true,
      });

      navigate(`/${res.data.user}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/logout", {
        withCredentials: true,
      });

      if (res.status === 200) navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div className="relative z-50 text-left"> */}
      {isOpen && (
        <div className="absolute right-2 top-12 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleProfileClick}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </button>
            <button
              onClick={handleLogoutClick}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {/* </div> */}
    </>
  );
};

export default ProfileBtn;
