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
import AlbumReview from "./pages/Songpage";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import Account from "./components/Settings/Account";
import Notifications from "./components/Settings/Notifications";
import Privacy from "./components/Settings/Privacy";
import Preferences from "./components/Settings/Preferences";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Auth />}>
        <Route element={<Navbar />}>
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
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="songpage" element={<AlbumReview />} />
      </Route>
      <Route path="pages/Reviewform" element={<ReviewForm />} />
    </Routes>
  );
}

export default App;
