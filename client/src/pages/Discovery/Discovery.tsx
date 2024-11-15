import React from "react";
import { Outlet } from "react-router-dom";

const Discovery = () => {
	return (
		<>
			<div>Discovery page</div>;
			<Outlet />
		</>
	);
};

export default Discovery;
