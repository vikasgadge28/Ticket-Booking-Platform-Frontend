/** @format */

// src/App.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import TrainSearch from "./views/trainSearch";
import TrainsList from "./components/srcToDes/trains-list";
import { UserProvider } from "./components/UserContext";
import AdminDashboard from "./views/adminDashboard";
import GetAllTrains from "./components/admin/getAllTrains";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Bookings from "./views/booking";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <TrainSearch />
        </>
      ),
    },
    {
      path: "/trains-list",
      element: (
        <>
          <Header />
          <TrainsList />
        </>
      ),
    },
    {
      path: "/admin",
      element: (
        <>
          <Header />
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/bookings",
      element: (
        <>
          <Header />
          <Bookings />
        </>
      ),
    },
  ]);

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
