import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomeView from "./gui/home/HomeView";
import DashboardView from "./gui/dashboard/DashboardView";

export const routes = {
    Home: {
        path: "/",
        element: <HomeView/>,
    },
    Dashboard: {
        path: "/dashboard",
        element: <DashboardView/>,
    },
}

const router = createBrowserRouter(Object.values(routes));

const RouterRoot: React.FC = () => {
    return <RouterProvider router={router}/>;
};


export default RouterRoot;
