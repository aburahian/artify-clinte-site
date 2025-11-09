import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import LogLayout from "../Layout/LogLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ArtsLayout from "../Layout/ArtsLayout";
import Explore from "../pages/Explore";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Favorites from "../pages/Favorites";
import ErrorPage from "../pages/ErrorPage";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/arts",
    element: <ArtsLayout></ArtsLayout>,
    children: [
      {
        index: true,
        element: <Explore></Explore>,
      },
      {
        path: "addArtWork",
        element: <AddArtwork></AddArtwork>,
      },
      {
        path: "myGallery",
        element: <MyGallery></MyGallery>,
      },
      {
        path: "favorites",
        element: <Favorites></Favorites>,
      },
    ],
  },
  {
    path: "/auth",
    element: <LogLayout></LogLayout>,
    children: [
      {
        index: true,
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
