import { Toaster } from "react-hot-toast";
import "./App.css";
import URLList from "./components/URLList";
import URLShortner from "./components/URLShortner";


const App = () => {
	return (
		<>
		<Toaster />
			<main className="space-y-3 py-5 relative">
				<div className="mx-auto w-full max-w-2xl">
					<URLShortner />
					<URLList />
				</div>
			</main>
		</>
	);
};

export default App;
