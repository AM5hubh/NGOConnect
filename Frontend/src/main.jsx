import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'


import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import User from './components/User/User.jsx'
import Login from './components/Auth/Login/Login.jsx'
import Signup from './components/Auth/Signup/Signup.jsx'
import Register from './components/Auth/Register/Register.jsx'
import NgoLogin from './components/Auth/NGOLogin/NgoLogin.jsx'
import NGOcards from './components/NGOcards/NGOcards.jsx'
import PrivateRoutes from './Privateroutes.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import AdminLogin from './components/Admin/Auth/AdminLogin.jsx'
import NGODetails from './components/NGODetails/NGODetails.jsx'
import DonationDashboard from './components/DonationDashboard/DonationDashboard.jsx'
import VolunteerDashboard from './components/VolunteerDashboard/VolunteerDashboard.jsx'
import AdminSignup from './components/Admin/Auth/AdminSignup.jsx'
import VolunteerForm from './components/VolunteerForm/VolunteerForm.jsx'
import Volunteerbystatus from './components/Volunteerbystatus/Volunteerbystatus.jsx'
import DonationForm from './components/Donation/DonationForm/DonationForm.jsx'
import EventContainer from './components/Events/EventContainer.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="eventcontainer" element={<EventContainer />} />
      <Route path="register" element={<Register />} />
      <Route path="donations" element={<DonationDashboard />} />
      <Route path="volunteer" element={<VolunteerDashboard />} />
      <Route path="donate" element={<DonationForm/>} />

      {/* <Route path='user/' element={<User />}>
        <Route path=':userid' element={<User />} />
      </Route> */}
      <Route path="/private" element={<PrivateRoutes />} >
      <Route path="admindashboard" element={<AdminDashboard />} />
      </Route>
      <Route path='programs/' />
      <Route path="login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminsignup" element={<AdminSignup />} />

      <Route path="ngologin" element={<NgoLogin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="Volunteerform" element={<VolunteerForm />} />
      {/* <Route path="volunteerbystatus" element={<Volunteerbystatus />} /> */}
        <Route exact path="ngocards" element={<NGOcards />} />
        <Route path="ngo/:id" element={<NGODetails />} />
        
      
      {/* <Route path="ngocards" element={<NGOcards />} /> */}
      {/* <Route path="signup" element={<Signup />} /> */}
      <Route path='*' element={<h1 className='text-center text-3xl text-bold'>Not Found</h1>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)