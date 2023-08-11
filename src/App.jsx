import { Toaster } from "react-hot-toast";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
	return (
		<>
			<ThemeSwitcher />
			<Toaster />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
