import { Outlet } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-200">
				<div className="flex items-center space-x-4">
					<span className="text-2xl font-bold font-jersey">
						Tuneboxd
					</span>
				</div>

				{/* Navigation Links */}
				<div className="hidden md:flex space-x-8">
					<a
						href="#"
						className="text-black font-medium hover:underline underline-offset-4"
					>
						Home
					</a>
					<a
						href="#"
						className="text-gray-700 font-medium hover:underline underline-offset-4"
					>
						Discover
					</a>
					<a
						href="#"
						className="text-gray-700 font-medium hover:underline underline-offset-4"
					>
						Community
					</a>
				</div>

				<div className="flex items-center space-x-4">
					{/* Search Bar */}
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="absolute left-3 top-2.5 text-gray-400 w-5 h-5"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="16.5" y1="16.5" x2="22" y2="22"></line>
						</svg>
						<input
							type="text"
							placeholder="Search"
							className="pl-10 pr-4 py-1 rounded-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Search"
						/>
					</div>

					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/cabc297cbddaed741a7d0683949e38f49f3c127e9c8499c49bb38b12aa7f1dea?placeholderIfAbsent=true&apiKey=73641803e2624e9f9f9030f4043fd88e"
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.86]"
						alt=""
					/>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/3861a12c399e50de32d67eb366c059b6c08c18b92c6f8039e484ab09bf099a8e?placeholderIfAbsent=true&apiKey=73641803e2624e9f9f9030f4043fd88e"
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.86]"
						alt=""
					/>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ae4e442f1272c2f1e46cda312efda47d8416615a772ddb2d88eba6beed4efd9?placeholderIfAbsent=true&apiKey=73641803e2624e9f9f9030f4043fd88e"
						className="object-contain shrink-0 self-stretch aspect-square w-[50px]"
						alt=""
					/>
				</div>
			</nav>

			<Outlet />
		</>
	);
};

export default Navbar;
