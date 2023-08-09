import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex justify-center flex-col space-y-3">
				<h1 className="text-3xl text-center dark:text-white">
					404 - The page or Url Not Found!!
				</h1>
				<Link
					className="mx-auto px-3 py-2 bg-primary text-white font-semibold text-center rounded"
					to={"/"}
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
