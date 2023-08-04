import URLList from "../components/URLList";
import URLShortner from "../components/URLShortner";

const Home = () => {
	return (
		<>
			<main className="space-y-3 py-5 relative">
				<div className="mx-auto w-full max-w-2xl">
					<URLShortner />
					<URLList />
				</div>
			</main>
		</>
	);
};

export default Home;
