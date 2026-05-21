import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  adminLogin,
  adminLogout,
  adminProfile,
} from "../services/authService/adminApi";

import {
  doctorLogin,
  doctorLogout,
  doctorProfile,
} from "../services/authService/doctorApi";

import {
  patientLogin,
  patientProfile,
  logout as patientLogout,
} from "../services/authService/authApi";

const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {

    const [user, setUser] =
      useState(null);

    const [loading,
      setLoading
    ] = useState(true);

    const [error,
      setError
    ] = useState(null);

    const [
      isAuthenticated,
      setIsAuthenticated
    ] = useState(false);

    const [role,
      setRole
    ] = useState(null);

    const checkAuth =
      async () => {
        setError(null);
        try {

          try {
            const admin =
              await adminProfile();

            setUser(admin.data);
            setRole("admin");
            setIsAuthenticated(true);

            return;
          } catch { }

          try {
            const doctor =
              await doctorProfile();

            setUser(doctor.data.loggedinUser);
            setRole("doctor");
            setIsAuthenticated(true);

            return;
          } catch { }

          try {
            const patient =
              await patientProfile();

            setUser(patient.data.user);
            setRole("patient");
            setIsAuthenticated(true);

            return;
          } catch { }

          setUser(null);
          setRole(null);
          setIsAuthenticated(false);

        } catch (error) {

          setError(error);

        } finally {

          setLoading(false);
        }
      };

    const login = async (
      loginData,
      loginRole
    ) => {

      try {
        setLoading(true);
        setError(null);

        if (loginRole === "admin") {
          await adminLogin(loginData);
        }

        if (loginRole === "doctor") {
          await doctorLogin(loginData);
        }

        if (loginRole === "patient") {
          await patientLogin(loginData);
        }

        await checkAuth();

      } catch (error) {

        setError(error);
        throw error;

      } finally {
        setLoading(false);
      }
    };

    const logout =
      async () => {

        try {

          if (
            role === "admin"
          ) {
            await adminLogout();
          }

          if (
            role === "doctor"
          ) {
            await doctorLogout();
          }

          if (
            role === "patient"
          ) {
            await patientLogout();
          }

        } catch (error) {

          console.error(
            error.response?.data ||
            error.message
          );

        } finally {

          setUser(null);
          setRole(null);
          setError(null);
          setIsAuthenticated(
            false
          );
        }
      };

    useEffect(() => {
      checkAuth();
    }, []);

    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          error,
          isAuthenticated,
          role,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth =
  () =>
    useContext(AuthContext);