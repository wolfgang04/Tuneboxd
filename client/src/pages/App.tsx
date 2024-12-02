import SampleComponent from "../components/SampleComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import ResetPass from '../pages/resetpass';

function App() {
	return (
		<Router>
		  <Routes>
			<Route path="/" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/resetpass" element={<ResetPass />} />
		  </Routes>
		</Router>
	  );
}

export default App;