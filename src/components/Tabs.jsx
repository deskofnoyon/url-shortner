import { useState } from "react";

const Tabs = ({ reaceveActiveTab }) => {
	const [activeTab, setActiveTab] = useState("home");

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		reaceveActiveTab(tab);
	};

	return (
		<header className="">
			<nav className=" max-w-2xl w-full mx-auto">
				<ul className="flex">
					<li
						onClick={() => handleTabClick("home")}
						className={`cursor-pointer ${
							activeTab === "home" &&
							"text-white	 border-b-2 border-primary bg-primary rounded-tl-lg"
						} px-4 py-2`}
					>
						<a>Home</a>
					</li>
					<li
						onClick={() => handleTabClick("linkList")}
						className={`cursor-pointer ${
							activeTab === "linkList" &&
							"text-white	 border-b-2 border-primary bg-primary"
						} px-4 py-2`}
					>
						<a>Link List</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Tabs;
