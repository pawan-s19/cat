import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/Dasboard";
import { useQuery } from "@tanstack/react-query";
import { fetchLoggedInUser } from "./services/user";
import { setUser } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import PublicRoutes from "./components/PublicRoutes";
import Quiz from "./components/Quiz";
import "./index.css";
import Footer from "./components/Footer";
import Results from "./components/Results";
import PageNotFound from "./components/PageNotFound";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/quiz/:sessionId",
        element: <Quiz />,
      },
      {
        path: "/results/:sessionId",
        element: <Results />,
      },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const info = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: async () => {
      try {
        const { data } = await fetchLoggedInUser();
        dispatch(setUser({ user: data.data }));
        return data;
      } catch (err) {
        return err;
      }
    },
  });

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
      <Footer />
    </>
  );
}
