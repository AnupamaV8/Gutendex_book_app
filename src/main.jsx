import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";

import HomeView from "./Views/HomeView";
import CategoryView from "./Views/CategoryView";
import BookDetailsView from "./Views/BookDetailsView";
import FavoritesView from "./Views/FavoritesView";
import ErrorView from "./Views/ErrorView";
import BookListView from "./Views/BookListView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/books", element: <BookListView /> },
      { path: "/category/:category", element: <CategoryView /> },
      { path: "/book/:bookId", element: <BookDetailsView /> },
      { path: "/favorites", element: <FavoritesView /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
