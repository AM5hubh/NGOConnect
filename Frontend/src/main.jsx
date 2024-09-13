import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import User from './components/User/User.jsx'
import Login from './components/Auth/Login/Login.jsx'
import Signup from './components/Auth/Signup/Signup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path="about" element={<About />} />
      {/* <Route path='user/' element={<User />}>
        <Route path=':userid' element={<User />} />
      </Route> */}
      <Route path='programs/' />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='*' element={<h1 className='text-center text-3xl text-bold'>Not Found</h1>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)