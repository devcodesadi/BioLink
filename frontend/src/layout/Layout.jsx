import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {

  const location=useLocation()
  const hideLayoutOnPaths=/^\/[^/]+$/;

  const shouldHideLayout=hideLayoutOnPaths.test(location.pathname);



  return (
    <>
    {!shouldHideLayout && <Header/> }
    <main className="min-h-screen">
    <Outlet/>
    </main>
    {/* {!shouldHideLayout && <Footer/>} */}
    </>
  )
}

export default Layout