import React from "react";
import { NavLink } from "react-router-dom";

const Navigations = () => {
  return (
    <aside className="flex w-64 flex-col space-y-2 bg-white p-4 shadow-lg">
      <NavLink
        to="account"
        className={({ isActive }) =>
          `w-full rounded-lg p-2 text-left ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
        }
      >
        Account Settings
      </NavLink>
      <NavLink
        to="notifications"
        className={({ isActive }) =>
          `w-full rounded-lg p-2 text-left ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
        }
      >
        Notifications
      </NavLink>
      <NavLink
        to="privacy"
        className={({ isActive }) =>
          `w-full rounded-lg p-2 text-left ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
        }
      >
        Privacy
      </NavLink>
      <NavLink
        to="preferences"
        className={({ isActive }) =>
          `w-full rounded-lg p-2 text-left ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
        }
      >
        App Preferences
      </NavLink>
    </aside>
  );
};

export default Navigations;
