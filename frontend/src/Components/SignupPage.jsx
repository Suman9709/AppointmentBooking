import React from 'react'
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center px-4 font-sans'>
            <form onSubmit={handleSubmit}
                className='w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 ms:p-8 rounded-lg flex flex-col gap-6 md:gap-8 items-center shadow-lg backdrop-blur-xl bg-linear-to-b from-sky-100 via-sky-50 via-10% to-white'
            >
                <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-shadow-xl text-shadow-gray-600'>Sign Up here</h1>
                <div className='flex flex-col w-full gap-1 '>
                    <label htmlFor="name" className='text-sm sm:text-base md:text-lg font-semibold'>Name</label>
                    <div className='relative w-full'>
                        <FaUserAlt className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg' />
                        <input
                            type="text"
                            name='name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            className='w-full rounded-lg pl-10 pr-3 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400'
                        />

                    </div>
                </div>
                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="email" className='text-sm sm:text-base md:text-lg font-semibold'>Email</label>
                    <div className='relative w-full'>
                        <MdEmail className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg' />
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-300 pl-10 focus:ring-2 focus:ring-sky-400 bg-gray-100'
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <div className='relative w-full'>
                        <IoIosLock className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg' />
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full rounded-lg px-3 py-2 focus:outline-none border border-gray-300 pl-10 focus:ring-2 focus:ring-sky-400 bg-gray-100'
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <Button
                        name='Sign up'
                        type='submit'
                        bgColor='bg-gradient-to-b from-gray-900 to-gray-800'
                        textColor='text-white'
                        className='w-full  rounded-xl'
                    />
                </div>

                <p className='text-sm sm:text-base text-center'>Already have account <Link to={'/login'} className="
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
    ">Login</Link></p>
            </form>
        </div>
    )
}

export default SignupPage