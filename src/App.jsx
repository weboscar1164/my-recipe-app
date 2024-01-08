import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";

const App = () => {
	const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

	return (
		<Router>
			<Header isAuth={isAuth} />
			<Routes>
				<Route path="/" element={<Home isAuth={isAuth} />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn setIsAuth={setIsAuth} />} />
				<Route path="/signout" element={<SignOut setIsAuth={setIsAuth} />} />
			</Routes>
		</Router>
	);
};

export default App;
