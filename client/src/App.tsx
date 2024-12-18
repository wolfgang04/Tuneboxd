import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Genres from "./pages/Discovery/Genres";
import Discovery from "./pages/Discovery/Discovery";
import GenreSong from "./pages/Discovery/GenreSong";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Track from "./pages/Track";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ReviewForm from "./pages/Reviewform";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import ResetPass from "./pages/Auth/resetpass";
import Account from "./components/Settings/Account";
import Notifications from "./components/Settings/Notifications";
import Privacy from "./components/Settings/Privacy";
import Preferences from "./components/Settings/Preferences";
import Reviews from "./components/Profile/Reviews";
import Playlists from "./components/Profile/Playlists";
import Songs from "./components/Profile/Likes/Songs";
import Albums from "./components/Profile/Likes/Albums";
import Artists from "./components/Profile/Likes/Artists";
import PlaylistPage from "./pages/Discovery/PlaylistPage";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resetpass" element={<ResetPass />} />
      <Route path="/" element={<Navbar />}>
        <Route element={<Auth />}>
          <Route index element={<Dashboard />} />
          <Route path="discovery" element={<Discovery />} />
          <Route path="discovery/genres" element={<Genres />} />
          <Route path="discovery/genres/:genre" element={<GenreSong />} />
          <Route path="community" element={<Community />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="album/:id" element={<Album />} />
          <Route path="track/:id" element={<Track />} />
          <Route path="settings/*" element={<Settings />}>
            <Route path="account" element={<Account />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="preferences" element={<Preferences />} />
          </Route>
          <Route path=":username/*" element={<Profile />}>
            <Route path="reviews" element={<Reviews />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="likes/*" element={<Profile />}>
              <Route path="songs" element={<Songs />} />
              <Route path="albums" element={<Albums />} />
              <Route path="artists" element={<Artists />} />
            </Route>
          </Route>
          <Route path="reviewform" element={<ReviewForm />} />
          <Route path="playlist/:id" element={<PlaylistPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;