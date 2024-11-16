import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
	genre: string;
}

const Genre: React.FC<Props> = ({ genre }) => {
	const navigate = useNavigate();

	const handleViewGenre = () => {
		navigate(`${genre}`);
	};

	return (
		<div
			className="h-48 w-72 flex justify-center items-center bg-[#A7A7A7] cursor-pointer rounded-2xl"
			onClick={() => handleViewGenre()}
		>
			{genre}
		</div>
	);
};

export default Genre;
