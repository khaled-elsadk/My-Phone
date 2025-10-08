import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'



export default function MasterLayout() {
  return (

    <>
    <Navbar/>
    <div className="container d-flex flex-column min-vh-100">
      <Outlet> </Outlet>
    </div>


    <Footer/>
    </>
  )
}

