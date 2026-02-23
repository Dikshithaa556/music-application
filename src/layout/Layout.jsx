import React from 'react'
import NavbarContainer from '../components/NavbarBlock/NavbarContainer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <div>
      <Toaster/>
        <NavbarContainer/>
        <Outlet/> 
        {/* helps render children components in the ui */}
    </div>
  )
}

export default Layout