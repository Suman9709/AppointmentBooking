import React from 'react'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Publicroutes from './routes/Publicroutes'
import Adminroutes from './routes/Adminroutes'
import Doctorroutes from './routes/Doctorroutes'
import Patientsroutes from './routes/Patientsroutes'


const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...Publicroutes,
      ...Adminroutes,
      ...Doctorroutes,
      ...Patientsroutes
    ]
  }
])


const App = () => {
  return (
    <RouterProvider router={AppRouter} />
  )
}

export default App
