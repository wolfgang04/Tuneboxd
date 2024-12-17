import { NavLink } from "react-router-dom";

const Navigation = () => {
  return <div className="flex space-x-2 bg-white p-4 shadow-lg mb-10">
    <NavLink to="reviews"
      className={({ isActive }) =>
        `w-full rounded-lg p-2 text-left font-bold ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
      }>
      Reviews
    </NavLink>
    <NavLink to="likes/songs"
      className={({ isActive }) =>
        `w-full rounded-lg p-2 text-left font-bold ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
      }>
      Songs
    </NavLink>
    <NavLink to="likes/albums"
      className={({ isActive }) =>
        `w-full rounded-lg p-2 text-left font-bold ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
      }>
      Albums
    </NavLink>
    <NavLink to="likes/artists"
      className={({ isActive }) =>
        `w-full rounded-lg p-2 text-left font-bold ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"}`
      }>
      Artists
    </NavLink>
  </div>
}

export default Navigation;