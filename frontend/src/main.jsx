import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ActivityPage, CallbackPage, ErrorPage, IndexPage, LandingPage, LoginPage, RegisterPage, RepositoriesPage } from "./pages/index.js";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./RTK/store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/home", element: <IndexPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/repositories", element: <RepositoriesPage /> },
      { path: "/activity", element: <ActivityPage /> },
      { path: "/callback", element: <CallbackPage />}
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);