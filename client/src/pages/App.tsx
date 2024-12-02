import SampleComponent from "../components/SampleComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import ResetPass from '../pages/resetpass';

function App() {
	return (
		<Router>
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
     			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/resetpass" element={<ResetPass />} />
		  </Routes>
		</Router>
	  );
}

export default App;
