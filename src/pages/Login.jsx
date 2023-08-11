import { FcGoogle } from "react-icons/fc";

const Login = () => {
	return (
		<main className="flex items-center min-h-main justify-center p-5 md:p-0">
			<div className="w-full max-w-xl">
				<h1 className="text-3xl md:text-4xl text-center mb-5 text-primary font-bold">
					URL Shortner
				</h1>
				<div className="mx-auto p-5 bg-slate-200 dark:bg-slate-600/20 rounded-md w-full max-w-sm md:max-w-sm border border-primary shadow-lg">
					<h2 className="text-2xl font-bold text-center mb-3 dark:text-white">
						Login
					</h2>
					<button className="flex items-center bg-slate-100 hover:bg-slate-300 p-3 w-full space-x-2 rounded-md justify-center">
						<FcGoogle className="text-3xl" />
						<span className="font-semibold">Sign in with Google</span>
					</button>
				</div>
				
			</div>
		</main>
	);
};

export default Login;
