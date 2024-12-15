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
import GenrePage from "./pages/Discovery/GenrePage";
import PlaylistPage from "./pages/Discovery/PlaylistPage";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Dashboard />} />
        <Route path="discovery" element={<Discovery />} />
        <Route path="discovery/genres" element={<Genres />} />
        <Route path="discovery/genres/:genre" element={<GenreSong />} />
        <Route path="community" element={<Community />} />
        <Route path="artist/:id" element={<Artist />} />
        <Route path="album/:id" element={<Album />} />
        <Route path="track/:id" element={<Track />} />
        <Route path="playlists/:id" element={<PlaylistPage />} />
        <Route path="discovery/genres/:genre" element={<GenrePage />} />
      <Route path="pages/Reviewform" element={<ReviewForm />} />
    </Routes>
  );
}

export default App;
