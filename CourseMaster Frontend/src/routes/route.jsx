import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
		children: [
			{
				index: true,
				element: <Home/>
			}
		]
    },
]);

export default router;