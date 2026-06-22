import React, {
  useMemo,
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useAuth }
  from '../context/authContext'

const Navbar = () => {

  const navigate =
    useNavigate()

  // ================= AUTH =================

  const {
    user,
    role,
    logout
  } = useAuth()

  // ================= ROLE =================

  const loggedInUser =user
   

  // ================= LOGOUT =================

  const handleLogout =
    async () => {

      try {

        await logout()

        navigate("/")

      } catch (error) {

        console.error(
          "Logout failed",
          error
        )
      }
    }

  // ================= MENUS =================

  const menu = {

    public: [
      {
        name: 'Home',
        link: '/'
      },
    ],

    admin: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Dashboard',
        link:
          '/admindashboard'
      },
      { name: 'Profile', link: '/adminprofile' },
    ],

    doctor: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Dashboard',
        link:
          '/doctordashboard'
      },
      { name: 'Profile', link: '/doctorprofile' },
    ],

    patient: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Dashboard',
        link:
          '/patientdashboard'
      },
      { name: 'Profile', link: '/patientprofile' },
      {
        name:
          'My Appointments',
        link:
          '/patientdashboard#myappointments'
      },
    ]
  }

  // ================= MENU TO SHOW =================

  const menuToShow = menu[role] || menu.public

  // ================= AVATAR =================

  const avatarLetter = useMemo(() => {

    const userName =
      loggedInUser?.name ||
      loggedInUser?.user?.name ||
      loggedInUser?.loggedinUser?.name ||
      "";

    return userName.charAt(0).toUpperCase();

  }, [loggedInUser]);

  // ================= MOBILE MENU =================
  // data.loggedinUser.name 
  const [
    ismobilemenu,
    setIsmobilemenu
  ] = useState(false)

  return (

    <header className="sticky top-0 z-40 w-full px-3 pt-3 md:px-6">

      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/80 bg-white/78 px-4 py-2 shadow-lg shadow-slate-200/50 backdrop-blur-xl md:px-7">

        {/* ================= LOGO ================= */}

        <Link to="/">
          <img
            src="/image/logo.png"
            alt="logo"
            className="h-11 w-11 rounded-xl object-contain md:h-12 md:w-12"
          />
        </Link>

        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden md:flex items-center gap-6 text-lg font-medium">

          {menuToShow.map(
            (menuItem) => (

              <Link
                key={
                  menuItem.name
                }
                to={
                  menuItem.link
                }
                className="hover:text-sky-600 transition duration-200"
              >
                {menuItem.name}
              </Link>
            )
          )}

        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="hidden md:flex items-center gap-4">

          {loggedInUser && (

            <div className="w-10 h-10 rounded-full border-2 border-sky-500 bg-sky-100 flex justify-center items-center">

              <p className="font-bold text-sky-700">
                {avatarLetter}
              </p>

            </div>
          )}

          {loggedInUser ? (

            <button
              onClick={
                handleLogout
              }
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/patientlogin"
              className="font-medium hover:text-sky-600 transition duration-200"
            >
              Login
            </Link>
          )}

        </div>

        {/* ================= MOBILE MENU ================= */}

        <div className="md:hidden relative">

          <button
            onClick={() =>
              setIsmobilemenu(
                !ismobilemenu
              )
            }
          >

            {ismobilemenu ? (

              <img
                src="/image/cross.png"
                alt="close"
                className="w-6 h-6"
              />

            ) : (

              <img
                src="/image/hamburg.png"
                alt="menu"
                className="w-6 h-6"
              />
            )}

          </button>

          {/* ================= MOBILE DROPDOWN ================= */}

          {ismobilemenu && (

            <div className="absolute right-0 top-12 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 min-w-55 z-50">

              {menuToShow.map(
                (menuItem) => (

                  <Link
                    key={
                      menuItem.name
                    }
                    to={
                      menuItem.link
                    }
                    onClick={() =>
                      setIsmobilemenu(
                        false
                      )
                    }
                    className="hover:text-sky-600 transition"
                  >
                    {menuItem.name}
                  </Link>
                )
              )}

              {loggedInUser ? (

                <>
                  <p className="font-semibold text-sky-700">

                    {
                      loggedInUser
                        ?.name
                        ?.split(" ")[0]
                    }

                  </p>

                  <button
                    onClick={
                      async () => {

                        await handleLogout()

                        setIsmobilemenu(
                          false
                        )
                      }
                    }
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                  >
                    Logout
                  </button>
                </>

              ) : (

                <Link
                  to="/patientlogin"
                  onClick={() =>
                    setIsmobilemenu(
                      false
                    )
                  }
                  className="hover:text-sky-600 transition"
                >
                  Login
                </Link>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  )
}

export default Navbar
