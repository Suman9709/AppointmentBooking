import React from "react";
import Home from "../Pages/Home";
import LoginPage from "../Components/LoginPage";
import SignupPage from "../Components/SignupPage";

const Publicroutes = [
  { index: true, element: <Home /> },   // "/"
  { path: "login", element: <LoginPage /> },    // "/login"
  { path: "register", element: <SignupPage /> } // "/register"
];

export default Publicroutes;
