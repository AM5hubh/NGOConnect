import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Toaster } from 'react-hot-toast';

function Layout() {
  return (
    <>
    <Header />
    <Outlet />
    <Toaster position='top-center' toastOptions={{duration: 3000}}/>
    <Footer />
    
    </>
  )
}

export default Layout