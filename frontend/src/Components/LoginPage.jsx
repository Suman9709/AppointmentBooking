import React, { useState } from "react";
import Button from "./Button";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { useAuth } from "../context/authContext";
// import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    login,
    loading,
  } = useAuth();

  // detect role from route
  const loginRole =
    location.pathname === "/adminlogin"
      ? "admin"
      : location.pathname === "/doctorlogin"
      ? "doctor"
      : "patient";

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword
  ] = useState("");

  const [localError,
    setLocalError
  ] = useState(null);

  const handleSubmit =
  async (e) => {
    e.preventDefault();

    try {
      setLocalError(null);

      await login(
        {
          email,
          password,
        },
        loginRole
      );

      // redirect after login
      if (
        loginRole ===
        "admin"
      ) {
        navigate("/admindashboard");
      }

      if (
        loginRole ===
        "doctor"
      ) {
        navigate("/doctordashboard");
      }

      if (
        loginRole ===
        "patient"
      ) {
        navigate("/patientdashboard");
      }

    } catch (err) {

      setLocalError(
        err.response?.data
          ?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="page-shell grid min-h-[75vh] place-items-center">

      <form
        onSubmit={
          handleSubmit
        }
        className="glass-card relative flex w-full max-w-lg flex-col items-center gap-6 overflow-hidden rounded-[2rem] p-7 md:p-10"
      >

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Welcome to your {loginRole} space
        </h1>

        <nav className="flex flex-wrap justify-center gap-2 text-sm" aria-label="Choose login role">
          {["patient", "doctor", "admin"].map((item) => (
            <Link key={item} to={`/${item}login`} className={`rounded-full px-3 py-1 capitalize ${loginRole === item ? "bg-sky-600 text-white" : "bg-white text-gray-600"}`}>
              {item}
            </Link>
          ))}
        </nav>

        {/* EMAIL */}

        <div className="flex flex-col w-full gap-1">

          <label
            htmlFor="email"
            className="text-sm sm:text-base md:text-lg font-semibold"
          >
            Email
          </label>

          <div className="relative w-full">

            <MdEmail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
            />

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg pl-10 pr-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* PASSWORD */}

        <div className="flex flex-col w-full gap-1">

          <label
            htmlFor="password"
            className="text-sm sm:text-base md:text-lg font-semibold"
          >
            Password
          </label>

          <div className="relative w-full">

            <IoIosLock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"
            />

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-300 pl-10 focus:ring-2 focus:ring-sky-400 bg-gray-100"
            />
          </div>
        </div>

        {/* BUTTON */}

        <div className="w-full">

          <Button
            name={
              loading
                ? "Logging in..."
                : "Login"
            }
            type="submit"
            disabled={loading}
            bgColor="bg-gradient-to-b from-gray-900 to-gray-800"
            textColor="text-white"
            className="w-full rounded-xl"
          />
        </div>

        {/* ONLY PATIENT */}

        {loginRole ===
          "patient" && (
          <p className="text-sm sm:text-base text-center">

            Not have account?

            <Link
              to="/register"
              className="font-semibold text-gray-800 ml-1"
            >
              Register Here
            </Link>
          </p>
        )}

        {/* ERROR */}

        {localError && (
          <p className="text-red-500 text-sm">
            {localError}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
