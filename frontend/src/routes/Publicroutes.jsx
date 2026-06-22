import React from "react";
import Home from "../Pages/CreativeHome";
import LoginPage from "../Components/LoginPage";
import SignupPage from "../Components/SignupPage";
import { Navigate } from "react-router-dom";

const Publicroutes = [
  { index: true, element: <Home /> },   // "/"
  { path: "login", element: <Navigate to="/patientlogin" replace /> },
  { path: "patientlogin", element: <LoginPage /> },
  { path: "register", element: <SignupPage /> } // "/register"
];

export default Publicroutes;
