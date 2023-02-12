import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Main, Register, Login } from "./pages";

import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
