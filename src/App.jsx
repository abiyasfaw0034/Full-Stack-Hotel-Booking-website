/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import HomePage from "./ui/HomePage";
import Home from "./pages/Home";
import About from "../src/pages/AboutUs";
import Pagenotfound from "../src/pages/Pagenotfound";
import Applayout from "./ui/Applayout";
import SignUp from "./auth/SignUp";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./auth/Login";
import { AuthProvider } from "./context/authContext/authContext";
import { Toaster } from "react-hot-toast";
import HotelDetail from "./pages/HotelDetail";
import Booking from "./pages/Booking";
import ApplayoutAdmin from "./ui/ApplayoutAdmin";
import Admin from "./admin/pages/Admin";
import AdminRoute from "./admin/ui/AdminRoute";
import AddHotel from "./admin/features/addhotel/AddHotel";
import UpdateHotel from "./admin/features/updatehotel/UpdateHotel";
import ViewHotels from "./admin/features/viewhotels/ViewHotels";
import DeleteHotel from "./admin/features/deletehotel/DeleteHotel";
import AdminUser from "./admin/pages/AdminUser";
import BigRoomDetail from "./ui/RoomDetail";
import Reservation from "./pages/Reservation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthProvider>
                <Applayout />
              </AuthProvider>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="/hotel/:hotelId" element={<HotelDetail />} />
            <Route
              path="/hotel/:hotelId/room/:roomId"
              element={<BigRoomDetail />}
            />
            {/* <div>specfific room</div> */}
            <Route
              path="/hotel/:hotelId/room/:roomId/booking"
              element={<Booking />}
            />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Pagenotfound />} />
          </Route>
          <Route
            element={
              <AuthProvider>
                <AdminRoute>
                  <ApplayoutAdmin />
                </AdminRoute>
              </AuthProvider>
            }
          >
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="admin/dashboard" element={<Admin />} />
            <Route path="/admin/add" element={<AddHotel />} />
            <Route path="admin/update" element={<UpdateHotel />} />
            <Route path="admin/view" element={<ViewHotels />} />
            <Route path="admin/delete" element={<DeleteHotel />} />
            <Route path="admin/user" element={<AdminUser />} />

            {/* error in routing when in admin/add reload it goes to dashboard */}
            <Route
              path="/aboutAdmin"
              element={<div>about us description</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
