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
import ArtDetails from "../pages/ArtDetails";
import PrivateRoute from "./PrivateRoute";
import ArtistDetails from "../pages/ArtistDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import About from "../pages/About";
import Contact from "../pages/Contact";
import UserProfile from "../pages/UserProfile";
import Community from "../pages/Community";

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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/arts",
    element: <ArtsLayout></ArtsLayout>,
    children: [
      {
        index: true, // Keep index true for /arts to render Explore by default
        element: <Explore></Explore>,
      },
      {
        path: "explore", // Add a specific path for explore if needed, but index true already covers /arts
        element: <Explore></Explore>,
      },
      {
        path: "art/:id", // Keep original path for art details
        element: (
          <PrivateRoute>
            <ArtDetails></ArtDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "art/artist/:email",
        element: (
          <PrivateRoute>
            <ArtistDetails></ArtistDetails>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-gallery", element: <MyGallery /> },
      { path: "add-artwork", element: <AddArtwork /> },
      { path: "favorites", element: <Favorites /> },
      { path: "profile", element: <UserProfile /> },
    ]
  }
]);
