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
          // Authenticate only the role represented by this tab's URL. Separate
          // role cookies can then coexist without admin always winning the probe.
          const path = window.location.pathname;
          const expectedRole = path.startsWith("/admin") ? "admin"
            : path.startsWith("/doctor") ? "doctor"
            : path.startsWith("/patient") ? "patient"
            : null;

          if (!expectedRole) {
            setUser(null); setRole(null); setIsAuthenticated(false);
            return;
          }

          const profile = expectedRole === "admin" ? await adminProfile()
            : expectedRole === "doctor" ? await doctorProfile()
            : await patientProfile();
          const profileUser = expectedRole === "admin" ? profile.data
            : expectedRole === "doctor" ? profile.data.loggedinUser
            : profile.data.user;

          setUser(profileUser);
          setRole(expectedRole);
          setIsAuthenticated(true);

        } catch (error) {
          setUser(null); setRole(null); setIsAuthenticated(false);
          if (error.response?.status !== 401) setError(error);

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
          refreshAuth: checkAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

// The hook intentionally shares this module with its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =
  () =>
    useContext(AuthContext);
