import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../auth/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ResetPassword from "../auth/ResetPassword";
import ProfileContainer from "../components/NavbarBlock/UserProfile/ProfileContainer";
import MyAccount from "../components/NavbarBlock/UserProfile/MyAccount";
import AddProfile from "../components/NavbarBlock/UserProfile/AddProfile";
import UploadProfilePhoto from "../components/NavbarBlock/UserProfile/UploadProfilePhoto";
import ChangePassword from "../components/NavbarBlock/UserProfile/ChangePassword";
import DeleteAccount from "../components/NavbarBlock/UserProfile/DeleteAccount";
import AdminContainer from "../admin/AdminContainer";
import CreateAlbum from "../admin/album/CreateAlbum";
import AlbumLandingContainer from "../AlbumLanding/AlbumLandingContainer";
import PopularAlbums from "../AlbumLanding/PopularAlbums";
import AlbumDetails from "../AlbumLanding/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";



let myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <AlbumLandingContainer />,
                children: [
                    {
                        index: true,
                        element: <PopularAlbums />
                    },
                    {
                        path: "album-details/:title",
                        element: <AlbumDetails />
                    }
                ]
            },
            {
                path: "/auth/login",
                element: <PublicRoutes>
                    <Login />
                </PublicRoutes>,
            },
            {
                path: "/auth/register",
                element:  <PublicRoutes>
                    <Register />
                </PublicRoutes>
            },
            {
                path: "/auth/reset-password",
                element: <PublicRoutes>
                      <ResetPassword />
                    </PublicRoutes>
            },
            {
                path: "/admin",
                element: <AdminContainer />,
                children: [
                    {
                        path: "create-album",
                        element: <CreateAlbum />
                    },
                ]
            },
            {
                path: "/user/profile",
                element:<PrivateRoutes>
                    <ProfileContainer />,
                 </PrivateRoutes>,
                children: [
                    {
                        index: true, //means whatever is the path of parent container will be taken for myaccount
                        element: <MyAccount />
                    },
                    {
                        path: "add-profile",
                        element: <AddProfile />
                    },
                    {
                        path: "upload-profile-photo",
                        element: <UploadProfilePhoto />
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />
                    },
                    {
                        path: "delete-account",
                        element: <DeleteAccount />
                    }
                ]
            },
            {
                path: "*",
                element: <h1>404! Page Not Found</h1>,
            }
        ]
    },


])

export default myRoutes;