import { useState, useEffect } from "react";
import { BiSolidSun, BiMoon } from "react-icons/bi";

const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme
			? savedTheme === "dark"
			: window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<button
			className="z-50 fixed top-4 right-4 p-2 rounded-full border border-primary dark:text-gray-50"
			onClick={toggleTheme}
		>
			{darkMode ? <BiMoon /> : <BiSolidSun />}
		</button>
	);
};

export default ThemeSwitcher;
