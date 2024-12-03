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
import ReviewForm from "./pages/Reviewform";
import AlbumReview from "./pages/Songpage";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import ResetPass from "./pages/resetpass";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resetpass" element={<ResetPass />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<Dashboard />} />
        <Route path="discovery" element={<Discovery />} />
        <Route path="discovery/genres" element={<Genres />} />
        <Route path="discovery/genres/:genre" element={<GenreSong />} />
        <Route path="community" element={<Community />} />
        <Route path="artist/:id" element={<Artist />} />
        <Route path="album/:id" element={<Album />} />
        <Route path="track/:id" element={<Track />} />
        <Route path="settings" element={<Settings />} />
        <Route path="songpage" element={<AlbumReview />} />
      </Route>
      <Route path="pages/Reviewform" element={<ReviewForm />} />
    </Routes>
  );
}

export default App;
