import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
//NavLink is a special version of the Link component in React Router.
//It not only lets you navigate between pages (like Link), but it also lets you style the active link (the link for the page you’re currently on).(using isActive).
{/* <NavLink 
  to="/login"
  style={({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "red" : "blue"
  })}
>
  Login
</NavLink> */}
function Header() {
  const {user}  = useSelector((state) => state.auth);
  return (
    <>
      <header className="sticky top-0 bg-white/80 z-50 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4  flex justify-between items-center ">
            <NavLink to='/' href="#" className='font-bold text-2xl text-gray-900'>Intelli<span className='text-indigo-600'>Prep</span></NavLink>
 
          {!user && <div className='hidden md:flex item-center space-x-6'>
                <NavLink to='/register' 
                style={({isActive}) =>({ fontWeight: isActive? "bold" :"normal", color: isActive? 'blue':'gray' })} 
                className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Register</NavLink>
                <NavLink to='/login'
                style={({isActive}) => ({fontWeight : isActive? "bold" : "normal", color : isActive? "blue" : "gray"})} 
                className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Login</NavLink>
                {/* <a className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Features</a> */}
            </div>}

            <a href="#" className='bg-indigo-500 text-white font-semibold px-5 py-2 hover:bg-indigo-700 rounded-lg cursor-pointer transition-transform hover:scale-105'>
                Get Started
            </a>
        </nav>
      </header>
    </>
  )
}

export default Header;
