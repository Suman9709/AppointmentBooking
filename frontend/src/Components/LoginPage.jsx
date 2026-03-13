import React, { useState } from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {

    const loginMutation = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({
            patientEmail: email,
            patientPassword: password
        });
    }
    return (
        <div className='w-full min-h-screen flex flex-col justify-center px-4  items-center font-sans '>

            <form onSubmit={handleSubmit}
                className=' w-full max-w-sm sm:max-w-md md:max-w-lg  p-4 sm:p-6 md:p-8  rounded-lg flex flex-col gap-6 md:gap-8 items-center shadow-lg backdrop-blur-xl bg-linear-to-b from-sky-100 via-sky-50 via-10%  to-white'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-shadow-xl text-shadow-gray-600'>Login Here</h1>
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

                        {/* Input */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            className="
        w-full
        rounded-lg
        pl-10 pr-3 py-2
        bg-gray-100
        border border-gray-300
        focus:outline-none
        focus:ring-2 focus:ring-sky-400
      "
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="password" className='text-sm sm:text-base md:text-lg font-semibold'>Password</label>
                    <div className='relative w-full'>
                        <IoIosLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=' w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-300 pl-10 focus:ring-2 focus:ring-sky-400 bg-gray-100'
                        />
                    </div>
                </div>

                <div className="w-full">
                    <Button
                        name="Login"
                        type="submit"
                        bgColor="bg-gradient-to-b from-gray-900 to-gray-800"
                        textColor="text-white"
                        className="w-full  rounded-xl"
                    />
                </div>



                <p className='text-sm sm:text-base text-center'>Not have account?  <Link
                    to="/register"
                    className="
      relative
      font-semibold
      text-gray-800
      after:absolute
      after:left-0
      after:-bottom-0.5
      after:h-0.5
      after:w-0
      after:bg-gray-800
      after:transition-all
      after:duration-300
      hover:after:w-full
    "
                >
                    Register Here
                </Link></p>
                {
                    loginMutation.isPending && (
                        <p className='text-blue-500 text-sm sm:text-base mt-2'>Logging in...</p>
                    )
                }
                {loginMutation.isError && (
                    <p className='text-red-500 text-sm sm:text-base mt-2'>{loginMutation.error.message}</p>
                )}
            </form>
        </div>
    )
}

export default LoginPage