import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RedirectPage from "../pages/RedirectPage";
import Login from "../pages/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/url/:shortId",
		element: <RedirectPage />,
	},
	{
		path: '/login',
		element: <Login/>
	},
	{
		path: "/404",
		element: <NotFound />,
	},
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
]);

export default router;
