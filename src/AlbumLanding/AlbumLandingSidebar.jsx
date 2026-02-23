import React from 'react'
import { BiSolidAlbum } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

const AlbumLandingSidebar = () => {
  return (
    <aside className='basis-[15%] bg-gray-900 h-min-[calc(100vh-70px)] '>
        <nav className='w-full px-5 py-3'>
            <ul className='w-full flex flex-col'>
                <li className='mb-3 py-2 px-6 bg-rose-200 text-black hover:bg-black hover:text-rose-400 rounded flex items-center gap-3'>
                    <span className='text-xl'><GiHamburgerMenu/></span>
                    <span className='text-lg tracking-wider'>Explore</span>
                </li>
                <li>
                    <NavLink to={"/"} end className={({isActive}) => `${isActive? "bg-rose-400 text-black" : ""} py-2 px-6 hover:bg-black hover:text-rose-400  flex items-center gap-2 rounded cursor-pointer text-lg`}>
                        <BiSolidAlbum/>
                        <span>Popular Albums</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default AlbumLandingSidebar