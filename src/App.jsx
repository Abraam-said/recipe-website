import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";
import ViewRecipe from "./components/ViewRecipe/ViewRecipe";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "recipe/:id", element: <ViewRecipe /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

